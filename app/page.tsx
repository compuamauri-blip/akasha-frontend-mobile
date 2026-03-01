'use client';
import { useState, useEffect, useRef } from 'react';

/* ==========================================================================
   COMPONENTES SVG ORIGINALES
   ========================================================================== */
const IconGear = ({ fill }: { fill: string }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill={fill}>
    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.98C19.47,12.66 19.5,12.34 19.5,12C19.5,11.66 19.47,11.34 19.43,11.02L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11.02C4.53,11.34 4.5,11.66 4.5,12C4.5,12.34 4.53,12.66 4.57,12.98L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.98Z"/>
  </svg>
);
const IconWA = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.883-.653-1.48-1.459-1.653-1.756-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const extraerUrls = (texto: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const encontradas = texto.match(urlRegex);
  return encontradas ? encontradas : [];
};

export default function Home() {
  /* ==========================================================================
     ESTADOS
     ========================================================================== */
  const [isLoaded, setIsLoaded] = useState(false); // Bandera para saber si ya leyó el disco duro
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const [linkInput, setLinkInput] = useState('');
  const [listaVideos, setListaVideos] = useState<any[]>([]);
  const [capturadorActivo, setCapturadorActivo] = useState(false);
  const [listaCaptura, setListaCaptura] = useState<string[]>([]);
  
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [pestañaActiva, setPestañaActiva] = useState('General');
  const [modalAbierto, setModalAbierto] = useState(''); 
  const [abriendoCarpeta, setAbriendoCarpeta] = useState(false);

  // AQUÍ ESTÁN TUS 12 OPCIONES ORIGINALES COMPLETAS
  const [config, setConfig] = useState({
    TemaOscuro: false, 
    Notificaciones: true, 
    AutoLimpiar: false, 
    ControlParental: false,
    RutaDescargas: 'C:/Users/Downloads/AKASHA', 
    FormatoDefault: 'Original (Sin conversión)',
    CalidadDefault: 'Original (Sin compresión)', 
    Subtitulos: false, 
    MaxSimultaneas: '1',
    LimiteVelocidad: 'Sin limite', 
    VideosPrivados: false, 
    Modo1Clic: false
  });
  const [tempConfig, setTempConfig] = useState({ ...config });

  const lastClipboard = useRef('');
  const listaVideosRef = useRef(listaVideos);
  const configRef = useRef(config);

  useEffect(() => { listaVideosRef.current = listaVideos; }, [listaVideos]);
  useEffect(() => { configRef.current = config; }, [config]);

  const videosCompletados = listaVideos.filter(v => v.estado === 'Completado').length;

  /* ==========================================================================
     SISTEMA DE MEMORIA LOCAL (Soluciona el reseteo al compartir)
     ========================================================================== */
  useEffect(() => {
    // 1. Cargar datos guardados al iniciar
    const savedVideos = localStorage.getItem('akasha_videos');
    const savedConfig = localStorage.getItem('akasha_config');
    if (savedVideos) setListaVideos(JSON.parse(savedVideos));
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      setTempConfig(parsedConfig);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // 2. Guardar automáticamente cada vez que cambie la lista o la configuración
    if (isLoaded) {
      localStorage.setItem('akasha_videos', JSON.stringify(listaVideos));
      localStorage.setItem('akasha_config', JSON.stringify(config));
    }
  }, [listaVideos, config, isLoaded]);

  /* ==========================================================================
     EFECTOS SECUNDARIOS Y MOTORES
     ========================================================================== */
  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2500);
    const t2 = setTimeout(() => setShowSplash(false), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    document.title = "AKASHA Downloader Pro";
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = '/logo-akasha.png';
  }, []);

  // RECEPTOR DE COMPARTIR (Acumula sin borrar lo anterior)
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sharedText = params.get('url') || params.get('text') || params.get('title') || '';
      const urlsEncontradas = extraerUrls(sharedText);
      
      if (urlsEncontradas.length > 0) {
        window.history.replaceState({}, document.title, "/");
        setListaVideos(prev => {
          let newState = [...prev];
          urlsEncontradas.forEach(sharedUrl => {
            if (!newState.some(v => v.url === sharedUrl)) {
              const estadoInicial = configRef.current.Modo1Clic ? 'En Cola' : 'Pendiente';
              newState.push({ id: Date.now().toString() + Math.random(), url: sharedUrl, estado: estadoInicial, progreso: 0, colorProgreso: '#FF0000' });
            }
          });
          return newState;
        });
      }
    }
  }, [isLoaded]);

  // Monitor del Portapapeles
  useEffect(() => {
    const checkClipboard = async () => {
      if (!document.hasFocus() || !isLoaded) return;
      try {
        const text = await navigator.clipboard.readText();
        const urlsEncontradas = extraerUrls(text);
        
        if (urlsEncontradas.length > 0 && text.trim() !== lastClipboard.current) {
          lastClipboard.current = text.trim();
          setListaVideos(cv => {
            setListaCaptura(pc => {
              let nuevosAAnadir: string[] = [];
              for (const url of urlsEncontradas) {
                if (!cv.some(v => v.url === url) && !pc.includes(url)) nuevosAAnadir.push(url);
              }
              if (nuevosAAnadir.length > 0) {
                setCapturadorActivo(true);
                if (config.Modo1Clic) {
                  setTimeout(() => { 
                    setListaVideos(v => [...v, ...nuevosAAnadir.map((u, i) => ({ id: Date.now().toString() + i, url: u, estado: 'En Cola', progreso: 0, colorProgreso: '#FF0000' }))]); 
                  }, 0);
                  return pc;
                }
                return [...pc, ...nuevosAAnadir];
              }
              return pc;
            });
            return cv;
          });
        }
      } catch (err) {}
    };
    const interval = setInterval(checkClipboard, 1000);
    window.addEventListener('focus', checkClipboard);
    return () => { clearInterval(interval); window.removeEventListener('focus', checkClipboard); };
  }, [config.Modo1Clic, isLoaded]);

  // MOTOR DE DESCARGAS Y PUENTE DE ENTREGA
  useEffect(() => {
    let isActive = true;
    const procesarCola = async () => {
      if (!isActive || !isLoaded) return;
      const currentList = listaVideosRef.current;
      const conf = configRef.current;
      const maxConcurrent = conf.MaxSimultaneas === 'Ilimitadas' ? 999 : parseInt(conf.MaxSimultaneas) || 1;
      const progressUpdates: Record<string, number> = {};

      for (const v of currentList) {
        if (v.estado === 'Descargando') {
          try {
            const res = await fetch(`https://akasha-api-1k5x.onrender.com/api/progreso/${v.id}`);
            if (res.ok) { progressUpdates[v.id] = (await res.json()).progreso; }
          } catch(e) {} 
        }
      }

      if (isActive) {
        let descargasATrigger: any[] = [];
        setListaVideos(prev => {
          let activeCount = prev.filter(v => v.estado === 'Descargando').length;
          let newState = [...prev];
          let hasChanges = false;
          let toTrigger = [];

          for (let i = 0; i < newState.length; i++) {
            const v = newState[i];
            if (v.estado === 'Descargando' && progressUpdates[v.id] !== undefined) {
              const p = progressUpdates[v.id];
              if (p < 0) {
                newState[i] = { ...v, progreso: 0, colorProgreso: '#CC0000', estado: 'Error' };
                hasChanges = true; activeCount--;
              } else if (p >= 0 && p !== v.progreso) {
                let c = '#FF0000'; if (p > 33) c = '#FF8C00'; if (p > 66) c = '#F1C40F'; if (p >= 100) c = '#00C851'; 
                
                // Si el progreso llega a 100 por primera vez, forzamos la descarga al celular
                if (p >= 100 && v.progreso < 100) {
                  newState[i] = { ...v, progreso: 100, colorProgreso: '#00C851', estado: 'Completado' };
                  hasChanges = true; 
                  activeCount--;
                  
                  // Inyector Nativo de Descarga (Soluciona el "Video Fantasma")
                  setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = `https://akasha-api-1k5x.onrender.com/api/obtener_archivo/${v.id}`;
                    link.target = '_blank';
                    link.download = `Media_${v.id}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }, 500);
                } else if (p < 100) {
                  newState[i] = { ...v, progreso: p, colorProgreso: c, estado: 'Descargando' };
                  hasChanges = true;
                }
              }
            }
            if (newState[i].estado === 'En Cola' && activeCount < maxConcurrent) {
              activeCount++;
              newState[i] = { ...newState[i], estado: 'Descargando', progreso: 1, colorProgreso: '#FF0000' };
              hasChanges = true; toTrigger.push(newState[i]);
            }
          }
          descargasATrigger = toTrigger;
          return hasChanges ? newState : prev;
        });

        descargasATrigger.forEach(v => {
          fetch('https://akasha-api-1k5x.onrender.com/api/descargar', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: v.url, id_video: v.id, formato: conf.FormatoDefault, ruta_base: conf.RutaDescargas, limite_velocidad: conf.LimiteVelocidad, subtitulos: conf.Subtitulos, calidad: conf.CalidadDefault })
          }).catch(()=>{});
        });
      }
      if (isActive) setTimeout(procesarCola, 1000);
    };
    procesarCola();
    return () => { isActive = false; };
  }, [isLoaded]);

  /* ==========================================================================
     FUNCIONES DE UI
     ========================================================================== */
  const abrirConfiguracion = () => { setTempConfig({ ...config }); setPestañaActiva('General'); setMostrarConfig(true); };
  const guardarConfiguracion = () => { setConfig({ ...tempConfig }); setMostrarConfig(false); };
  const cancelarConfiguracion = () => setMostrarConfig(false);

  const abrirCarpetaReal = async () => {
    try {
      const rutaWindows = config.RutaDescargas.replace(/\//g, '\\');
      const res = await fetch('https://akasha-api-1k5x.onrender.com/api/abrir_carpeta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ruta: rutaWindows }) });
      if (!res.ok) alert(`⚠️ En el celular, busca en tu app de "Descargas" o "Galería".`);
    } catch (e) { alert(`Servidor apagado.`); }
  };

  const abrirExplorador = async () => {
    setAbriendoCarpeta(true);
    try {
      const res = await fetch('https://akasha-api-1k5x.onrender.com/api/explorar');
      if (res.ok) {
        const data = await res.json();
        setTempConfig(prev => ({ ...prev, RutaDescargas: data.ruta }));
      }
    } catch (e) { alert("Servidor apagado."); } finally { setAbriendoCarpeta(false); }
  };

  const importarEnlaces = () => {
    if (listaCaptura.length === 0) return;
    setLinkInput(prev => prev ? prev + '\n' + listaCaptura.join('\n') : listaCaptura.join('\n'));
    setListaCaptura([]); setCapturadorActivo(false); 
  };

  const agregarLink = () => {
    if (!linkInput.trim()) return;
    const urls = extraerUrls(linkInput);
    let validUrls: string[] = [];
    for (const url of urls) { if (!listaVideos.some(v => v.url === url)) validUrls.push(url); }
    if (validUrls.length > 0) {
      setListaVideos(prev => [...prev, ...validUrls.map((url, i) => ({ id: Date.now().toString() + i, url, estado: 'Pendiente', progreso: 0, colorProgreso: '#FF0000' }))]);
      setLinkInput(''); 
    }
  };

  const limpiarListaSegura = () => {
    if (listaVideos.some(v => v.estado === 'Descargando' || v.estado === 'En Cola')) { alert("Espera a finalizar las descargas activas."); return; }
    setListaVideos([]);
  };

  const togglePausa = async (id: string) => {
    const video = listaVideos.find(v => v.id === id);
    if (!video) return;
    if (video.estado === 'Descargando') {
      await fetch(`https://akasha-api-1k5x.onrender.com/api/cancelar/${id}`).catch(()=>{});
      setListaVideos(prev => prev.map(v => v.id === id ? { ...v, estado: 'Pausado', colorProgreso: '#FF8C00' } : v));
    } else {
      setListaVideos(prev => prev.map(v => v.id === id ? { ...v, estado: 'En Cola', colorProgreso: '#FF0000' } : v));
    }
  };

  const eliminarVideo = async (id: string) => {
    const video = listaVideos.find(v => v.id === id);
    if(video && (video.estado === 'Descargando' || video.estado === 'Pausado')) await fetch(`https://akasha-api-1k5x.onrender.com/api/cancelar/${id}`).catch(()=>{});
    setListaVideos(prev => prev.filter(vid => vid.id !== id));
  };

  /* ==========================================================================
     RENDERIZADO VISUAL
     ========================================================================== */
  const isDark = config.TemaOscuro;
  const isTempDark = tempConfig.TemaOscuro;
  const cBgApp = isDark ? 'bg-[#1E1E1E]' : 'bg-[#F0F0F0]';
  const cBgBox = isDark ? 'bg-[#2D2D2D]' : 'bg-[#FFFFFF]';
  const cFgText = isDark ? 'text-[#E0E0E0]' : 'text-[#000000]';
  const cListBg = isDark ? 'bg-[#252526]' : 'bg-[#FFFFFF]';
  const cConfigModalBg = isTempDark ? 'bg-[#252526]' : 'bg-[#F9F9F9]';
  const cConfigText = isTempDark ? 'text-[#E0E0E0]' : 'text-[#000000]';
  const cConfigInnerBg = isTempDark ? 'bg-[#1E1E1E]' : 'bg-white';
  const cConfigTabBg = isTempDark ? 'bg-[#2D2D2D]' : 'bg-gray-100';
  const cConfigBorder = isTempDark ? 'border-[#444]' : 'border-gray-300';
  const btnPremium = "font-bold text-[14px] py-[8px] px-[15px] rounded-[8px] shadow-[0_3px_0_rgba(0,0,0,0.25)] active:translate-y-[2px] active:shadow-[0_1px_0_rgba(0,0,0,0.2)] transition-all flex items-center justify-center text-center cursor-pointer";
  const modalWrapperStyle = `rounded-[8px] border border-gray-300 shadow-2xl overflow-hidden`;

  return (
    <main className="relative min-h-screen overflow-hidden">
      
      {showSplash && (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative w-48 h-48 mb-6 animate-pulse">
            <img src="/logo-akasha.png" alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(230,126,34,0.4)]" />
          </div>
          <h1 className="text-4xl font-extrabold text-[#2d3e50] tracking-widest mb-1">AKASHA</h1>
          <p className="text-[#E67E22] text-xl font-medium tracking-[0.3em] uppercase mb-12">Downloader</p>
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-[#E67E22] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-[#E67E22] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-3 h-3 bg-[#E67E22] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      )}

      <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors duration-300 ${cBgApp} ${cFgText}`}>
        <div className={`w-full max-w-[920px] h-[85vh] min-h-[580px] max-h-[750px] rounded-[8px] shadow-2xl flex flex-col border-2 border-[#E67E22] ${cBgBox}`}>
          
          <header className="flex justify-between items-center p-4 flex-wrap gap-2 flex-none">
            <div className="flex items-center gap-4">
              <img src="/logo-akasha.png" className="w-[55px] h-[55px] object-contain" alt="logo" />
              <h1 className="text-[26px] font-bold">AKASHA Downloader v1</h1>
            </div>
            <button type="button" onClick={abrirConfiguracion} className="w-[45px] h-[45px] cursor-pointer flex justify-center items-center transition-all duration-700 hover:rotate-[360deg] active:scale-90" title="Configuración">
              <IconGear fill={isDark ? '#CCCCCC' : '#555555'} />
            </button>
          </header>

          <div className="px-[15px] pb-[5px] space-y-[15px] flex-none">
            <textarea className={`w-full h-[80px] p-[5px] border border-gray-300 outline-none resize-none text-[14px] rounded-[4px] ${cBgBox} ${cFgText}`} value={linkInput} onChange={(e) => setLinkInput(e.target.value)} placeholder="Pega enlaces de YouTube, Instagram, TikTok..." />
            <div className="flex flex-wrap gap-[10px] pb-[10px]">
              <button onClick={agregarLink} className={`${btnPremium} flex-grow min-w-[105px] h-[40px] bg-[#F1C40F] text-black`}>Agregar</button>
              <button onClick={importarEnlaces} className={`${btnPremium} flex-grow min-w-[120px] h-[40px] bg-[#9B59B6] text-white`}>Importar ({listaCaptura.length})</button>
              <button onClick={() => setListaVideos(prev => prev.map(v => v.estado === 'Pendiente' || v.estado === 'Error' ? {...v, estado: 'En Cola'} : v))} className={`${btnPremium} flex-grow min-w-[120px] h-[40px] bg-[#3498DB] text-white`}>Descargar</button>
              <button onClick={limpiarListaSegura} className={`${btnPremium} flex-grow min-w-[120px] h-[40px] bg-[#2ECC71] text-black`}>Limpiar Lista</button>
              <button onClick={abrirCarpetaReal} className={`${btnPremium} flex-grow min-w-[130px] h-[40px] bg-[#E67E22] text-white`}>Abrir Carpeta</button>
            </div>
          </div>

          <div className={`flex-1 min-h-0 mx-[15px] mb-[10px] border border-gray-300 rounded-[4px] overflow-auto ${cListBg}`}>
            <table className="w-full text-left border-collapse text-[13px] min-w-[700px]">
              <thead className={`sticky top-0 z-10 ${isDark ? 'bg-[#333]' : 'bg-gray-100'} shadow-sm`}>
                <tr className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                  <th className="p-2 font-bold w-[400px]">URL</th>
                  <th className="p-2 font-bold w-[85px] text-center">Estado</th>
                  <th className="p-2 font-bold w-[220px] text-center">Progreso</th>
                  <th className="p-2 font-bold w-[110px] text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaVideos.map((v) => (
                  <tr key={v.id} className={`border-b ${isDark ? 'border-gray-700 hover:bg-white/5' : 'border-gray-200 hover:bg-black/5'}`}>
                    <td className="p-2 truncate max-w-[300px] font-medium">{v.url}</td>
                    <td className={`p-2 text-center text-xs font-bold uppercase ${v.estado === 'Error' ? 'text-red-500' : ''}`}>{v.estado}</td>
                    <td className="p-2">
                      <div className={`w-[200px] ${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-[14px] mx-auto rounded-full overflow-hidden`}>
                        <div className="h-full transition-all duration-300" style={{ width: `${v.progreso}%`, backgroundColor: v.colorProgreso }}></div>
                      </div>
                    </td>
                    <td className="p-2 flex justify-center gap-1">
                      {v.estado !== 'Completado' && (
                        <>
                          <button onClick={() => togglePausa(v.id)} className="w-[28px] h-[28px] border border-[#FFCC99] rounded-[4px] flex justify-center items-center">{v.estado === 'Pausado' ? '▶' : '||'}</button>
                          <button onClick={() => eliminarVideo(v.id)} className="w-[28px] h-[28px] border border-[#FFB3B3] rounded-[4px] flex justify-center items-center text-red-600 font-bold">X</button>
                        </>
                      )}
                      {v.estado === 'Completado' && <span className="text-[#00C851] font-bold text-lg">✓</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="px-[15px] pb-[10px] flex flex-wrap justify-between items-center text-[11px] gap-2 flex-none font-bold">
            <div className="flex items-center gap-2">
              <div className={`w-[12px] h-[12px] rounded-full ${capturadorActivo ? 'bg-[#00C851]' : 'bg-[#CC0000]'}`}></div>
              <span>Capturador {capturadorActivo ? 'Activo' : 'Inactivo'}</span>
            </div>
            <div>{videosCompletados} de {listaVideos.length} completados</div>
            <div>Akasha Eco Aldea, Colombia. 2026</div>
          </footer>
        </div>
      </div>

      {mostrarConfig && (
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className={`w-full max-w-[560px] flex flex-col ${modalWrapperStyle} ${cConfigModalBg} ${cConfigText}`}>
            <div className={`h-[35px] ${cConfigInnerBg} flex justify-between items-center px-[12px] border-b ${cConfigBorder}`}>
              <div className="flex items-center gap-[8px] text-[13px]">
                <img src="/logo-akasha.png" className="w-[18px] h-[18px]" alt="icon" /> 
                <span>Configuración - AKASHA v1</span>
              </div>
              <button onClick={cancelarConfiguracion} className="hover:bg-red-600 hover:text-white px-2 rounded text-lg">✕</button>
            </div>
            
            <div className="p-[10px] flex-grow flex flex-col overflow-hidden">
              <div className="flex flex-wrap border-b border-gray-300 gap-[2px]">
                {['General', 'Descargas', 'Red y Automático', 'Soporte y Comunidad'].map(tab => (
                  <button key={tab} onClick={() => setPestañaActiva(tab)} className={`px-[12px] py-[5px] text-[12px] border ${cConfigBorder} rounded-t-[4px] font-bold cursor-pointer transition-colors ${pestañaActiva === tab ? `${cConfigInnerBg} border-b-transparent` : `${cConfigTabBg} text-gray-500`}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className={`flex-1 min-h-[300px] border border-[#E67E22] p-[20px] overflow-y-auto text-[13px] ${cConfigInnerBg}`}>
                
                {pestañaActiva === 'General' && (
                  <div className="space-y-[12px]">
                    <div className="flex items-center gap-2">
                      <input id="chkTema" type="checkbox" checked={tempConfig.TemaOscuro} onChange={(e) => setTempConfig(p => ({...p, TemaOscuro: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkTema" className="font-bold cursor-pointer">{tempConfig.TemaOscuro ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="chkNotif" type="checkbox" checked={tempConfig.Notificaciones} onChange={(e) => setTempConfig(p => ({...p, Notificaciones: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkNotif" className="cursor-pointer">Reproducir sonido al finalizar descarga</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="chkLimp" type="checkbox" checked={tempConfig.AutoLimpiar} onChange={(e) => setTempConfig(p => ({...p, AutoLimpiar: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkLimp" className="cursor-pointer">Limpiar lista automáticamente al terminar</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="chkParental" type="checkbox" checked={tempConfig.ControlParental} onChange={(e) => setTempConfig(p => ({...p, ControlParental: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkParental" className="cursor-pointer">Activar Control Parental</label>
                    </div>
                  </div>
                )}

                {pestañaActiva === 'Descargas' && (
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold mb-1">Carpeta de Destino:</p>
                      <div className="flex gap-1">
                        <input type="text" readOnly value={tempConfig.RutaDescargas} className={`flex-1 border p-1 rounded ${isTempDark ? 'bg-[#333] border-[#555]' : 'bg-white'}`} />
                        <button onClick={abrirExplorador} className="bg-gray-200 px-2 rounded text-black hover:bg-gray-300">...</button>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Formato de Salida:</p>
                      <select value={tempConfig.FormatoDefault} onChange={e => setTempConfig(p => ({...p, FormatoDefault: e.target.value}))} className={`w-full border p-1 rounded outline-none ${isTempDark ? 'bg-[#333] border-[#555]' : 'bg-white border-gray-300'}`}>
                        <option>Original (Sin conversión)</option><option>Video (MP4)</option><option>Solo Audio (MP3)</option><option>Solo Audio (WAV)</option>
                      </select>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Calidad de Video:</p>
                      <select value={tempConfig.CalidadDefault} onChange={e => setTempConfig(p => ({...p, CalidadDefault: e.target.value}))} className={`w-full border p-1 rounded outline-none ${isTempDark ? 'bg-[#333] border-[#555]' : 'bg-white border-gray-300'}`}>
                        <option>Original (Sin compresión)</option><option>Máxima</option><option>1080p (Full HD)</option><option>720p (HD)</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 mt-2 border-t pt-3 border-gray-300">
                      <input id="chkSubs" type="checkbox" checked={tempConfig.Subtitulos} onChange={(e) => setTempConfig(p => ({...p, Subtitulos: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkSubs" className="font-bold cursor-pointer">Descargar e incrustar Subtítulos automáticamente</label>
                    </div>
                  </div>
                )}

                {pestañaActiva === 'Red y Automático' && (
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold mb-1">Descargas Simultáneas:</p>
                      <select value={tempConfig.MaxSimultaneas} onChange={e => setTempConfig(p => ({...p, MaxSimultaneas: e.target.value}))} className={`w-full border p-1 rounded outline-none ${isTempDark ? 'bg-[#333] border-[#555]' : 'bg-white border-gray-300'}`}>
                        <option>1</option><option>2</option><option>3</option><option>5</option><option>Ilimitadas</option>
                      </select>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Límite de Velocidad:</p>
                      <select value={tempConfig.LimiteVelocidad} onChange={e => setTempConfig(p => ({...p, LimiteVelocidad: e.target.value}))} className={`w-full border p-1 rounded outline-none ${isTempDark ? 'bg-[#333] border-[#555]' : 'bg-white border-gray-300'}`}>
                        <option>Sin limite</option><option>1 MB/s</option><option>3 MB/s</option><option>5 MB/s</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input id="chkPrivados" type="checkbox" checked={tempConfig.VideosPrivados} onChange={e => setTempConfig(p => ({...p, VideosPrivados: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkPrivados" className="cursor-pointer">Soporte para videos privados (requiere login manual)</label>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-300">
                      <input id="chk1c" type="checkbox" checked={tempConfig.Modo1Clic} onChange={e => setTempConfig(p => ({...p, Modo1Clic: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chk1c" className="font-bold cursor-pointer text-[#E67E22]">Modo 1-Clic: Empezar automáticamente</label>
                    </div>
                  </div>
                )}

                {pestañaActiva === 'Soporte y Comunidad' && (
                  <div className="flex flex-col items-center justify-center pt-2">
                     <img src="/logo-akasha.png" className="w-[75px] h-[75px] mb-4" alt="logo" />
                     <button onClick={() => setModalAbierto('manual')} className={`${btnPremium} w-full max-w-[280px] bg-[#3498DB] text-white mb-2`}>Manual de Usuario</button>
                     <button onClick={() => setModalAbierto('contacto')} className={`${btnPremium} w-full max-w-[280px] bg-[#9B59B6] text-white mb-2`}>Contacto y Soporte</button>
                     <button onClick={() => setModalAbierto('donar')} className={`${btnPremium} w-full max-w-[280px] bg-[#2ECC71] text-black`}>Apoyar Proyecto (Donar)</button>
                  </div>
                )}
              </div>
              
              <div className="pt-3 flex justify-end gap-2">
                <button onClick={guardarConfiguracion} className="w-28 h-9 bg-[#E67E22] text-white font-bold rounded hover:bg-[#d67118] transition-colors">Guardar</button>
                <button onClick={cancelarConfiguracion} className="w-24 h-9 bg-gray-200 text-black font-medium rounded hover:bg-gray-300 transition-colors">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALES SECUNDARIOS */}
      {modalAbierto === 'contacto' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className={`w-[360px] flex flex-col ${cConfigModalBg} rounded-[8px] overflow-hidden border border-gray-400 relative`}>
            <div className={`h-9 ${cConfigInnerBg} flex justify-between items-center px-3 border-b ${cConfigBorder}`}>
              <span className="text-xs font-bold">Soporte Técnico</span>
              <button onClick={() => setModalAbierto('')} className="hover:bg-red-600 hover:text-white px-2 rounded">✕</button>
            </div>
            <div className="p-6 flex flex-col items-center border border-[#E67E22] m-2 rounded bg-white">
              <button onClick={() => window.open(`https://wa.me/573155622460`)} className={`${btnPremium} w-full bg-[#25D366] mb-2`}><IconWA/> WhatsApp</button>
              <button onClick={() => window.location.href = `mailto:compuamauri@gmail.com`} className={`${btnPremium} w-full bg-[#D44638] text-white`}><IconMail/> Correo</button>
            </div>
          </div>
        </div>
      )}

      {modalAbierto === 'donar' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className={`w-[420px] bg-white rounded-[8px] border border-gray-300 relative`}>
            <div className="h-9 flex justify-between items-center px-3 border-b bg-gray-100 text-black">
              <span className="text-xs font-bold">Apoyar el Proyecto</span>
              <button onClick={() => setModalAbierto('')} className="hover:bg-red-600 hover:text-white px-2 rounded">✕</button>
            </div>
            <div className="p-6 flex flex-col border border-[#E67E22] m-2 rounded text-black">
              <p className="font-bold text-center mb-4">NEQUI: 3155622460</p>
              <p className="font-bold text-center mb-4">BANCOLOMBIA: 912-932520-12</p>
              <p className="text-center text-xs italic text-gray-600 mb-4">Titular: Andrés Mauricio Rivera</p>
              <button onClick={() => window.open(`https://wa.me/573155622460`)} className="bg-[#25D366] p-3 rounded font-bold text-center text-white shadow-md active:scale-95 transition-transform">Enviar Comprobante</button>
            </div>
          </div>
        </div>
      )}

      {modalAbierto === 'manual' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="w-full max-w-[1000px] h-[90vh] bg-[#f4f7f6] rounded-[8px] flex flex-col overflow-hidden shadow-2xl">
            <div className="h-11 bg-[#2d3e50] flex justify-between items-center px-5 text-white">
              <span className="font-bold tracking-widest">Manual de Usuario AKASHA</span>
              <button onClick={() => setModalAbierto('')} className="bg-[#e74c3c] px-3 py-1 rounded font-bold hover:bg-red-600 transition-colors">Volver</button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 leading-relaxed text-gray-800">
              <h1 className="text-3xl font-bold text-center mb-10 border-b-4 border-[#E67E22] pb-4">Documentación Oficial AKASHA v1</h1>
              
              <p className="mb-6 font-bold text-lg text-[#2d3e50]">1. Introducción</p>
              <p className="mb-6">Has adquirido una herramienta diseñada con estándares profesionales para la extracción y descarga de contenido multimedia. Este software te permite capturar videos de YouTube, Instagram, TikTok y más.</p>
              
              <p className="mb-6 font-bold text-lg text-[#2d3e50]">2. Métodos de Captura</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Método Clásico:</strong> Copia cualquier enlace y toca el botón "Importar" en AKASHA.</li>
                <li><strong>Método Nativo (Móvil):</strong> Usa el botón "Compartir" de cualquier App y selecciona el logo de AKASHA para enviarlo directo a la cola.</li>
              </ul>

              <p className="mb-6 font-bold text-lg text-[#2d3e50]">3. Ajustes de Descarga</p>
              <p className="mb-6">Desde el ícono del engranaje puedes configurar la <strong>Calidad del video</strong>, el <strong>Formato</strong>, los <strong>Subtítulos</strong> y tu <strong>Límite de velocidad</strong>. Si activas el "Modo 1-Clic", la descarga iniciará tan pronto el enlace toque la aplicación.</p>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}