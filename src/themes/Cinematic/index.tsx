import React, { useState } from 'react';
import { HorizontalScroller } from './components/HorizontalScroller';
import { BrutalistTitle, BrutalistCard } from './components/BrutalistTypography';
import { name, summary, projects, seo } from '../../data/constants';
import { useKeyDown } from '../../hooks/useKeyDown';

const MATRIX = ['m','a','t','r','i','x'];

export default function CinematicTheme() {
  const [matrixProgress, setMatrixProgress] = useState(0);
  const [isMatrix, setIsMatrix] = useState(false);

  useKeyDown((e) => {
    if (e.key.toLowerCase() === MATRIX[matrixProgress]) {
      if (matrixProgress === MATRIX.length - 1) {
        setIsMatrix(true);
      } else {
        setMatrixProgress(p => p + 1);
      }
    } else {
      setMatrixProgress(0);
    }
  });

  if (isMatrix) {
    return (
      <div className="fixed inset-0 bg-black text-green-500 font-mono flex items-center justify-center">
        <div className="animate-pulse text-xl">
          Wake up, Neo...
          <br/>
          The Matrix has you.
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-stone-100 text-black overflow-hidden font-sans select-none">
      <HorizontalScroller>
        
        {/* Intro Slide */}
        <BrutalistTitle 
          text={name.toUpperCase()} 
          subtext={summary}
        />

        {/* Experience / Projects Slides */}
        {projects.map((p, i) => (
          <BrutalistCard 
            key={i}
            title={p.title} 
            desc={p.description} 
            link={p.git}
          />
        ))}

        {/* Outro Slide */}
        <BrutalistTitle 
          text="CONNECT" 
          subtext={`Available for new realities. Contact via LinkedIn or GitHub: ${seo.canonical}`}
        />
        
      </HorizontalScroller>
    </div>
  );
}
