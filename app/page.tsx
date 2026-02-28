'use client';
import { useState, useEffect, useRef } from 'react';

/* ==========================================================================
   COMPONENTES SVG ORIGINALES (Engranaje, WhatsApp, Mail)
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
     ESTADOS (Splash Screen + Tu Lógica Original Restaurada)
     ========================================================================== */
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

  const [config, setConfig] = useState({
    TemaOscuro: false, Notificaciones: true, AutoLimpiar: false, ControlParental: false,
    RutaDescargas: 'C:/Users/Downloads/AKASHA', FormatoDefault: 'Original (Sin conversión)',
    CalidadDefault: 'Original (Sin compresión)', Subtitulos: false, MaxSimultaneas: '1',
    LimiteVelocidad: 'Sin limite', VideosPrivados: false, Modo1Clic: false
  });
  const [tempConfig, setTempConfig] = useState({ ...config });

  const lastClipboard = useRef('');
  const listaVideosRef = useRef(listaVideos);
  const configRef = useRef(config);

  useEffect(() => { listaVideosRef.current = listaVideos; }, [listaVideos]);
  useEffect(() => { configRef.current = config; }, [config]);

  const videosCompletados = listaVideos.filter(v => v.estado === 'Completado').length;

  /* ==========================================================================
     EFECTOS SECUNDARIOS
     ========================================================================== */
  
  // 1. Splash Screen Timer
  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2500);
    const timer2 = setTimeout(() => setShowSplash(false), 3500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  // 2. Metadatos
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

  // 3. Monitor del Portapapeles (Restaurado)
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

  // 4. Motor Principal de Descargas
  useEffect(() => {
    let isActive = true;
    const procesarCola = async () => {
      if (!isActive) return;
      const currentList = listaVideosRef.current;
      const conf = configRef.current;
      const maxConcurrent = conf.MaxSimultaneas === 'Ilimitadas' ? 999 : parseInt(conf.MaxSimultaneas) || 1;
      const progressUpdates: Record<string, number> = {};