import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, isAudio } = await request.json();

    // Vercel hace la petición como servidor (Cero bloqueos CORS)
    const cobaltRes = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        vQuality: "1080",
        isAudioOnly: isAudio,
        aFormat: "mp3"
      })
    });

    if (!cobaltRes.ok) {
      return NextResponse.json({ error: 'Fallo al extraer en el servidor' }, { status: 500 });
    }

    const data = await cobaltRes.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}