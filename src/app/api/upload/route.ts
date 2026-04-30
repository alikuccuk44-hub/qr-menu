import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Sadece JPEG, PNG, WebP veya GIF dosyaları kabul edilir.' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu en fazla 5MB olabilir.' }, { status: 400 });
    }

    // Convert file to Base64 for ImgBB
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // ImgBB API Key
    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'ImgBB API Key eksik' }, { status: 500 });
    }

    // Prepare ImgBB payload
    const imgbbFormData = new FormData();
    imgbbFormData.append('key', apiKey);
    imgbbFormData.append('image', base64Image);

    // Upload to ImgBB
    const imgbbResponse = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbFormData,
    });

    const data = await imgbbResponse.json();

    if (data.success) {
      // Return the public URL provided by ImgBB
      return NextResponse.json({ imageUrl: data.data.url });
    } else {
      console.error('ImgBB error:', data);
      return NextResponse.json({ error: 'Fotoğraf ImgBB servisine yüklenemedi.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Yükleme sırasında bir hata oluştu.' }, { status: 500 });
  }
}
