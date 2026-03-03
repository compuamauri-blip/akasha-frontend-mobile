import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Vercel actúa como tu servidor y pide el enlace directo (sin procesamientos pesados)
    const cobaltRes = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: body.url,
        isAudioOnly: body.isAudio
      })
    });

    if (!cobaltRes.ok) {
      return NextResponse.json({ error: `La red externa bloqueó la petición (Error ${cobaltRes.status})` }, { status: 500 });
    }

    const data = await cobaltRes.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    return NextResponse.json({ error: 'El puente de Vercel no pudo conectarse.' }, { status: 500 });
  }
}