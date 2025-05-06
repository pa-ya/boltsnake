import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { RefreshCw, Trophy } from 'lucide-react';

const GameOverScreen: React.FC = () => {
  const { state, resetGame, startGame } = useGame();
  const [isHighScore, setIsHighScore] = useState(false);
  
  useEffect(() => {
    // Check if current score is a high score
    if (state.score > 0 && state.score === state.highScore) {
      setIsHighScore(true);
    }
  }, [state.score, state.highScore]);

  const handlePlayAgain = () => {
    resetGame();
    startGame();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-10 rounded-lg p-4">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">Game Over</h2>
      
      <div className="text-center mb-6">
        <p className="text-xl text-gray-300 mb-4">Your Score: <span className="font-bold text-cyan-400">{state.score}</span></p>
        
        {isHighScore && (
          <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4 animate-pulse">
            <Trophy size={24} />
            <span className="text-xl font-bold">New High Score!</span>
          </div>
        )}
        
        <div className="bg-gray-800 p-3 rounded-lg inline-block">
          <p className="text-white">High Score: <span className="font-bold text-yellow-400">{state.highScore}</span></p>
        </div>
      </div>
      
      <button 
        onClick={handlePlayAgain}
        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
      >
        <RefreshCw size={20} className="animate-spin-slow" />
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;