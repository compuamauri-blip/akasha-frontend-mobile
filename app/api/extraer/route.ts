import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let targetUrl = body.url;

    // =========================================================================
    // EL DESENMASCARADOR DE FACEBOOK (Anti-Share)
    // Si detecta un link engañoso, Vercel lo abre primero para extraer el link real
    // =========================================================================
    if (targetUrl.includes('facebook.com/share') || targetUrl.includes('fb.watch')) {
      try {
        const fbRes = await fetch(targetUrl, { 
          redirect: 'follow',
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        targetUrl = fbRes.url; // Aquí atrapamos el link real del video/reel
      } catch (e) {
        console.log("No se pudo expandir el enlace de Facebook");
      }
    }

    // Headers estrictos para simular un navegador real
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    // INTENTO 1: Pedimos el video usando la URL ya desenmascarada
    let cobaltRes = await fetch('https://api.cobalt.tools/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        url: targetUrl,
        isAudioOnly: body.isAudio
      })
    });

    // INTENTO 2: Respaldo
    if (!cobaltRes.ok) {
      cobaltRes = await fetch('https://api.cobalt.tools/api/json', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          url: targetUrl,
          isAudioOnly: body.isAudio
        })
      });
    }

    if (!cobaltRes.ok) {
      return NextResponse.json({ error: `Cobalt rechazó el enlace (Error ${cobaltRes.status}). Verifica que el video no sea privado.` }, { status: 500 });
    }

    const data = await cobaltRes.json();
    
    // Extraemos el enlace puro de descarga
    const finalUrl = data.url || (data.picker && data.picker.length > 0 ? data.picker[0].url : null);

    if (!finalUrl) {
       return NextResponse.json({ error: `Se analizó el enlace pero no se encontró el archivo MP4 descargable.` }, { status: 500 });
    }

    return NextResponse.json({ url: finalUrl });
    
  } catch (error: any) {
    return NextResponse.json({ error: 'El puente de Vercel falló al procesar la solicitud.' }, { status: 500 });
  }
}