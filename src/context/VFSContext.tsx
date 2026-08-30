import React, { createContext, useContext, useState, ReactNode } from 'react';
import sourceRegistry from '../themes/IDE/sourceRegistry.json';

type VFSState = Record<string, string>;

interface VFSContextType {
  files: VFSState;
  updateFile: (filename: string, content: string) => void;
  getFile: (filename: string) => string;
  isDirty: (filename: string) => boolean;
}

const VFSContext = createContext<VFSContextType | undefined>(undefined);

export const VFSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<VFSState>(() => {
    // Load base registry
    const baseFiles = { ...sourceRegistry } as VFSState;
    
    // Load user edits from localStorage
    try {
      const saved = localStorage.getItem('vfs_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...baseFiles, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load VFS state", e);
    }
    return baseFiles;
  });

  // Track which files differ from their sourceRegistry original
  const isDirty = (filename: string) => {
    const original = (sourceRegistry as VFSState)[filename] || "";
    return files[filename] !== original;
  };

  const updateFile = (filename: string, content: string) => {
    setFiles(prev => {
      const newFiles = { ...prev, [filename]: content };
      // Persist to local storage
      const diffOnly: VFSState = {};
      Object.keys(newFiles).forEach(key => {
        if (newFiles[key] !== (sourceRegistry as VFSState)[key]) {
          diffOnly[key] = newFiles[key];
        }
      });
      localStorage.setItem('vfs_state', JSON.stringify(diffOnly));
      return newFiles;
    });
  };

  const getFile = (filename: string) => files[filename] || "";

  return (
    <VFSContext.Provider value={{ files, updateFile, getFile, isDirty }}>
      {children}
    </VFSContext.Provider>
  );
};

export const useVFS = () => {
  const context = useContext(VFSContext);
  if (!context) {
    throw new Error('useVFS must be used within a VFSProvider');
  }
  return context;
};
