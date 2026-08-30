import React, { useState } from 'react';
import ArcadeMenu from './components/ArcadeMenu';
import SpaceShooter from './components/SpaceShooter';
import VisualNovel from './components/VisualNovel';

export default function GameTheme() {
  const [activeGame, setActiveGame] = useState<GameMode>('menu');

  return (
    <div className="fixed inset-0 overflow-hidden font-mono bg-black text-white">
      {activeGame === 'menu' && <ArcadeMenu onSelectGame={setActiveGame} />}
      {activeGame === 'shooter' && <SpaceShooter onExit={() => setActiveGame('menu')} />}
      {activeGame === 'novel' && <VisualNovel onExit={() => setActiveGame('menu')} />}
    </div>
  );
}
