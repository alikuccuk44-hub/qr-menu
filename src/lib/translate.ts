export async function translateText(text: string, targetLang: string): Promise<string | null> {
  if (!text) return null;
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    
    let translatedText = '';
    for (let i = 0; i < data[0].length; i++) {
      translatedText += data[0][i][0];
    }
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
}
