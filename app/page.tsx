'use client';
import { useState, useEffect, useRef } from 'react';

/* ==========================================================================
   COMPONENTES SVG (Engranaje, WhatsApp, Mail)
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
     ESTADOS (Splash Screen + Tu Lógica Original)
     ========================================================================== */
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

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
    TemaOscuro: false, Notificaciones: true, AutoLimpiar: false, ControlParental: false,
    RutaDescargas: 'C:/Users/Downloads/AKASHA', FormatoDefault: 'Original (Sin conversión)',
    CalidadDefault: 'Original (Sin compresión)', Subtitulos: false, MaxSimultaneas: '1',
    LimiteVelocidad: 'Sin limite', VideosPrivados: false, Modo1Clic: false
  });
  const [tempConfig, setTempConfig] = useState({ ...config });

  /* ==========================================================================
     REFERENCIAS (Sincronización)
     ========================================================================== */
  const lastClipboard = useRef('');
  const listaVideosRef = useRef(listaVideos);
  const configRef = useRef(config);

  useEffect(() => { listaVideosRef.current = listaVideos; }, [listaVideos]);
  useEffect(() => { configRef.current = config; }, [config]);

  const videosCompletados = listaVideos.filter(v => v.estado === 'Completado').length;

  /* ==========================================================================
     EFECTOS SECUNDARIOS
     ========================================================================== */
  // 1. Control de Splash Screen
  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2500);
    const timer2 = setTimeout(() => setShowSplash(false), 3500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  // 2. Metadatos
  useEffect(() => {
    document.title = "AKASHA Downloader Pro";
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = '/logo-akasha.png';
  }, []);

  // 3. Monitor de Portapapeles
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
      } catch (err) {}
    };
    const interval = setInterval(checkClipboard, 1000);
    window.addEventListener('focus', checkClipboard);
    return () => { clearInterval(interval); window.removeEventListener('focus', checkClipboard); };
  }, [config.Modo1Clic]);

  // 4. Motor de Descargas (Cola)
  useEffect(() => {
    let isActive = true;
    const procesarCola = async () => {
      if (!isActive) return;
      const currentList = listaVideosRef.current;
      const conf = configRef.current;
      const maxConcurrent = conf.MaxSimultaneas === 'Ilimitadas' ? 999 : parseInt(conf.MaxSimultaneas) || 1;
      const progressUpdates: Record<string, number> = {};

      for (const v of currentList) {
        if (v.estado === 'Descargando') {
          try {
            const res = await fetch(`https://akasha-api-1k5x.onrender.com/api/progreso/${v.id}`);
            if (res.ok) { 
              const data = await res.json(); progressUpdates[v.id] = data.progreso; 
            }
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
                newState[i] = { ...v, progreso: p, colorProgreso: c, estado: p >= 100 ? 'Completado' : 'Descargando' };
                hasChanges = true; if (p >= 100) activeCount--; 
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
            body: JSON.stringify({ 
              url: v.url, id_video: v.id, formato: conf.FormatoDefault, ruta_base: conf.RutaDescargas, 
              limite_velocidad: conf.LimiteVelocidad, subtitulos: conf.Subtitulos, calidad: conf.CalidadDefault 
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
     FUNCIONES DE MANEJO
     ========================================================================== */
  const abrirConfiguracion = () => { setTempConfig({ ...config }); setPestañaActiva('General'); setMostrarConfig(true); };
  const guardarConfiguracion = () => { setConfig({ ...tempConfig }); setMostrarConfig(false); };
  const cancelarConfiguracion = () => setMostrarConfig(false);

  const abrirCarpetaReal = async () => {
    try {
      const rutaWindows = config.RutaDescargas.replace(/\//g, '\\');
      const res = await fetch('https://akasha-api-1k5x.onrender.com/api/abrir_carpeta', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ruta: rutaWindows })
      });
      if (!res.ok) alert(`⚠️ La carpeta aún no existe.`);
    } catch (e) { alert(`Servidor apagado.`); }
  };

  const abrirExplorador = async () => {
    setAbriendoCarpeta(true);
    try {
      const res = await fetch('https://akasha-api-1k5x.onrender.com/api/explorar');
      const data = await res.json();
      if (data.ruta) setTempConfig(prev => ({ ...prev, RutaDescargas: data.ruta }));
    } catch (e) { alert("Servidor apagado."); } finally { setAbriendoCarpeta(false); }
  };

  const importarEnlaces = () => {
    if (listaCaptura.length === 0) return;
    const nuevosEnlaces = listaCaptura.join('\n');
    setLinkInput(prev => prev ? prev + '\n' + nuevosEnlaces : nuevosEnlaces);
    setListaCaptura([]); setCapturadorActivo(false); 
  };

  const agregarLink = () => {
    if (!linkInput.trim()) return;
    const urls = linkInput.split('\n').map(u => u.trim()).filter(u => u !== '');
    let validUrls: string[] = [];
    for (const url of urls) {
      if (/^https?:\/\/.+/i.test(url) && !listaVideos.some(v => v.url === url)) validUrls.push(url);
    }
    if (validUrls.length > 0) {
      setListaVideos(prev => [...prev, ...validUrls.map((url, i) => ({ id: Date.now().toString() + i, url, estado: 'Pendiente', progreso: 0, colorProgreso: '#FF0000' }))]);
      setLinkInput(''); 
    }
  };

  const limpiarListaSegura = () => {
    if (listaVideos.some(v => v.estado === 'Descargando' || v.estado === 'En Cola')) { alert("Espera a finalizar."); return; }
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
     ESTILOS DINÁMICOS
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

  return (
    <main className="relative min-h-screen overflow-hidden">
      
      {/* --- PANTALLA DE CARGA (SPLASH SCREEN) --- */}
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

      {/* --- INTERFAZ DE LA APLICACIÓN --- */}
      <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors duration-300 ${cBgApp} ${cFgText}`}>
        <div className={`w-full max-w-[920px] h-[85vh] min-h-[580px] max-h-[750px] rounded-[8px] shadow-2xl flex flex-col border-2 border-[#E67E22] ${cBgBox}`}>
          
          <header className="flex justify-between items-center p-4 flex-wrap gap-2 flex-none">
            <div className="flex items-center gap-4">
              <img src="/logo-akasha.png" className="w-[55px] h-[55px] object-contain" alt="logo" />
              <h1 className="text-[26px] font-bold">AKASHA Downloader v1</h1>
            </div>
            {/* BOTÓN ENGRANAJE (YA REPARADO) */}
            <button type="button" onClick={abrirConfiguracion} className="w-[45px] h-[45px] cursor-pointer flex justify-center items-center transition-all duration-700 hover:rotate-[360deg] active:scale-90">
              <IconGear fill={isDark ? '#CCCCCC' : '#555555'} />
            </button>
          </header>

          <div className="px-[15px] pb-[5px] space-y-[15px] flex-none">
            <textarea className={`w-full h-[80px] p-[5px] border border-gray-300 outline-none resize-none text-[14px] rounded-[4px] ${cBgBox} ${cFgText}`} value={linkInput} onChange={(e) => setLinkInput(e.target.value)} placeholder="Pega tus enlaces aquí..." />
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
                      {v.estado !== 'Completado' && (
                        <>
                          <button type="button" onClick={() => togglePausa(v.id)} className="w-[28px] h-[28px] bg-[#FFF0E0] border border-[#FFCC99] rounded-[4px] flex justify-center items-center hover:bg-[#FFE0C0] shadow-sm">
                            {v.estado === 'Pausado' ? <span className="text-[#FF8C00] font-bold text-[10px]">▶</span> : <span className="text-[#FF8C00] font-bold text-[10px]">||</span>}
                          </button>
                          <button type="button" onClick={() => eliminarVideo(v.id)} className="w-[28px] h-[28px] bg-[#FFE6E6] border border-[#FFB3B3] rounded-[4px] flex justify-center items-center hover:bg-[#FFCCCC] shadow-sm">
                            <span className="text-[#CC0000] font-bold text-xs">X</span>
                          </button>
                        </>
                      )}
                      {v.estado === 'Completado' && <button onClick={() => eliminarVideo(v.id)} className="text-[#00C851] font-bold text-lg">✓</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="px-[15px] pb-[10px] flex flex-wrap justify-between items-center text-[11px] gap-2 flex-none">
            <div className={`flex items-center gap-2 font-bold min-w-[120px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className={`w-[12px] h-[12px] rounded-full shadow-inner ${capturadorActivo ? 'bg-[#00C851]' : 'bg-[#CC0000]'}`}></div>
              <span>Capturador {capturadorActivo ? 'Activo' : 'Inactivo'}</span>
            </div>
            <div className="font-bold text-center flex-grow">{videosCompletados} de {listaVideos.length} completados</div>
            <div className="text-right min-w-[280px]">Akasha Eco Aldea, Manizales, Caldas, Colombia. 2026</div>
          </footer>
        </div>
      </div>

      {/* --- MODAL CONFIGURACIÓN (RESTAURADO) --- */}
      {mostrarConfig && (
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className={`w-full max-w-[560px] flex flex-col rounded-[8px] border border-gray-300 shadow-2xl overflow-hidden ${cConfigModalBg} ${cConfigText}`}>
            <div className={`h-[35px] ${cConfigInnerBg} flex justify-between items-center px-[12px] border-b ${cConfigBorder} flex-none`}>
              <div className="flex items-center gap-[8px] text-[13px]">
                <img src="/logo-akasha.png" className="w-[18px] h-[18px] object-contain" alt="icon" /> 
                <span>Configuración - AKASHA v1</span>
              </div>
              <button type="button" onClick={cancelarConfiguracion} className="w-[30px] h-[24px] flex items-center justify-center hover:bg-[#E81123] hover:text-white rounded">✕</button>
            </div>
            
            <div className="flex-grow flex flex-col p-[10px] overflow-hidden">
              <div className="flex flex-wrap border-b border-gray-300 gap-[2px] flex-none">
                {['General', 'Descargas', 'Red y Automático', 'Soporte y Comunidad'].map(tab => (
                  <button key={tab} onClick={() => setPestañaActiva(tab)} className={`px-[12px] py-[5px] text-[12px] border ${cConfigBorder} rounded-t-[4px] cursor-pointer ${pestañaActiva === tab ? `${cConfigInnerBg} border-b-transparent font-bold` : `${cConfigTabBg} text-gray-500`}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className={`flex-1 min-h-[300px] border border-[#E67E22] p-[20px] overflow-y-auto text-[13px] ${cConfigInnerBg}`}>
                {pestañaActiva === 'General' && (
                  <div className="space-y-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <input id="chkTema" type="checkbox" checked={tempConfig.TemaOscuro} onChange={(e) => setTempConfig(prev => ({...prev, TemaOscuro: e.target.checked}))} className="w-[14px] h-[14px] cursor-pointer"/> 
                      <label htmlFor="chkTema" className="font-bold cursor-pointer">{tempConfig.TemaOscuro ? 'Modo Claro' : 'Modo Oscuro'}</label>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <input id="chkNotif" type="checkbox" checked={tempConfig.Notificaciones} onChange={(e) => setTempConfig(prev => ({...prev, Notificaciones: e.target.checked}))} /> 
                      <label htmlFor="chkNotif">Alertas sonoras</label>
                    </div>
                  </div>
                )}
                {/* SOPORTE (TU SECCIÓN ORIGINAL) */}
                {pestañaActiva === 'Soporte y Comunidad' && (
                  <div className="flex flex-col items-center justify-center pt-2">
                     <img src="/logo-akasha.png" className="w-[75px] h-[75px] object-contain mb-[15px]" alt="logo" />
                     <button type="button" onClick={() => setModalAbierto('manual')} className={`${btnPremium} w-full max-w-[280px] bg-[#3498DB] text-white mb-[10px]`}>Manual de Usuario</button>
                     <button type="button" onClick={() => setModalAbierto('contacto')} className={`${btnPremium} w-full max-w-[280px] bg-[#9B59B6] text-white mb-[10px]`}>Contacto</button>
                     <button type="button" onClick={() => setModalAbierto('donar')} className={`${btnPremium} w-full max-w-[280px] bg-[#2ECC71] text-black`}>Donar</button>
                  </div>
                )}
              </div>
              
              <div className="pt-[12px] flex justify-end gap-[10px] flex-none">
                <button type="button" onClick={guardarConfiguracion} className="w-[110px] h-[36px] bg-[#E67E22] text-white font-bold rounded-[6px]">Guardar</button>
                <button type="button" onClick={cancelarConfiguracion} className="w-[100px] h-[36px] bg-gray-200 rounded-[6px]">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALES DE CONTACTO / DONAR (RESTRICTAMENTE TUS ORIGINALES) --- */}
      {modalAbierto === 'contacto' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className={`w-[360px] flex flex-col ${cConfigModalBg} rounded-[8px] overflow-hidden border border-gray-400`}>
            <div className={`h-[35px] ${cConfigInnerBg} flex justify-between items-center px-[12px] border-b ${cConfigBorder}`}>
              <span className="text-[13px]">Soporte</span>
              <button onClick={() => setModalAbierto('')}>✕</button>
            </div>
            <div className={`p-[25px] flex flex-col items-center border border-[#E67E22] m-[10px] rounded-[4px] ${cConfigInnerBg}`}>
              <button onClick={() => window.open(`https://wa.me/573155622460`)} className={`${btnPremium} w-full bg-[#25D366] mb-[10px]`}><IconWA/> WhatsApp</button>
              <button onClick={() => window.location.href = `mailto:compuamauri@gmail.com`} className={`${btnPremium} w-full bg-[#D44638] text-white`}><IconMail/> Correo</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}