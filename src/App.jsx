import React, { useEffect, useRef, useState } from 'react';
import LinhaDoTempo from './LinhaDoTempo';
import { Volume2, VolumeX, PlayCircle } from 'lucide-react';

export default function App() {
  const [bgAtual, setBgAtual] = useState('/linha-do-tempo/img.png');
  const [tocando, setTocando] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);
  const [contador, setContador] = useState(3);
  const [mostrarLinhaDoTempo, setMostrarLinhaDoTempo] = useState(false);

  // Carrega o áudio
  useEffect(() => {
    const audio = new Audio('/linha-do-tempo/m2.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
  }, []);

  // Atualiza volume dinamicamente
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Contagem regressiva
  useEffect(() => {
    if (contador > 0) {
      const timer = setTimeout(() => setContador(contador - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setMostrarLinhaDoTempo(true);
      handlePlayPause(); // começa a música automaticamente após a contagem
    }
  }, [contador]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (tocando) {
      audioRef.current.pause();
      setTocando(false);
    } else {
      audioRef.current
        .play()
        .then(() => setTocando(true))
        .catch((err) => console.error('Falha ao tocar:', err));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed transition-all duration-700"
      style={{ backgroundImage: `url('${bgAtual}')` }}
    >
      <div className="backdrop-blur-sm bg-white/80 min-h-screen relative flex items-center justify-center">
        {/* Contagem regressiva */}
        {!mostrarLinhaDoTempo ? (
          <div className="text-8xl font-extrabold text-gray-700 animate-pulse">
            {contador}
          </div>
        ) : (
          <>
            {/* Ícone de play/pause e volume */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/70 rounded-full shadow px-3 py-2">
              <button onClick={handlePlayPause}>
                {tocando ? (
                  <Volume2 className="w-6 h-6 text-pink-600" />
                ) : (
                  <PlayCircle className="w-6 h-6 text-pink-600" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24"
              />
            </div>

            <LinhaDoTempo onBgChange={setBgAtual} />
          </>
        )}
      </div>
    </div>
  );
}
