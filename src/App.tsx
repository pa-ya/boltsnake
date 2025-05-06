import React from 'react';
import { GameProvider } from './context/GameContext';
import Game from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;