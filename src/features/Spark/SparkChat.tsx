import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './useSparkState';
import { IconX, IconSend } from '../../components/ui/Icons';
import { FadeIn, PopUp, SlideUp } from '../../animations/AnimatedComponents';

interface SparkChatProps {
  isOpen: boolean;
  chatHistory: ChatMessage[];
  isThinking: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => void;
}

export function SparkChat({ isOpen, chatHistory, isThinking, onClose, onSendMessage }: SparkChatProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isThinking]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isThinking) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <PopUp className="mb-4 w-80 sm:w-96 rounded-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[520px] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50">

          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-amber-500/30">
                  S
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f172a]" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">Spark</p>
                <p className="text-white/40 text-[10px] mt-0.5">{isThinking ? 'Thinking...' : 'AI Assistant'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <IconX size={10} />
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
            {chatHistory.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/20 flex items-center justify-center text-2xl">
                  🐕
                </div>
                <p className="text-white/40 text-xs leading-relaxed max-w-[200px]">
                  Hey! Ask me anything about Nishchey's work, skills, or projects.
                </p>
              </div>
            )}

            {chatHistory.map((msg) => (
              <SlideUp
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'spark' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white mr-2 shrink-0 mt-1">
                    S
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-500 text-white rounded-br-sm'
                      : 'bg-white/10 text-white/90 rounded-bl-sm border border-white/10'
                  }`}
                >
                  {msg.text}
                </div>
              </SlideUp>
            ))}

            {isThinking && (
              <FadeIn className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  S
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 bg-white/50 rounded-full block"
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                    />
                  ))}
                </div>
              </FadeIn>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isThinking}
              placeholder="Ask about Nishchey..."
              className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/60 transition-colors disabled:opacity-50"
            />
            <motion.button
              type="submit"
              disabled={isThinking || !inputText.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 flex items-center justify-center text-white transition-colors shrink-0"
            >
              <IconSend size={14} />
            </motion.button>
          </form>
        </PopUp>
      )}
    </AnimatePresence>
  );
}
