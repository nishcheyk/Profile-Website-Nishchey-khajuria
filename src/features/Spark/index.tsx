import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSparkState } from './useSparkState';
import { SparkAvatar } from './SparkAvatar';
import { SparkChat } from './SparkChat';

export default function SparkAssistant() {
  const location = useLocation();
  const currentTheme = location.pathname.substring(1) || 'bootloader';

  const { 
    isOpen, 
    isThinking, 
    chatHistory, 
    toggleSpark, 
    closeSpark, 
    sendMessage 
  } = useSparkState(currentTheme);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      
      {/* Interactive Chat Window */}
      <SparkChat 
        isOpen={isOpen}
        chatHistory={chatHistory}
        isThinking={isThinking}
        onClose={closeSpark}
        onSendMessage={sendMessage}
      />

      {/* Spark The Avatar */}
      <SparkAvatar 
        isOpen={isOpen}
        isThinking={isThinking}
        onClick={toggleSpark}
      />
      
    </div>
  );
}
