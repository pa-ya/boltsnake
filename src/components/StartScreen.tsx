import React from 'react';
import { useGame } from '../context/GameContext';
import { Play } from 'lucide-react';

const StartScreen: React.FC = () => {
  const { startGame, resetGame } = useGame();

  const handleStart = () => {
    resetGame();
    startGame();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-10 rounded-lg p-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Snake <span className="text-indigo-400">Game</span>
      </h2>
      
      <div className="text-center max-w-md mb-6">
        <p className="text-gray-300 mb-4">
          Use the arrow keys or on-screen controls to navigate the snake. 
          Eat the food to grow longer, but avoid hitting the walls or yourself!
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <div className="bg-gray-800 p-2 rounded-lg">
            <div className="font-semibold text-indigo-400 mb-1">Keyboard</div>
            <div className="text-gray-300">Arrow Keys / WASD</div>
          </div>
          <div className="bg-gray-800 p-2 rounded-lg">
            <div className="font-semibold text-indigo-400 mb-1">Controls</div>
            <div className="text-gray-300">Direction Buttons</div>
          </div>
          <div className="bg-gray-800 p-2 rounded-lg">
            <div className="font-semibold text-indigo-400 mb-1">Pause</div>
            <div className="text-gray-300">Space / ESC</div>
          </div>
          <div className="bg-gray-800 p-2 rounded-lg">
            <div className="font-semibold text-indigo-400 mb-1">Restart</div>
            <div className="text-gray-300">Reset Button</div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleStart}
        className="relative bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 group overflow-hidden"
      >
        <span className="z-10 flex items-center justify-center gap-2">
          <Play size={20} />
          Start Game
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    </div>
  );
};

export default StartScreen;