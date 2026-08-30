import { useState, useCallback, useEffect } from 'react';
import { experiences, projects, skills } from '../../data/constants';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'spark';
  text: string;
  timestamp: Date;
}

export function useSparkState(currentTheme: string) {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [greetingShown, setGreetingShown] = useState(false);

  // Auto-greeting when a new theme opens (only if chat isn't cluttered)
  useEffect(() => {
    if (!greetingShown) {
      const getGreeting = () => {
        switch (currentTheme) {
          case 'desktop': return "Woof! I'm Spark, your Multiverse guide. Ask me anything about Nishchey!";
          case 'ide': return "Welcome to the Engineer's domain. Looking for source code or projects?";
          case 'bento': return "The Designer's reality! Notice how spatial layouts make data pop?";
          case 'saas': return "The Product reality. Scaling infrastructure is my favorite!";
          case 'terminal': return "Accessing mainframe... Bark! Try running some commands.";
          default: return "Woof! How can I help you today?";
        }
      };

      setChatHistory([{
        id: 'greet-' + Date.now(),
        sender: 'spark',
        text: getGreeting(),
        timestamp: new Date()
      }]);
      setGreetingShown(true);
      
      // Auto open tooltip briefly for visibility
      setIsOpen(true);
      const timer = setTimeout(() => setIsOpen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentTheme, greetingShown]);

  // Simulated AI RAG Logic
  const handleUserMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMsg]);
    setIsThinking(true);

    // Simulate network/thinking delay
    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseText = "I'm not sure about that. Try asking about his skills, projects, or education!";

      // Keyword matching logic
      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        responseText = "Bark! Hello there! What would you like to know about Nishchey?";
      } 
      else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
        const topSkills = skills.slice(0, 5).map(s => s.title).join(', ');
        responseText = `Nishchey is a full-stack powerhouse! His top tech includes: ${topSkills}, and many more.`;
      }
      else if (lower.includes('project') || lower.includes('built') || lower.includes('made')) {
        responseText = `He has built ${projects.length} massive projects! The coolest one is probably ${projects[0].title} — ${projects[0].description}`;
      }
      else if (lower.includes('experience') || lower.includes('work') || lower.includes('job')) {
        responseText = `Nishchey currently works at ${experiences[0].company} as a ${experiences[0].role}. He is highly experienced in production environments.`;
      }
      else if (lower.includes('education') || lower.includes('college') || lower.includes('study')) {
        responseText = "He is currently a 4th-year Computer Engineering student at Thapar Institute of Engineering and Technology (TIET).";
      }
      else if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('rag')) {
        responseText = "He builds advanced RAG systems using Qdrant, FastAPI, and OpenAI. He even integrated Twilio and ElevenLabs for voice AI!";
      }
      else if (lower.includes('who are you') || lower.includes('spark') || lower.includes('dog')) {
        responseText = "I'm Spark! I am a simulated AI assistant built right into the Multiverse. I'm here to fetch information for you. Bark!";
      }
      else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
        responseText = "You want to hire him? Smart move! Head over to the 'Start' section on the desktop and click 'Deploy to Production' to send him an email!";
      }

      const sparkMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'spark',
        text: responseText,
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, sparkMsg]);
      setIsThinking(false);
    }, 1500 + Math.random() * 1000); // 1.5s - 2.5s simulated delay
  }, []);

  const toggleSpark = () => setIsOpen(prev => !prev);
  const closeSpark = () => setIsOpen(false);

  return {
    isOpen,
    isThinking,
    chatHistory,
    toggleSpark,
    closeSpark,
    sendMessage: handleUserMessage
  };
}
