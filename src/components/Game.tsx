import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useGameLoop } from '../hooks/useGameLoop';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import Controls from './Controls';
import StartScreen from './StartScreen';
import GameOverScreen from './GameOverScreen';
import PauseScreen from './PauseScreen';
import useSound from '../hooks/useSound';

const Game: React.FC = () => {
  const { state } = useGame();
  const { isRunning } = useGameLoop();
  const [showOverlay, setShowOverlay] = useState(true);
  const { playSound } = useSound();

  useEffect(() => {
    // Auto-hide overlay after inactivity
    const timer = setTimeout(() => {
      if (state.gameState === 'PLAYING') {
        setShowOverlay(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [state.gameState, showOverlay]);

  // Show overlay on user interaction
  const handleInteraction = () => {
    setShowOverlay(true);
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center gap-4 p-4 md:p-8 max-w-full"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <ScoreBoard />
      
      <div className="relative">
        <GameBoard />
        
        {state.gameState === 'START' && <StartScreen />}
        {state.gameState === 'PAUSED' && <PauseScreen />}
        {state.gameState === 'GAME_OVER' && <GameOverScreen />}
      </div>
      
      <Controls showControls={showOverlay || state.gameState !== 'PLAYING'} />
    </div>
  );
};

export default Game;