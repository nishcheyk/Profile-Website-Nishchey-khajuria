import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { name, summary, experiences, projects, skills } from '../../data/constants';

export default function TerminalTheme() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<{ command: string; output: string }[]>([
    { command: '', output: `WELCOME TO ${name.toUpperCase()} OS [Version 1.0.0]\n(c) 2026 ${name} Khajuria. All rights reserved.\n\nType "help" to see available commands.` }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    // Scroll to bottom when history changes
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const projectFiles: Record<string, string> = {};
  projects.forEach((p, i) => {
    const filename = `${p.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.exe`;
    projectFiles[filename] = `[EXECUTABLE] ${p.title}\n\n${p.description}\n\nStack: ${p.technologies.join(', ')}\nRepo: ${p.git}`;
  });

  const fileSystem: Record<string, Record<string, string | null>> = {
    '~': {
      'projects': null,
      'resume.txt': `${name.toUpperCase()} KHAJURIA\nFull Stack Developer & AI Engineer\n\nExperience:\n${experiences.map(e => `- ${e.company} (${e.role})`).join('\n')}`,
      'skills.txt': skills.map((s: any) => s.title).join(', '),
      'about.txt': summary
    },
    '~/projects': projectFiles
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmdRaw = input.trim();
      const cmdArgs = cmdRaw.split(' ');
      const cmd = cmdArgs[0].toLowerCase();
      const arg = cmdArgs[1]?.toLowerCase();
      let output = '';
      let newPath = currentPath;

      switch (cmd) {
        case 'help':
          output = 'COMMANDS:\n  help      - Show this message\n  whoami    - Display bio\n  ls        - List directory contents\n  cd <dir>  - Change directory\n  cat <file>- Read file contents\n  clear     - Clear terminal\n  sudo      - Superuser do\n  exit      - Return to Multiverse';
          break;
        case 'whoami':
          output = 'NISHCHEY KHAJURIA\nFull Stack Developer / UI Engineer\n\nSkills: React, Next.js, Node.js, Python, FastAPI';
          break;
        case 'ls':
          const currentDirObj = fileSystem[currentPath];
          if (currentDirObj) {
            output = Object.keys(currentDirObj).map(k => currentDirObj[k] === null ? `[DIR]  ${k}` : `[FILE] ${k}`).join('\n');
          } else {
            output = 'Error reading directory.';
          }
          break;
        case 'cd':
          if (!arg || arg === '~') {
            newPath = '~';
          } else if (arg === '..') {
            newPath = '~';
          } else if (currentPath === '~' && fileSystem['~/projects'] && arg === 'projects') {
            newPath = '~/projects';
          } else {
            output = `cd: ${arg}: No such file or directory`;
          }
          break;
        case 'cat':
          if (!arg) {
            output = 'cat: missing operand';
          } else {
            const file = fileSystem[currentPath][arg];
            if (file === null) {
              output = `cat: ${arg}: Is a directory`;
            } else if (file) {
              output = file;
            } else {
              output = `cat: ${arg}: No such file or directory`;
            }
          }
          break;
        case 'sudo':
          if (arg === 'hack') {
             output = 'INITIALIZING MAINFRAME BREACH...\nBypassing firewalls [====================] 100%\nAccess granted. Welcome, Neo.';
          } else {
             output = 'nishchey is not in the sudoers file. This incident will be reported.';
          }
          break;
        case 'exit':
          navigate('/');
          return;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          if (cmd) {
            output = `'${cmd}' is not recognized as an internal or external command.`;
          }
      }

      if (cmd || output) {
        setCurrentPath(newPath);
        setHistory((prev) => [...prev, { command: cmdRaw, output }]);
      }
      setInput('');
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-black text-[#0f0] font-mono p-4 md:p-8 overflow-y-auto selection:bg-[#0f0] selection:text-black shadow-[inset_0_0_100px_rgba(0,255,0,0.1)]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%] opacity-20" />
      
      {/* Back button (hidden physically, but usable) */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 text-[#0f0] border border-[#0f0] px-3 py-1 hover:bg-[#0f0] hover:text-black transition-colors z-40 text-xs shadow-[0_0_10px_rgba(0,255,0,0.5)]"
      >
        [ EXIT ]
      </button>

      <div className="max-w-4xl mx-auto w-full flex flex-col relative z-10 text-sm md:text-base pb-20">
        {history.map((entry, i) => (
          <div key={i} className="mb-4 whitespace-pre-wrap">
            {entry.command && (
              <div className="flex gap-2 mb-1">
                <span>C:\Users\Nishchey{currentPath.replace('~', '')}&gt;</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output && <div className="opacity-90">{entry.output}</div>}
          </div>
        ))}
        
        <div className="flex items-center gap-2 relative">
          <span>C:\Users\Nishchey{currentPath.replace('~', '')}&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-[#0f0]"
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
