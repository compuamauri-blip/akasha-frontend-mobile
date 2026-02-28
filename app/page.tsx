'use client';
import { useState, useEffect, useRef } from 'react';

/* ==========================================================================
   COMPONENTES SVG EMPAQUETADOS
   Iconos optimizados para no depender de librerías externas
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

export default function Home() {
  /* ==========================================================================
     ESTADOS DE LA APLICACIÓN
     ========================================================================== */
  // Interfaz Principal
  const [linkInput, setLinkInput] = useState('');
  const [listaVideos, setListaVideos] = useState<any[]>([]);
  const [capturadorActivo, setCapturadorActivo] = useState(false);
  const [listaCaptura, setListaCaptura] = useState<string[]>([]);
  
  // Modales y Pestañas
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [pestañaActiva, setPestañaActiva] = useState('General');
  const [modalAbierto, setModalAbierto] = useState(''); 
  const [abriendoCarpeta, setAbriendoCarpeta] = useState(false);

  // Configuración del Usuario
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

  /* ==========================================================================
     REFERENCIAS (Para acceso seguro en efectos asíncronos)
     ========================================================================== */
  const lastClipboard = useRef('');
  const listaVideosRef = useRef(listaVideos);
  const configRef = useRef(config);

  useEffect(() => { listaVideosRef.current = listaVideos; }, [listaVideos]);
  useEffect(() => { configRef.current = config; }, [config]);

  // Variables calculadas
  const videosCompletados = listaVideos.filter(v => v.estado === 'Completado').length;

  /* ==========================================================================
     EFECTOS SECUNDARIOS
     ========================================================================== */
  // Configuración de metadatos (Título y Favicon fallback)
  useEffect(() => {
    document.title = "AKASHA Downloader Pro";
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/logo-akasha.png';
  }, []);

  // Monitor del Portapapeles (Capturador)
  useEffect(() => {
    const checkClipboard = async () => {
      if (!document.hasFocus()) return;
      try {
        const text = await navigator.clipboard.readText();
        const cleanText = text.trim();
        if (cleanText && cleanText !== lastClipboard.current && /^https?:\/\//i.test(cleanText)) {
          lastClipboard.current = cleanText;
          setListaVideos(currentVideos => {
            const yaEnLista = currentVideos.some(v => v.url === cleanText);
            setListaCaptura(prevCaptura => {
              if (!yaEnLista && !prevCaptura.includes(cleanText)) {
                setCapturadorActivo(true);
                if (config.Modo1Clic) {
                  setTimeout(() => { 
                    setListaVideos(cv => [...cv, { id: Date.now().toString(), url: cleanText, estado: 'En Cola', progreso: 0, colorProgreso: '#FF0000' }]); 
                  }, 0);
                  return prevCaptura;
                }
                return [...prevCaptura, cleanText];
              }
              return prevCaptura;
            });
            return currentVideos;
          });
        }
      } catch (err) {
        // Ignorado intencionalmente (permisos de portapapeles denegados o API no disponible)
      }
    };
    
    const interval = setInterval(checkClipboard, 1000);
    window.addEventListener('focus', checkClipboard);
    return () => { 
      clearInterval(interval); 
      window.removeEventListener('focus', checkClipboard); 
    };
  }, [config.Modo1Clic]);

  // Motor Principal de Descargas (Gestión de Cola y Sincronización)
  useEffect(() => {
    let isActive = true; // Previene fugas de memoria si el componente se desmonta

    const procesarCola = async () => {
      if (!isActive) return;
      
      const currentList = listaVideosRef.current;
      const conf = configRef.current;
      const maxConcurrent = conf.MaxSimultaneas === 'Ilimitadas' ? 999 : parseInt(conf.MaxSimultaneas) || 1;
      const progressUpdates: Record<string, number> = {};

      // Consultar estado actual al servidor Python
      for (const v of currentList) {
        if (v.estado === 'Descargando') {
          try {
            const res = await fetch(`https://akasha-api-1k5x.onrender.com/api/progreso/${v.id}`);
            if (res.ok) { 
              const data = await res.json(); 
              progressUpdates[v.id] = data.progreso; 
            }
          } catch(e) {
            // Ignorado: El backend podría estar procesando o temporalmente inaccesible
          } 
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
            
            // Actualizar progresos
            if (v.estado === 'Descargando' && progressUpdates[v.id] !== undefined) {
              const p = progressUpdates[v.id];
              if (p < 0) {
                newState[i] = { ...v, progreso: 0, colorProgreso: '#CC0000', estado: 'Error' };
                hasChanges = true; 
                activeCount--;
              } else if (p >= 0 && p !== v.progreso) {
                let c = '#FF0000'; 
                if (p > 33) c = '#FF8C00'; 
                if (p > 66) c = '#F1C40F'; 
                if (p >= 100) c = '#00C851'; 
                
                newState[i] = { ...v, progreso: p, colorProgreso: c, estado: p >= 100 ? 'Completado' : 'Descargando' };
                hasChanges = true;
                if (p >= 100) activeCount--; 
              }
            }
            
            // Iniciar nuevas descargas si hay espacio en la cola
            if (newState[i].estado === 'En Cola' && activeCount < maxConcurrent) {
              activeCount++;
              newState[i] = { ...newState[i], estado: 'Descargando', progreso: 1, colorProgreso: '#FF0000' };
              hasChanges = true;
              toTrigger.push(newState[i]);
            }
          }
          
          descargasATrigger = toTrigger;
          return hasChanges ? newState : prev;
        });

        // Disparar las peticiones POST de las descargas encoladas
        descargasATrigger.forEach(v => {
          fetch('https://akasha-api-1k5x.onrender.com/api/descargar', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              url: v.url, 
              id_video: v.id, 
              formato: conf.FormatoDefault, 
              ruta_base: conf.RutaDescargas, 
              limite_velocidad: conf.LimiteVelocidad, 
              subtitulos: conf.Subtitulos, 
              calidad: conf.CalidadDefault 
            })
          }).catch(()=>{});
        });
      }
      
      if (isActive) setTimeout(procesarCola, 1000);
    };
    
    procesarCola();
    return () => { isActive = false; };
  }, []);

  /* ==========================================================================
     FUNCIONES Y MANEJADORES DE EVENTOS
     ========================================================================== */
  const abrirConfiguracion = () => { 
    setTempConfig({ ...config }); 
    setPestañaActiva('General'); 
    setMostrarConfig(true); 
  };
  
  const guardarConfiguracion = () => { 
    setConfig({ ...tempConfig }); 
    setMostrarConfig(false); 
  };
  
  const cancelarConfiguracion = () => setMostrarConfig(false);

  const abrirCarpetaReal = async () => {
    try {
      const rutaWindows = config.RutaDescargas.replace(/\//g, '\\');
      const res = await fetch('https://akasha-api-1k5x.onrender.com/api/abrir_carpeta', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ ruta: rutaWindows })
      });
      if (!res.ok) alert(`⚠️ La carpeta aún no existe en tu computadora.\nSe creará automáticamente cuando inicies la primera descarga.`);
    } catch (e) { 
      alert(`Servidor apagado. Tu ruta de descargas es: ${config.RutaDescargas}`); 
    }
  };

  const abrirExplorador = async () => {
    setAbriendoCarpeta(true);
    try {
      const res = await fetch('https://akasha-api-1k5x.onrender.com/api/explorar');
      const data = await res.json();
      if (data.ruta) setTempConfig(prev => ({ ...prev, RutaDescargas: data.ruta }));
    } catch (e) { 
      alert("Servidor Python (Cerebro) apagado."); 
    } finally { 
      setAbriendoCarpeta(false); 
    }
  };

  const importarEnlaces = () => {
    if (listaCaptura.length === 0) return;
    const nuevosEnlaces = listaCaptura.join('\n');
    setLinkInput(prev => prev ? prev + '\n' + nuevosEnlaces : nuevosEnlaces);
    setListaCaptura([]); 
    setCapturadorActivo(false); 
  };

  const agregarLink = () => {
    if (!linkInput.trim()) return;
    const urls = linkInput.split('\n').map(u => u.trim()).filter(u => u !== '');
    
    const nativeRegex = /^https?:\/\/.+/i; 
    let validUrls: string[] = [];
    let errorType = '';

    for (const url of urls) {
      if (!nativeRegex.test(url)) { 
        errorType = 'errada'; 
        break; 
      } else if (listaVideos.some(v => v.url === url) || validUrls.includes(url)) { 
        errorType = 'repetida'; 
        break; 
      } else { 
        validUrls.push(url); 
      }
    }

    if (errorType === 'errada') { 
      alert("URL errada, verifique e intente de nuevo"); 
      return; 
    } else if (errorType === 'repetida') { 
      alert("URL ya se ha agregado"); 
      return; 
    }

    if (validUrls.length > 0) {
      setListaVideos(prev => {
        const nuevos = validUrls.map((url, i) => ({ 
          id: Date.now().toString() + i, 
          url: url, 
          estado: 'Pendiente', 
          progreso: 0, 
          colorProgreso: '#FF0000' 
        }));
        return [...prev, ...nuevos];
      });
      setLinkInput(''); 
    }
  };

  const limpiarListaSegura = () => {
    if (listaVideos.some(v => v.estado === 'Descargando' || v.estado === 'En Cola')) { 
      alert("Espere a que finalicen todas las descargas."); 
      return; 
    }
    setListaVideos([]);
  };

  const togglePausa = async (id: string) => {
    const video = listaVideos.find(v => v.id === id);
    if (!video) return;
    
    if (video.estado === 'Descargando') {
      await fetch(`https://akasha-api-1k5x.onrender.com/api/cancelar/${id}`).catch(()=>{});
      setListaVideos(prev => prev.map(v => v.id === id ? { ...v, estado: 'Pausado', colorProgreso: '#FF8C00' } : v));
    } else if (video.estado === 'Pausado' || video.estado === 'Pendiente' || video.estado === 'Error') {
      setListaVideos(prev => prev.map(v => v.id === id ? { ...v, estado: 'En Cola', colorProgreso: '#FF0000' } : v));
    }
  };

  const eliminarVideo = async (id: string) => {
    const video = listaVideos.find(v => v.id === id);
    if(video && (video.estado === 'Descargando' || video.estado === 'Pausado')) {
        await fetch(`https://akasha-api-1k5x.onrender.com/api/cancelar/${id}`).catch(()=>{});
    }
    setListaVideos(prev => prev.filter(vid => vid.id !== id));
  };

  /* ==========================================================================
     ESTILOS Y TEMAS DINÁMICOS (Tailwind CSS)
     ========================================================================== */
  const isDark = config.TemaOscuro;
  const cBgApp = isDark ? 'bg-[#1E1E1E]' : 'bg-[#F0F0F0]';
  const cBgBox = isDark ? 'bg-[#2D2D2D]' : 'bg-[#FFFFFF]';
  const cFgText = isDark ? 'text-[#E0E0E0]' : 'text-[#000000]';
  const cListBg = isDark ? 'bg-[#252526]' : 'bg-[#FFFFFF]';
  
  const isTempDark = tempConfig.TemaOscuro;
  const cConfigModalBg = isTempDark ? 'bg-[#252526]' : 'bg-[#F9F9F9]';
  const cConfigText = isTempDark ? 'text-[#E0E0E0]' : 'text-[#000000]';
  const cConfigInnerBg = isTempDark ? 'bg-[#1E1E1E]' : 'bg-white';
  const cConfigTabBg = isTempDark ? 'bg-[#2D2D2D]' : 'bg-gray-100';
  const cConfigTabHover = isTempDark ? 'hover:bg-[#333]' : 'hover:bg-white';
  const cConfigBorder = isTempDark ? 'border-[#444]' : 'border-gray-300';
  
  const btnPremium = "font-bold text-[14px] py-[8px] px-[15px] rounded-[8px] shadow-[0_3px_0_rgba(0,0,0,0.25)] active:translate-y-[2px] active:shadow-[0_1px_0_rgba(0,0,0,0.2)] transition-all flex items-center justify-center text-center cursor-pointer";
  const nativeInput = `border rounded-[3px] outline-none px-2 transition-colors duration-200 ${isTempDark ? 'border-[#555] bg-[#333] text-white focus:border-[#0078D7]' : 'border-gray-300 bg-white text-black focus:border-[#0078D7]'}`;
  const modalWrapperStyle = `rounded-[8px] border border-gray-300 shadow-2xl overflow-hidden`;

  /* ==========================================================================
     RENDERIZADO (DOM)
     ========================================================================== */
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors duration-300 ${cBgApp} ${cFgText}`}>
      
      {/* --- VENTANA PRINCIPAL --- */}
      <div className={`w-full max-w-[920px] h-[85vh] min-h-[580px] max-h-[750px] rounded-[8px] shadow-2xl flex flex-col border-2 border-[#E67E22] ${cBgBox}`}>
        <header className="flex justify-between items-center p-4 flex-wrap gap-2 flex-none">
          <div className="flex items-center gap-4">
            <img src="/logo-akasha.png" className="w-[55px] h-[55px] object-contain" alt="logo" onError={(e) => e.currentTarget.style.display = 'none'} />
            <h1 className="text-[26px] font-bold">AKASHA Downloader v1</h1>
          </div>
          <button type="button" onClick={abrirConfiguracion} className="w-[45px] h-[45px] cursor-pointer flex justify-center items-center transition-all duration-700 hover:rotate-[360deg] active:scale-90" title="Configuración">
            <IconGear fill={isDark ? '#CCCCCC' : '#555555'} />
          </button>
        </header>

        <div className="px-[15px] pb-[5px] space-y-[15px] flex-none">
          <textarea className={`w-full h-[80px] p-[5px] border border-gray-300 outline-none resize-none text-[14px] rounded-[4px] ${cBgBox} ${cFgText}`} value={linkInput} onChange={(e) => setLinkInput(e.target.value)} />
          <div className="flex flex-wrap gap-[10px] pb-[10px]">
            <button type="button" onClick={agregarLink} className={`${btnPremium} flex-grow min-w-[105px] h-[40px] bg-[#F1C40F] text-[#000000]`}>Agregar</button>
            <button type="button" onClick={importarEnlaces} className={`${btnPremium} flex-grow min-w-[120px] h-[40px] bg-[#9B59B6] text-[#FFFFFF]`}>Importar ({listaCaptura.length})</button>
            <button type="button" onClick={() => setListaVideos(prev => prev.map(v => v.estado === 'Pendiente' || v.estado === 'Error' ? {...v, estado: 'En Cola'} : v))} className={`${btnPremium} flex-grow min-w-[120px] h-[40px] bg-[#3498DB] text-[#FFFFFF]`}>Descargar</button>
            <button type="button" onClick={limpiarListaSegura} className={`${btnPremium} flex-grow min-w-[120px] h-[40px] bg-[#2ECC71] text-[#000000]`}>Limpiar Lista</button>
            <button type="button" onClick={abrirCarpetaReal} className={`${btnPremium} flex-grow min-w-[130px] h-[40px] bg-[#E67E22] text-[#FFFFFF]`}>Abrir Carpeta</button>
          </div>
        </div>

        <div className={`flex-1 min-h-0 mx-[15px] mb-[10px] border border-gray-300 rounded-[4px] overflow-auto ${cListBg}`}>
          <table className="w-full text-left border-collapse text-[13px] min-w-[700px]">
            <thead className={`sticky top-0 z-10 ${isDark ? 'bg-[#333]' : 'bg-gray-100'} shadow-sm`}>
              <tr className={`border-b ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                <th className="p-2 font-bold w-[400px]">URL</th>
                <th className="p-2 font-bold w-[85px] text-center">Estado</th>
                <th className="p-2 font-bold w-[220px] text-center">Progreso</th>
                <th className="p-2 font-bold w-[110px] text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaVideos.map((v) => (
                <tr key={v.id} className={`border-b ${isDark ? 'border-gray-700 hover:bg-white/5' : 'border-gray-200/50 hover:bg-black/5'}`}>
                  <td className="p-2 truncate max-w-[300px] md:max-w-[380px] font-medium">{v.url}</td>
                  <td className={`p-2 text-center text-xs font-bold uppercase ${v.estado === 'Error' ? 'text-red-500' : (isDark ? 'text-gray-400' : 'text-gray-500')}`}>{v.estado}</td>
                  <td className="p-2">
                    <div className={`w-[200px] ${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-[14px] mx-auto rounded-full overflow-hidden shadow-inner`}>
                      <div className="h-full transition-all duration-300 rounded-full" style={{ width: `${v.progreso}%`, backgroundColor: v.colorProgreso }}></div>
                    </div>
                  </td>
                  <td className="p-2 flex justify-center gap-1">
                    {v.estado !== 'Completado' && v.estado !== 'Cancelado' && v.estado !== 'Error' && (
                      <>
                        <button type="button" onClick={() => togglePausa(v.id)} className="w-[28px] h-[28px] bg-[#FFF0E0] border border-[#FFCC99] rounded-[4px] flex justify-center items-center cursor-pointer hover:bg-[#FFE0C0] shadow-sm active:scale-90 transition-transform" title={v.estado === 'Pausado' ? "Continuar" : "Pausar"}>
                          {v.estado === 'Pausado' ? <span className="text-[#FF8C00] font-bold text-[10px]">▶</span> : <span className="text-[#FF8C00] font-bold text-[10px]">||</span>}
                        </button>
                        <button type="button" onClick={() => eliminarVideo(v.id)} className="w-[28px] h-[28px] bg-[#FFE6E6] border border-[#FFB3B3] rounded-[4px] flex justify-center items-center cursor-pointer hover:bg-[#FFCCCC] shadow-sm active:scale-90 transition-transform" title="Cancelar">
                          <span className="text-[#CC0000] font-bold text-xs">X</span>
                        </button>
                      </>
                    )}
                    {v.estado === 'Error' && (
                      <>
                        <button type="button" onClick={() => togglePausa(v.id)} className="w-[28px] h-[28px] bg-[#FFF0E0] border border-[#FFCC99] rounded-[4px] flex justify-center items-center cursor-pointer hover:bg-[#FFE0C0] shadow-sm active:scale-90 transition-transform" title="Continuar">
                          <span className="text-[#FF8C00] font-bold text-[10px]">▶</span>
                        </button>
                        <button type="button" onClick={() => eliminarVideo(v.id)} className="w-[28px] h-[28px] bg-[#FFE6E6] border border-[#FFB3B3] rounded-[4px] flex justify-center items-center cursor-pointer hover:bg-[#FFCCCC] shadow-sm active:scale-90 transition-transform" title="Cancelar">
                          <span className="text-[#CC0000] font-bold text-xs">X</span>
                        </button>
                      </>
                    )}
                    {v.estado === 'Completado' && (
                       <button type="button" onClick={() => eliminarVideo(v.id)} className="w-[28px] h-[28px] bg-transparent flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full" title="Limpiar">
                         <span className="text-[#00C851] font-bold text-lg">✓</span>
                       </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-[15px] pb-[10px] flex flex-wrap justify-between items-center text-[11px] gap-2 flex-none">
          <div className={`flex items-center gap-2 font-bold min-w-[120px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className={`w-[12px] h-[12px] rounded-full shadow-inner ${capturadorActivo ? 'bg-[#00C851]' : 'bg-[#CC0000]'}`}></div>
            <span>Capturador {capturadorActivo ? 'Activo' : 'Inactivo'}</span>
          </div>
          <div className="font-bold text-center flex-grow">{videosCompletados} de {listaVideos.length} completados</div>
          <div className="text-right min-w-[280px]">Akasha Eco Aldea, Manizales, Caldas, Colombia. 2026</div>
        </div>
      </div>

      {/* --- MODAL CONFIGURACIÓN --- */}
      {mostrarConfig && (
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className={`w-full max-w-[560px] flex flex-col ${modalWrapperStyle} ${cConfigModalBg} ${cConfigText}`}>
            <div className={`h-[35px] ${cConfigInnerBg} flex justify-between items-center px-[12px] select-none border-b ${cConfigBorder} flex-none`}>
              <div className={`flex items-center gap-[8px] text-[13px] font-normal ${cConfigText}`}>
                <img src="/logo-akasha.png" className="w-[18px] h-[18px] object-contain" alt="icon" /> 
                <span>Configuración - AKASHA v1</span>
              </div>
              <button type="button" onClick={cancelarConfiguracion} className={`w-[30px] h-[24px] flex items-center justify-center transition-colors text-[16px] cursor-pointer rounded hover:bg-[#E81123] hover:text-white`}>✕</button>
            </div>
            
            <div className={`flex-grow flex flex-col p-[10px] bg-transparent overflow-hidden`}>
              <div className={`flex flex-wrap border-b ${cConfigBorder} gap-[2px] flex-none z-10 relative top-[1px]`}>
                {['General', 'Descargas', 'Red y Automático', 'Soporte y Comunidad'].map(tab => {
                  const isActive = pestañaActiva === tab;
                  return (
                    <button type="button" key={tab} onClick={() => setPestañaActiva(tab)} 
                      className={`px-[12px] py-[5px] text-[12px] border ${cConfigBorder} rounded-t-[4px] cursor-pointer transition-colors ${isActive ? `${cConfigInnerBg} border-b-transparent ${cConfigText} font-bold h-[29px]` : `${cConfigTabBg} ${cConfigTabHover} text-gray-500 h-[28px] mt-[1px]`}`}>
                      {tab}
                    </button>
                  )
                })}
              </div>

              <div className={`flex-1 min-h-[300px] border border-[#E67E22] p-[20px] overflow-y-auto text-[13px] ${cConfigInnerBg} ${cConfigText}`}>
                
                {pestañaActiva === 'General' && (
                  <div className="space-y-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <input id="chkTema" type="checkbox" checked={tempConfig.TemaOscuro} onChange={(e) => setTempConfig(prev => ({...prev, TemaOscuro: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkTema" className="font-bold text-[14px] cursor-pointer select-none">{tempConfig.TemaOscuro ? 'Activar Modo Claro (Por defecto)' : 'Activar Modo Oscuro (Modo Nocturno)'}</label>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <input id="chkNotif" type="checkbox" checked={tempConfig.Notificaciones} onChange={(e) => setTempConfig(prev => ({...prev, Notificaciones: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkNotif" className="cursor-pointer select-none">Reproducir sonido al terminar descarga</label>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <input id="chkLimp" type="checkbox" checked={tempConfig.AutoLimpiar} onChange={(e) => setTempConfig(prev => ({...prev, AutoLimpiar: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkLimp" className="cursor-pointer select-none">Limpiar lista automáticamente al terminar</label>
                    </div>
                    <div className={`border-t ${cConfigBorder} my-[20px]`}></div>
                    <div className="font-bold mb-[8px]">Seguridad:</div>
                    <div className="flex items-center gap-[8px]">
                      <input id="chkParental" type="checkbox" checked={tempConfig.ControlParental} onChange={(e) => setTempConfig(prev => ({...prev, ControlParental: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkParental" className="cursor-pointer select-none">Activar Control Parental</label>
                    </div>
                  </div>
                )}

                {pestañaActiva === 'Descargas' && (
                  <div className="flex flex-col gap-[15px]">
                    <div>
                      <div className="font-bold mb-[4px] text-[12px]">Carpeta de Destino:</div>
                      <div className="flex gap-1">
                        <input type="text" readOnly value={tempConfig.RutaDescargas} className={`flex-grow h-[26px] min-w-[50px] text-[12px] ${nativeInput}`}/>
                        <button type="button" onClick={abrirExplorador} disabled={abriendoCarpeta} className={`w-[30px] h-[26px] border ${cConfigBorder} ${cConfigTabBg} rounded-[2px] flex justify-center items-center cursor-pointer ${cConfigTabHover}`}>{abriendoCarpeta ? '⏳' : '...'}</button>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold mb-[4px] text-[12px]">Formato:</div>
                      <select value={tempConfig.FormatoDefault} onChange={(e) => setTempConfig(prev => ({...prev, FormatoDefault: e.target.value}))} className={`w-full h-[26px] text-[12px] ${nativeInput}`}>
                        <option>Original (Sin conversión)</option><option>Video (MP4)</option><option>Video (MKV)</option><option>Video (WebM)</option><option>Solo Audio (MP3)</option><option>Solo Audio (WAV)</option><option>Solo Audio (FLAC)</option>
                      </select>
                    </div>
                    <div>
                      <div className="font-bold mb-[4px] text-[12px]">Calidad de Video:</div>
                      <select value={tempConfig.CalidadDefault} onChange={(e) => setTempConfig(prev => ({...prev, CalidadDefault: e.target.value}))} className={`w-full h-[26px] text-[12px] ${nativeInput}`}>
                        <option>Original (Sin compresión)</option><option>Máxima (Mejor disponible)</option><option>1080p (Full HD)</option><option>720p (HD)</option>
                      </select>
                    </div>
                  </div>
                )}

                {pestañaActiva === 'Red y Automático' && (
                  <div className="flex flex-col">
                    <div className="flex flex-wrap gap-[15px]">
                      <div className="flex-1 min-w-[120px]">
                        <div className="font-bold mb-[4px] text-[12px]">Descargas Simultáneas:</div>
                        <select value={tempConfig.MaxSimultaneas} onChange={(e) => setTempConfig(prev => ({...prev, MaxSimultaneas: e.target.value}))} className={`w-full h-[26px] text-[12px] ${nativeInput}`}>
                          <option>1</option><option>2</option><option>3</option><option>5</option><option>10</option><option>Ilimitadas</option>
                        </select>
                      </div>
                      <div className="flex-1 min-w-[120px]">
                        <div className="font-bold mb-[4px] text-[12px]">Límite de Velocidad:</div>
                        <select value={tempConfig.LimiteVelocidad} onChange={(e) => setTempConfig(prev => ({...prev, LimiteVelocidad: e.target.value}))} className={`w-full h-[26px] text-[12px] ${nativeInput}`}>
                          <option>Sin limite</option><option>1 MB/s</option><option>3 MB/s</option><option>5 MB/s</option>
                        </select>
                      </div>
                    </div>
                    <div className={`border-t ${cConfigBorder} my-[15px]`}></div>
                    <div className="font-bold mb-[8px]">Avanzado:</div>
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <input id="chk1C" type="checkbox" checked={tempConfig.Modo1Clic} onChange={(e) => setTempConfig(prev => ({...prev, Modo1Clic: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chk1C" className="cursor-pointer select-none">Modo 1-Clic: Empezar descarga automáticamente</label>
                    </div>
                  </div>
                )}

                {pestañaActiva === 'Soporte y Comunidad' && (
                  <div className="flex flex-col items-center justify-center pt-2">
                     <img src="/logo-akasha.png" className="w-[75px] h-[75px] object-contain mb-[15px]" alt="logo" />
                     <div className={`font-bold text-[15px] mb-[25px] text-center ${cConfigText}`}>Gracias por ser parte de la Comunidad AKASHA</div>
                     <button type="button" onClick={() => setModalAbierto('manual')} className={`${btnPremium} w-full max-w-[280px] h-[45px] bg-[#3498DB] text-[#FFFFFF] mb-[10px]`}>Manual de Usuario</button>
                     <button type="button" onClick={() => setModalAbierto('contacto')} className={`${btnPremium} w-full max-w-[280px] h-[45px] bg-[#9B59B6] text-[#FFFFFF] mb-[10px]`}>Contacto y Soporte Técnico</button>
                     <button type="button" onClick={() => setModalAbierto('donar')} className={`${btnPremium} w-full max-w-[280px] h-[45px] bg-[#2ECC71] text-[#000000]`}>Apoyar el Proyecto (Donar)</button>
                  </div>
                )}

              </div>
              
              <div className="pt-[12px] pb-[4px] flex justify-end gap-[10px] flex-none">
                <button type="button" onClick={guardarConfiguracion} className={`w-[110px] h-[36px] bg-[#E67E22] text-white font-bold rounded-[6px] shadow-sm hover:bg-[#d8701a]`}>Guardar</button>
                <button type="button" onClick={cancelarConfiguracion} className={`w-[100px] h-[36px] ${isTempDark ? 'bg-[#444] text-white hover:bg-[#555]' : 'bg-[#F1F1F1] text-black hover:bg-[#E5E5E5] border border-gray-300'} font-bold rounded-[6px] shadow-sm`}>Cancelar</button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- MODALES SECUNDARIOS: CONTACTO Y DONACIONES --- */}
      {modalAbierto === 'contacto' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className={`w-[360px] flex flex-col ${cConfigModalBg} ${modalWrapperStyle} relative`}>
            <div className={`h-[35px] ${cConfigInnerBg} flex justify-between items-center px-[12px] border-b ${cConfigBorder}`}>
              <span className={`text-[13px] ${cConfigText}`}>Contacto y Soporte</span>
              <button type="button" onClick={() => setModalAbierto('')} className="hover:bg-[#E81123] hover:text-white w-[30px] h-[24px] flex items-center justify-center rounded transition-colors text-[16px]">✕</button>
            </div>
            <div className={`p-[25px] flex flex-col items-center border border-[#E67E22] m-[10px] rounded-[4px] ${cConfigInnerBg} ${cConfigText}`}>
              <div className="font-bold text-[14px] mb-[20px] text-center">¿Tienes alguna duda? Escríbenos:</div>
              <button type="button" onClick={() => window.open(`https://wa.me/573155622460`, '_blank')} className={`${btnPremium} w-full h-[45px] bg-[#25D366] text-black mb-[10px] flex gap-2`}><IconWA/> WhatsApp</button>
              <button type="button" onClick={() => window.location.href = `mailto:compuamauri@gmail.com`} className={`${btnPremium} w-full h-[45px] bg-[#D44638] text-white flex gap-2`}><IconMail/> Correo</button>
            </div>
          </div>
        </div>
      )}

      {modalAbierto === 'donar' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className={`w-[420px] flex flex-col ${cConfigModalBg} ${modalWrapperStyle} relative`}>
            <div className={`h-[35px] ${cConfigInnerBg} flex justify-between items-center px-[12px] border-b ${cConfigBorder}`}>
              <span className={`text-[13px] ${cConfigText}`}>Apoyar el Proyecto</span>
              <button type="button" onClick={() => setModalAbierto('')} className="hover:bg-[#E81123] hover:text-white w-[30px] h-[24px] flex items-center justify-center rounded transition-colors text-[16px]">✕</button>
            </div>
            <div className={`p-[25px] flex flex-col border border-[#E67E22] m-[10px] rounded-[4px] ${cConfigInnerBg} ${cConfigText}`}>
              <div className="font-bold text-[15px] text-center mb-[15px]">¡Tu apoyo mantiene vivo este software!</div>
              <div className={`border rounded-[6px] p-[20px] ${isTempDark ? 'border-[#555] bg-[#222]' : 'border-gray-200 bg-gray-50'}`}>
                <div className="font-bold text-center text-[#E67E22] text-[13px] mb-[15px]">CUENTAS NACIONALES (COLOMBIA)</div>
                <div className="font-bold text-[12px]">NEQUI:</div>
                <div className="font-bold text-[18px] mb-[10px]">3155622460</div>
                <div className="font-bold text-[12px]">BANCOLOMBIA (Ahorros):</div>
                <div className="font-bold text-[18px] mb-[15px]">912-932520-12</div>
                <div className={`italic text-[12px] ${isTempDark ? 'text-gray-400' : 'text-gray-600'}`}>Titular: Andrés Mauricio Rivera</div>
                <div className={`italic text-[12px] ${isTempDark ? 'text-gray-400' : 'text-gray-600'}`}>C.C: 75077470</div>
              </div>
              <button type="button" onClick={() => window.open(`https://wa.me/573155622460`, '_blank')} className={`${btnPremium} w-full h-[45px] bg-[#25D366] text-black mt-[20px] flex gap-2 flex-none`}><IconWA/> Ya transferí - Comprobante</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MANUAL DE USUARIO --- */}
      {modalAbierto === 'manual' && (
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-[100] p-4">
          <div className="w-full max-w-[1000px] h-[90vh] bg-[#f4f7f6] rounded-[8px] shadow-2xl flex flex-col relative overflow-hidden">
            
            <div className="h-[45px] bg-[#2d3e50] flex justify-between items-center px-[20px] flex-none shadow-md z-10">
              <div className="flex items-center gap-[10px] text-white">
                <img src="/logo-akasha.png" className="w-[20px] h-[20px] object-contain" alt="logo" />
                <span className="font-bold text-[15px]">Manual de Usuario AKASHA</span>
              </div>
              <button type="button" onClick={() => setModalAbierto('')} className="bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold px-[15px] py-[5px] rounded-[4px] text-[12px] transition-colors shadow-sm active:translate-y-[1px]">Volver</button>
            </div>

            <div className="flex-grow overflow-y-auto text-[#2d3436] font-sans leading-[1.8] p-[20px] md:p-[40px]">
              
              <div className="text-center border-b-[4px] border-[#E67E22] pb-[20px] mb-[40px] bg-white p-[30px] rounded-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] mx-auto max-w-[900px]">
                <img src="/logo-akasha.png" alt="Logo Akasha" className="w-[85px] h-auto mb-[15px] rounded-[18px] mx-auto block" />
                <h1 className="text-[#2d3e50] text-[2.5em] font-bold mb-[5px] mt-0">AKASHA Downloader Pro v1</h1>
                <p className="text-[1.2em] text-[#7f8c8d] mt-0">Gestión Multimedia de Alto Rendimiento - Documentación Oficial</p>
              </div>

              <div className="bg-white p-[30px] rounded-[12px] shadow-[0_10px_20px_rgba(0,0,0,0.05)] mb-[25px] border border-[#e1e8ed] mx-auto max-w-[900px]">
                <h2 className="text-[#E67E22] border-l-[5px] border-[#E67E22] pl-[15px] mt-0 uppercase text-[1.3em] bg-[#fffaf5] p-[10px_15px] rounded-r-[8px] font-bold mb-[15px]">1. Introducción y Bienvenida</h2>
                <p>Has adquirido una herramienta diseñada con estándares profesionales para la extracción y descarga de contenido multimedia. A diferencia de programas genéricos, <strong>AKASHA Downloader Pro</strong> opera sin publicidad, protege tu privacidad y gestiona múltiples descargas simultáneas exprimiendo al máximo tu conexión a internet de forma inteligente.</p>
              </div>

              <div className="bg-white p-[30px] rounded-[12px] shadow-[0_10px_20px_rgba(0,0,0,0.05)] mb-[25px] border border-[#e1e8ed] mx-auto max-w-[900px]">
                <h2 className="text-[#E67E22] border-l-[5px] border-[#E67E22] pl-[15px] mt-0 uppercase text-[1.3em] bg-[#fffaf5] p-[10px_15px] rounded-r-[8px] font-bold mb-[20px]">2. Guía de Inicio Rápido (El Paso a Paso)</h2>
                <p>Para realizar tu primera extracción de manera exitosa, sigue este sencillo procedimiento:</p>
                <div className="mt-[20px] flex flex-col gap-[15px]">
                  <p className="flex items-start"><span className="bg-[#E67E22] text-white rounded-full w-[25px] h-[25px] flex items-center justify-center text-[0.9em] font-bold mr-[10px] flex-none mt-[2px]">1</span> <span><strong>Abre AKASHA Downloader Pro</strong> y déjalo minimizado o a un lado en tu pantalla.</span></p>
                  <p className="flex items-start"><span className="bg-[#E67E22] text-white rounded-full w-[25px] h-[25px] flex items-center justify-center text-[0.9em] font-bold mr-[10px] flex-none mt-[2px]">2</span> <span><strong>Busca tu contenido:</strong> Ve a tu navegador de internet (Chrome, Edge, etc.) y abre la plataforma o red social de donde desees extraer el video o audio.</span></p>
                  <p className="flex items-start"><span className="bg-[#E67E22] text-white rounded-full w-[25px] h-[25px] flex items-center justify-center text-[0.9em] font-bold mr-[10px] flex-none mt-[2px]">3</span> <span><strong>Copia el enlace:</strong> Elige el video o canción que desees descargar, selecciona <em>"Compartir"</em> y luego dale clic en <strong>"Copiar enlace"</strong>. ¡El resto lo hace AKASHA!</span></p>
                  <p className="flex items-start"><span className="bg-[#E67E22] text-white rounded-full w-[25px] h-[25px] flex items-center justify-center text-[0.9em] font-bold mr-[10px] flex-none mt-[2px]">4</span> <span><strong>Revisa el Capturador:</strong> Regresa a tu AKASHA Downloader Pro. Verás que el pequeño indicador en la esquina inferior izquierda cambió de rojo (apagado) a verde (<strong>"Capturador activo"</strong>). Además, en el paréntesis del botón morado verás la cantidad de videos disponibles en la "papelera" para descargar.</span></p>
                  <p className="flex items-start"><span className="bg-[#E67E22] text-white rounded-full w-[25px] h-[25px] flex items-center justify-center text-[0.9em] font-bold mr-[10px] flex-none mt-[2px]">5</span> <span><strong>Importa y Agrega:</strong> Dale clic al botón morado <strong>Importar</strong> y verás cómo los enlaces aparecen en la pantalla de carga de texto. Ahora da clic en el botón amarillo <strong>Agregar</strong>, y verás cómo se preparan elegantemente en la fila inferior.</span></p>
                  <p className="flex items-start"><span className="bg-[#E67E22] text-white rounded-full w-[25px] h-[25px] flex items-center justify-center text-[0.9em] font-bold mr-[10px] flex-none mt-[2px]">6</span> <span><strong>¡Haz la magia!:</strong> Dale clic al botón azul <strong>Descargar</strong> y listo. Podrás hacerle seguimiento a tu descarga con la barra de progreso interactiva. Al terminar, escucharás un sonido de alerta y verás un símbolo de aprobado verde.</span></p>
                  <p className="flex items-start"><span className="bg-[#E67E22] text-white rounded-full w-[25px] h-[25px] flex items-center justify-center text-[0.9em] font-bold mr-[10px] flex-none mt-[2px]">7</span> <span><strong>Disfruta:</strong> Para ver tus archivos descargados, solo dale clic al botón naranja <strong>Abrir carpeta</strong> y, ¡Voilà! He ahí todas tus descargas con la máxima calidad.</span></p>
                </div>
              </div>

              <div className="bg-white p-[30px] rounded-[12px] shadow-[0_10px_20px_rgba(0,0,0,0.05)] mb-[25px] border border-[#e1e8ed] mx-auto max-w-[900px]">
                <h2 className="text-[#E67E22] border-l-[5px] border-[#E67E22] pl-[15px] mt-0 uppercase text-[1.3em] bg-[#fffaf5] p-[10px_15px] rounded-r-[8px] font-bold mb-[15px]">3. Explicación de los Controles e Interfaz</h2>
                <p>Conoce las herramientas que tienes a tu disposición en la ventana principal:</p>
                <ul className="pl-[20px] list-disc mt-[15px] flex flex-col gap-[12px]">
                  <li><strong>El Cuadro de Texto Blanco:</strong> Es tu área de trabajo manual. Puedes pegar aquí listas enteras de enlaces (uno por renglón) para descargar discografías o cursos completos de una sola vez.</li>
                  <li><strong>Botón "Limpiar Lista" (Verde):</strong> Ideal para mantener el orden. Borra de la pantalla visual las descargas que ya llegaron al 100%, pero tranquilo, <strong>jamás borrará</strong> los archivos físicos de tu computadora.</li>
                  <li><strong>Botón Naranja (Pausar/Reanudar):</strong> Lo encuentras al lado de cada descarga activa. Detiene la transferencia de datos guardando tu progreso. Haz clic de nuevo (play) para reanudar sin perder los megabytes ya avanzados.</li>
                  <li><strong>Botón Rojo (Cancelar):</strong> Aborta la operación de manera segura, saca el video de la lista y borra automáticamente la "basura" temporal de tu disco duro.</li>
                </ul>
              </div>

              <div className="bg-white p-[30px] rounded-[12px] shadow-[0_10px_20px_rgba(0,0,0,0.05)] mb-[25px] border border-[#e1e8ed] mx-auto max-w-[900px]">
                <h2 className="text-[#E67E22] border-l-[5px] border-[#E67E22] pl-[15px] mt-0 uppercase text-[1.3em] bg-[#fffaf5] p-[10px_15px] rounded-r-[8px] font-bold mb-[20px]">4. Configuración Avanzada (Engranaje)</h2>
                <p>Al hacer clic en el <strong>Engranaje</strong> de la esquina superior derecha, accederás al cerebro del programa. Te explicamos sus secciones más poderosas:</p>
                
                <h3 className="text-[#34495e] mt-[25px] border-b border-dashed border-[#ddd] pb-[5px] font-bold text-[1.17em] mb-[10px]">Pestaña: General</h3>
                <ul className="pl-[20px] list-disc flex flex-col gap-[8px]">
                  <li><strong>Modo Oscuro:</strong> Cambia la interfaz a tonos oscuros, ideal para proteger la vista en la noche o en sesiones largas de trabajo.</li>
                  <li><strong>Notificaciones:</strong> Activa o desactiva la señal sonora que te avisa cuando un archivo llega al 100%.</li>
                </ul>

                <h3 className="text-[#34495e] mt-[25px] border-b border-dashed border-[#ddd] pb-[5px] font-bold text-[1.17em] mb-[10px]">Pestaña: Descargas</h3>
                <ul className="pl-[20px] list-disc flex flex-col gap-[8px]">
                  <li><strong>Formato:</strong> Si eliges <em>"Original (Sin conversión)"</em>, bajarás el archivo nativo súper rápido. Si quieres extraer música, simplemente cambia esto a <strong>"Solo Audio (MP3)"</strong> y AKASHA extraerá la pista musical en alta fidelidad automáticamente.</li>
                  <li><strong>Calidad de Video:</strong> Por defecto está en calidad <em>Máxima Original</em>. Si tienes poco espacio en disco o internet lento, fórzalo a <strong>720p (HD)</strong> para tener videos ligeros y de excelente calidad.</li>
                </ul>

                <h3 className="text-[#34495e] mt-[25px] border-b border-dashed border-[#ddd] pb-[5px] font-bold text-[1.17em] mb-[10px]">Pestaña: Red y Automático</h3>
                <ul className="pl-[20px] list-disc flex flex-col gap-[8px]">
                  <li><strong>Descargas Simultáneas:</strong> ¡El motor multi-hilo! Cambia de "1" a "3", "5" o "Ilimitadas" para que el programa abra múltiples conexiones al mismo tiempo y descargue varios videos en paralelo.</li>
                  <li><strong>El "Modo 1-Clic":</strong> Es la función favorita de los usuarios Pro. Al activarla, olvida los botones "Agregar" e "Importar". Simplemente deja el programa abierto, navega por internet, y cada vez que presiones "Copiar enlace", AKASHA lo capturará y comenzará a descargarlo <strong>automáticamente</strong> de inmediato.</li>
                  <li><strong>Videos Privados:</strong> Activa esta casilla si necesitas descargar contenido de plataformas donde tienes sesión iniciada (como cursos pagos). AKASHA usará las cookies seguras de tu navegador para autenticarse por ti.</li>
                </ul>
              </div>

              <div className="text-center mt-[40px] p-[30px] bg-white rounded-[12px] border-t-[5px] border-[#3498db] shadow-[0_10px_20px_rgba(0,0,0,0.05)] mx-auto max-w-[900px]">
                <h2 className="m-0 border-none p-0 bg-transparent text-[1.5em] text-[#2d3e50] font-bold mb-[20px]">Soporte Técnico Especializado</h2>
                <p className="text-[1.1em] mb-[20px]">¿Tienes un problema específico, encontraste un error o deseas proponer una función para la próxima versión de AKASHA? Nuestro equipo está listo para asistirte de inmediato.</p>
                
                <div className="flex justify-center flex-wrap gap-[15px]">
                  <a href="https://wa.me/573155622460" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-[15px_30px] no-underline rounded-[8px] font-bold text-[1.1em] transition-all duration-300 bg-[#25D366] text-black shadow-[0_4px_#128C7E] hover:-translate-y-[2px] hover:shadow-[0_6px_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-[0_1px_rgba(0,0,0,0.2)]">
                    <span className="mr-[10px]"><IconWA/></span> Escríbenos por WhatsApp
                  </a>
                  <a href="mailto:compuamauri@gmail.com" className="inline-flex items-center justify-center p-[15px_30px] no-underline rounded-[8px] font-bold text-[1.1em] transition-all duration-300 bg-[#D44638] text-white shadow-[0_4px_#b23124] hover:-translate-y-[2px] hover:shadow-[0_6px_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-[0_1px_rgba(0,0,0,0.2)]">
                    <span className="mr-[10px]"><IconMail/></span> Déjanos un Correo Electrónico
                  </a>
                </div>
              </div>
              
              <footer className="text-center mt-[60px] p-[30px] border-t-[2px] border-[#E67E22] text-[#636e72] text-[1.1em] leading-[1.5] mx-auto max-w-[900px]">
                <strong>Akasha Eco Aldea</strong><br/>
                Manizales, Caldas, Colombia.<br/>
                2026
              </footer>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}