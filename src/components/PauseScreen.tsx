import React from 'react';
import { useGame } from '../context/GameContext';
import { Play, Home } from 'lucide-react';

const PauseScreen: React.FC = () => {
  const { startGame, resetGame } = useGame();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-10 rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-6">Game Paused</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={() => startGame()}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
        >
          <Play size={20} />
          Continue
        </button>
        
        <button 
          onClick={() => resetGame()}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
        >
          <Home size={20} />
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default PauseScreen;