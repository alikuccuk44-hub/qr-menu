import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Varsayılan şifre (Safe Mode)
    let correctPassword = process.env.ADMIN_PASSWORD || 'admin';
    
    try {
      // Veritabanından gerçek şifreyi çekmeye çalış
      const restaurant = await prisma.restaurant.findFirst();
      if (restaurant?.adminPassword) {
        correctPassword = restaurant.adminPassword;
      }
    } catch (dbError) {
      console.warn('⚠️ Veritabanına ulaşılamıyor, .env şifresiyle devam ediliyor.');
    }

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
      return response;
    }

    return NextResponse.json(
      { error: 'Hatalı şifre' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Giriş Hatası Detayı:', error);
    return NextResponse.json(
      { error: 'Sistem Hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata') },
      { status: 500 }
    );
  }
}
