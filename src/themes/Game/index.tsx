import React from 'react';
import GameMap from './components/GameMap';

export default function GameTheme() {
  return (
    <div className="fixed inset-0 overflow-hidden font-mono bg-black">
      <GameMap />
    </div>
  );
}
