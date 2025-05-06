import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Direction, GameState } from '../types';

export const useControls = () => {
  const { state, setDirection, startGame, pauseGame, resetGame } = useGame();

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setDirection(Direction.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setDirection(Direction.RIGHT);
          break;
        case ' ': // Space
        case 'Enter':
          if (state.gameState === GameState.START || state.gameState === GameState.GAME_OVER) {
            resetGame();
            startGame();
          } else if (state.gameState === GameState.PLAYING) {
            pauseGame();
          } else if (state.gameState === GameState.PAUSED) {
            startGame();
          }
          break;
        case 'Escape':
          if (state.gameState === GameState.PLAYING) {
            pauseGame();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.gameState, setDirection, startGame, pauseGame, resetGame]);

  // Function to handle swipe gestures for mobile
  const handleSwipe = (direction: Direction) => {
    setDirection(direction);
  };

  // Function to handle touch button presses
  const handleTouchControl = (direction: Direction) => {
    setDirection(direction);
  };

  return { handleSwipe, handleTouchControl };
};