import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useControls } from '../hooks/useControls';
import { Direction, GameState } from '../types';

interface ControlsProps {
  showControls: boolean;
}

const Controls: React.FC<ControlsProps> = ({ showControls }) => {
  const { state, startGame, pauseGame, resetGame, toggleSound } = useGame();
  const { handleTouchControl } = useControls();

  const isPlaying = state.gameState === GameState.PLAYING;
  
  const directionButtonClass = "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 m-1 bg-gray-800 text-white rounded-full shadow-lg active:scale-95 active:bg-indigo-600 transition-all";
  const actionButtonClass = "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 m-1 bg-gray-800 text-white rounded-full shadow-lg active:scale-95 transition-all";

  return (
    <div className={`transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center mt-4">
        {/* Action Buttons */}
        <div className="flex justify-center mb-2">
          <button 
            className={actionButtonClass}
            onClick={toggleSound}
            aria-label={state.soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {state.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button
            className={`${actionButtonClass} ${isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'}`}
            onClick={isPlaying ? pauseGame : startGame}
            aria-label={isPlaying ? 'Pause game' : 'Start game'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button
            className={`${actionButtonClass} bg-blue-600 hover:bg-blue-700`}
            onClick={resetGame}
            aria-label="Reset game"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Direction Buttons */}
        <div className="grid grid-cols-3 gap-1">
          <div className="invisible"></div>
          <button 
            className={directionButtonClass}
            onClick={() => handleTouchControl(Direction.UP)}
            aria-label="Move up"
          >
            <ChevronUp size={24} />
          </button>
          <div className="invisible"></div>
          
          <button
            className={directionButtonClass}
            onClick={() => handleTouchControl(Direction.LEFT)}
            aria-label="Move left"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="invisible"></div>
          <button
            className={directionButtonClass}
            onClick={() => handleTouchControl(Direction.RIGHT)}
            aria-label="Move right"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="invisible"></div>
          <button
            className={directionButtonClass}
            onClick={() => handleTouchControl(Direction.DOWN)}
            aria-label="Move down"
          >
            <ChevronDown size={24} />
          </button>
          <div className="invisible"></div>
        </div>
      </div>
    </div>
  );
};

export default Controls;