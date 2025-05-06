import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { GameState, Difficulty } from '../types';

export const useGameLoop = () => {
  const { state, moveSnake } = useGame();
  const frameIdRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  // Get the delay based on difficulty level
  const getDelayForDifficulty = (): number => {
    switch(state.difficulty) {
      case Difficulty.EASY:
        return 200;
      case Difficulty.MEDIUM:
        return 150;
      case Difficulty.HARD:
        return 100;
      case Difficulty.EXPERT:
        return 70;
      default:
        return 150;
    }
  };

  // Game loop function
  const gameLoop = (timestamp: number) => {
    const delay = getDelayForDifficulty();
    
    if (timestamp - lastUpdateTimeRef.current >= delay) {
      lastUpdateTimeRef.current = timestamp;
      moveSnake();
    }
    
    frameIdRef.current = requestAnimationFrame(gameLoop);
  };

  // Start the game loop
  const startGameLoop = () => {
    if (frameIdRef.current === null) {
      lastUpdateTimeRef.current = performance.now();
      frameIdRef.current = requestAnimationFrame(gameLoop);
    }
  };

  // Stop the game loop
  const stopGameLoop = () => {
    if (frameIdRef.current !== null) {
      cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = null;
    }
  };

  // Start or stop the game loop based on game state
  useEffect(() => {
    if (state.gameState === GameState.PLAYING) {
      startGameLoop();
    } else {
      stopGameLoop();
    }

    return () => {
      stopGameLoop();
    };
  }, [state.gameState, state.difficulty]);

  return { isRunning: frameIdRef.current !== null };
};