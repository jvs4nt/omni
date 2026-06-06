import { useCallback, useEffect, useRef, useState } from 'react';

export function useAudioFeedback() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? saved === 'true' : true;
  });
  const lastTypingTime = useRef(0);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current && window.AudioContext) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      initAudio();
      document.removeEventListener('click', handler);
      document.removeEventListener('keydown', handler);
    };
    document.addEventListener('click', handler);
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('keydown', handler);
    };
  }, [initAudio]);

  const playTone = useCallback(
    (setup: (o: OscillatorNode, g: GainNode, t: number) => void, duration: number) => {
      if (!soundEnabled) return;
      try {
        initAudio();
        const ctx = audioContextRef.current;
        if (!ctx) return;
        const t = ctx.currentTime;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        setup(o, g, t);
        o.start(t);
        o.stop(t + duration);
      } catch {
        /* ignore */
      }
    },
    [soundEnabled, initAudio]
  );

  const playTypingSound = useCallback(() => {
    const now = Date.now();
    if (now - lastTypingTime.current < 40) return;
    lastTypingTime.current = now;
    playTone((o, g, t) => {
      o.type = 'sine';
      o.frequency.value = 180 + Math.random() * 40;
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    }, 0.05);
  }, [playTone]);

  const playClickSound = useCallback(() => {
    playTone((o, g, t) => {
      o.type = 'sine';
      o.frequency.setValueAtTime(400, t);
      o.frequency.exponentialRampToValueAtTime(120, t + 0.04);
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    }, 0.04);
  }, [playTone]);

  const playOpenSound = useCallback(() => {
    playTone((o, g, t) => {
      o.type = 'sine';
      o.frequency.setValueAtTime(300, t);
      o.frequency.exponentialRampToValueAtTime(550, t + 0.12);
      g.gain.setValueAtTime(0.07, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    }, 0.12);
  }, [playTone]);

  const playCloseSound = useCallback(() => {
    playTone((o, g, t) => {
      o.type = 'sine';
      o.frequency.setValueAtTime(450, t);
      o.frequency.exponentialRampToValueAtTime(200, t + 0.1);
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    }, 0.1);
  }, [playTone]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('soundEnabled', String(next));
      if (next) {
        playTone((o, g, t) => {
          o.type = 'sine';
          o.frequency.setValueAtTime(440, t);
          o.frequency.exponentialRampToValueAtTime(880, t + 0.08);
          g.gain.setValueAtTime(0.08, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        }, 0.08);
      }
      return next;
    });
  }, [playTone]);

  return {
    soundEnabled,
    toggleSound,
    playTypingSound,
    playClickSound,
    playOpenSound,
    playCloseSound,
  };
}
