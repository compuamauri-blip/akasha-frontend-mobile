import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Headers estrictos para simular un navegador real y evitar el Error 400
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    // INTENTO 1: Usando la nueva API principal de Cobalt
    let cobaltRes = await fetch('https://api.cobalt.tools/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        url: body.url,
        isAudioOnly: body.isAudio
      })
    });

    // INTENTO 2: Si la nueva falla (Error 400), intentamos con la API clásica
    if (!cobaltRes.ok) {
      cobaltRes = await fetch('https://api.cobalt.tools/api/json', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          url: body.url,
          isAudioOnly: body.isAudio
        })
      });
    }

    if (!cobaltRes.ok) {
      return NextResponse.json({ error: `Cobalt rechazó el enlace (Error ${cobaltRes.status}). Puede ser un video privado, una historia temporal, o un formato 'Share' bloqueado por Facebook.` }, { status: 500 });
    }

    const data = await cobaltRes.json();
    
    // Cobalt puede devolver el enlace directo o un array de opciones. Esto atrapa ambos.
    const finalUrl = data.url || (data.picker && data.picker.length > 0 ? data.picker[0].url : null);

    if (!finalUrl) {
       return NextResponse.json({ error: `La red procesó el enlace pero no devolvió el archivo MP4.` }, { status: 500 });
    }

    return NextResponse.json({ url: finalUrl });
    
  } catch (error: any) {
    return NextResponse.json({ error: 'El puente de Vercel no pudo conectarse con la red de extracción.' }, { status: 500 });
  }
}