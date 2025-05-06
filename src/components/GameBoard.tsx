import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { getSegmentColor, getPositionStyle, getHeadRotation, getSegmentKey } from '../utils/gameUtils';

const GameBoard: React.FC = () => {
  const { state } = useGame();
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [cellSize, setCellSize] = useState(0);

  // Calculate board size based on viewport
  useEffect(() => {
    const calculateSize = () => {
      const maxSize = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.6);
      const cellSizeValue = Math.floor(maxSize / Math.max(state.gridSize.width, state.gridSize.height));
      setCellSize(cellSizeValue);
      setBoardSize({
        width: cellSizeValue * state.gridSize.width,
        height: cellSizeValue * state.gridSize.height,
      });
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [state.gridSize]);

  return (
    <div 
      className="relative bg-gray-800 border-2 border-indigo-500 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.4)]"
      style={{ 
        width: `${boardSize.width}px`, 
        height: `${boardSize.height}px`,
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' 
      }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid" style={{ 
        gridTemplateColumns: `repeat(${state.gridSize.width}, 1fr)`,
        gridTemplateRows: `repeat(${state.gridSize.height}, 1fr)`,
        opacity: 0.1
      }}>
        {Array.from({ length: state.gridSize.width * state.gridSize.height }).map((_, i) => (
          <div key={i} className="border border-indigo-300" />
        ))}
      </div>
      
      {/* Snake segments */}
      {state.snake.map((segment, index) => {
        const isHead = index === 0;
        const color = getSegmentColor(index, state.snake.length);
        const style = {
          ...getPositionStyle(segment, cellSize),
          backgroundColor: color,
          boxShadow: isHead ? `0 0 5px ${color}` : 'none',
          borderRadius: isHead ? '40%' : '30%',
          zIndex: state.snake.length - index,
          transform: isHead ? `rotate(${getHeadRotation(state.direction)}deg)` : 'none',
        };
        
        return (
          <div
            key={getSegmentKey(segment, index)}
            className={`absolute transition-all duration-100 ${
              isHead ? 'snake-head' : 'snake-segment'
            }`}
            style={style}
          >
            {isHead && (
              <>
                <div className="absolute w-1/4 h-1/4 bg-white rounded-full top-1/4 left-1/4" />
                <div className="absolute w-1/4 h-1/4 bg-white rounded-full top-1/4 right-1/4" />
              </>
            )}
          </div>
        );
      })}
      
      {/* Food */}
      <div 
        className="absolute bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.7)]"
        style={{
          ...getPositionStyle(state.food, cellSize),
          borderRadius: '50%',
          transform: 'scale(0.8)',
        }} 
      />
    </div>
  );
};

export default GameBoard;