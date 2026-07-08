import { useEffect, useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { subscribeVoice, currentVoice, playVoice, stopVoice } from '../lib/voice';

// A pill that plays one of Pavan's cloned-voice clips. Only one clip plays at a
// time site-wide (managed by lib/voice). Hides itself if the clip can't play
// (e.g. the file hasn't been generated yet).
export function VoiceButton({ clip, label = 'Hear it from me', size = 'md', className = '' }) {
  const [playing, setPlaying] = useState(currentVoice() === clip);
  const [failed, setFailed] = useState(false);

  useEffect(() => subscribeVoice((key) => setPlaying(key === clip)), [clip]);

  if (failed) return null;

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentVoice() === clip) {
      stopVoice();
      return;
    }
    const ok = await playVoice(clip);
    if (!ok) setFailed(true);
  };

  const sizing =
    size === 'sm'
      ? 'px-2.5 py-1 text-[10px] gap-1'
      : 'px-3.5 py-1.5 text-xs gap-1.5';

  return (
    <button
      type="button"
      onClick={handleClick}
      title="AI clone of my real voice"
      aria-label={playing ? `Stop: ${label}` : `${label} — plays a short clip in my voice`}
      className={`inline-flex items-center rounded-full font-semibold transition-all duration-300 border ${sizing} ${
        playing
          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-primary/60 text-primary shadow-md shadow-primary/20 animate-pulse'
          : 'bg-primary/10 border-primary/25 text-primary hover:bg-primary/20 hover:border-primary/50 hover:scale-105'
      } ${className}`}
    >
      {playing ? (
        <Square className={size === 'sm' ? 'w-2.5 h-2.5 fill-current' : 'w-3 h-3 fill-current'} />
      ) : (
        <Volume2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      )}
      <span>{playing ? 'Tap to stop' : label}</span>
    </button>
  );
}
