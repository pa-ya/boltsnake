import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Zap } from 'lucide-react';
import { Difficulty } from '../types';

const ScoreBoard: React.FC = () => {
  const { state, changeDifficulty } = useGame();

  const getDifficultyColor = () => {
    switch (state.difficulty) {
      case Difficulty.EASY:
        return 'text-green-400';
      case Difficulty.MEDIUM:
        return 'text-yellow-400';
      case Difficulty.HARD:
        return 'text-orange-400';
      case Difficulty.EXPERT:
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getDifficultyText = () => {
    return state.difficulty.charAt(0) + state.difficulty.slice(1).toLowerCase();
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between mb-2 px-2">
      <div className="text-center md:text-left mb-2 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          <span className="text-indigo-400">Snake</span> Game
        </h1>
      </div>
      
      <div className="flex flex-wrap justify-center md:justify-end gap-4">
        <div className="flex items-center bg-gray-800 px-3 py-1.5 rounded-full shadow-lg">
          <Zap size={18} className={getDifficultyColor()} />
          <select
            value={state.difficulty}
            onChange={(e) => changeDifficulty(e.target.value as Difficulty)}
            className="ml-2 bg-transparent text-white outline-none cursor-pointer"
          >
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
            <option value={Difficulty.EXPERT}>Expert</option>
          </select>
        </div>
        
        <div className="flex items-center bg-gray-800 px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-white mr-2">Score:</span>
          <span className="text-xl font-bold text-cyan-400">{state.score}</span>
        </div>
        
        <div className="flex items-center bg-gray-800 px-3 py-1.5 rounded-full shadow-lg">
          <Trophy size={18} className="text-yellow-400 mr-1" />
          <span className="text-white mr-2">Best:</span>
          <span className="text-xl font-bold text-yellow-400">{state.highScore}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;