import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let targetUrl = body.url;

    // 1. Desenmascarador de Facebook
    if (targetUrl.includes('facebook.com/share') || targetUrl.includes('fb.watch')) {
      try {
        const fbRes = await fetch(targetUrl, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0' } });
        targetUrl = fbRes.url;
      } catch (e) {}
    }

    // 2. Cabeceras estrictas obligatorias
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // 3. El NUEVO idioma exacto que exige la red (Sin esto da Error 400)
    const payload = body.isAudio 
        ? { url: targetUrl, downloadMode: "audio" } 
        : { url: targetUrl };

    // 4. Red de servidores mundiales de respaldo (Anti-Caídas)
    const instances = [
      'https://api.cobalt.tools/',
      'https://cobalt.qewertywurster.dev/',
      'https://cobalt.ooguy.com/'
    ];

    let finalUrl = null;
    let lastError = 500;

    // 5. El motor intenta descargar saltando de servidor en servidor si alguno falla
    for (const url of instances) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload)
        });
        
        if (res.ok) {
          const data = await res.json();
          finalUrl = data.url || (data.picker && data.picker.length > 0 ? data.picker[0].url : null);
          if (finalUrl) break; // Si hay éxito, detiene la búsqueda
        } else {
          lastError = res.status;
        }
      } catch (e) {
        continue; // Si un servidor está caído, pasa al siguiente silenciosamente
      }
    }

    if (!finalUrl) {
      return NextResponse.json({ error: `Los servidores globales rechazaron la extracción (Error ${lastError}).` }, { status: 400 });
    }

    return NextResponse.json({ url: finalUrl });
    
  } catch (error: any) {
    return NextResponse.json({ error: 'El puente de Vercel falló catastróficamente.' }, { status: 500 });
  }
}
