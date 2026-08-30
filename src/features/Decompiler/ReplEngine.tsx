import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { themes } from "prism-react-renderer";
import { initialCode } from "./sourceCode";

interface ReplEngineProps {
  onClose: () => void;
}

export const ReplEngine = ({ onClose }: ReplEngineProps) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#1e1e1e] flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <div className="h-12 border-b border-white/10 bg-[#1e1e1e] flex items-center justify-between px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-white/50 text-sm font-mono ml-4 tracking-widest uppercase">
            Nishchey_Portfolio.tsx
          </span>
        </div>
        
        <div className="flex gap-4">
          <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-bold uppercase tracking-wider">
            Decompiled Mode
          </span>
        </div>
      </div>

      {/* Split Pane */}
      <div className="flex-1 flex overflow-hidden">
        
        <LiveProvider code={initialCode} theme={themes.vsDark} noInline={false}>
          
          {/* Left Pane: Editor */}
          <div className="w-1/2 h-full border-r border-white/10 bg-[#1e1e1e] flex flex-col relative">
            <div className="absolute top-0 right-0 px-3 py-1 bg-white/10 text-white/50 text-xs font-bold rounded-bl-lg z-10 pointer-events-none">
              LIVE EDITOR
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <LiveEditor className="font-mono text-sm bg-transparent" />
            </div>
            
            <div className="h-48 border-t border-white/10 bg-black/50 overflow-y-auto p-4 text-red-400 font-mono text-sm">
               <div className="text-white/50 text-xs mb-2 uppercase font-bold tracking-widest">Compiler Output</div>
               <LiveError />
            </div>
          </div>

          {/* Right Pane: Preview */}
          <div className="w-1/2 h-full bg-black relative">
            <div className="absolute top-0 left-0 px-3 py-1 bg-white/10 text-white/50 text-xs font-bold rounded-br-lg z-10 pointer-events-none">
              LIVE PREVIEW
            </div>
            <div className="w-full h-full overflow-y-auto">
              <LivePreview className="w-full h-full" />
            </div>
          </div>
          
        </LiveProvider>
      </div>
    </div>
  );
};

export default ReplEngine;
