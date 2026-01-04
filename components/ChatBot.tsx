
import React, { useState, useRef, useEffect } from 'react';
import { createDakarChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'هلا بك! معك مساعد داكار الذكي. كيف أقدر أخدمك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) chatRef.current = createDakarChat();
      const result = await chatRef.current.sendMessageStream({ message: userMsg });
      let fullText = '';
      let links: Array<{ title: string; uri: string }> = [];
      
      setMessages(prev => [...prev, { role: 'model', text: '', links: [] }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        fullText += (c.text || '');
        const groundingChunks = c.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
          const newLinks = groundingChunks.filter((ch: any) => ch.web).map((ch: any) => ({ title: ch.web.title, uri: ch.web.uri }));
          if (newLinks.length > 0) links = Array.from(new Map([...links, ...newLinks].map(l => [l.uri, l])).values());
        }
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { ...newMsgs[newMsgs.length - 1], text: fullText, links };
          return newMsgs;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'المعذرة، واجهت مشكلة في الاتصال. جرب مرة ثانية.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {isOpen && (
        <div className="bg-white border border-gray-100 w-[calc(100vw-48px)] max-w-[360px] h-[500px] mb-6 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-dakar-black p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-dakar-yellow rounded-full"></div>
              <span className="font-black text-xs tracking-widest uppercase">Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 rounded-full p-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 hide-scrollbar bg-gray-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-dakar-yellow text-dakar-black font-[800]' 
                    : 'bg-white text-gray-700 border border-gray-100'
                }`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1.5">
                      <p className="text-[9px] font-black text-gray-400 uppercase">المصادر:</p>
                      {m.links.map((link, idx) => (
                        <a key={idx} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 underline truncate">
                          {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-dakar-yellow transition-all"
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-dakar-black text-white p-3 rounded-xl hover:bg-black active:scale-95 disabled:opacity-50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-dakar-black text-white p-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-4 border-white group"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
      </button>
    </div>
  );
};

export default ChatBot;
