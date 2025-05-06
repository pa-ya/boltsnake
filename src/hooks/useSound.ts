import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

type SoundType = 'eat' | 'gameOver' | 'move' | 'button';

export const useSound = () => {
  const { state } = useGame();
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    eat: null,
    gameOver: null,
    move: null,
    button: null,
  });

  useEffect(() => {
    // Create audio elements
    if (typeof window !== 'undefined') {
      audioRefs.current.eat = new Audio('https://assets.codepen.io/21542/pop-up-on.mp3');
      audioRefs.current.gameOver = new Audio('https://assets.codepen.io/21542/click.mp3');
      audioRefs.current.move = new Audio('https://assets.codepen.io/21542/pop-down.mp3');
      audioRefs.current.button = new Audio('https://assets.codepen.io/21542/pop-up-off.mp3');
      
      // Set volume
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) audio.volume = 0.3;
      });
    }
    
    return () => {
      // Clean up audio elements
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  const playSound = (soundType: SoundType) => {
    if (state.soundEnabled && audioRefs.current[soundType]) {
      const audio = audioRefs.current[soundType];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Silently handle autoplay errors
        });
      }
    }
  };

  return { playSound };
};

export default useSound;