import React from 'react';
import DeckBuilder from './components/DeckBuilder';

export default function GameTheme() {
  return (
    <div className="fixed inset-0 overflow-hidden font-mono bg-black">
      <DeckBuilder />
    </div>
  );
}
