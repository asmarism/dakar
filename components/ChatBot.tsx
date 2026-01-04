
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
    <div className="fixed bottom-8 right-8 left-8 z-[100] pointer-events-none">
      <div className="flex flex-col items-start pointer-events-auto">
        {isOpen && (
          <div className="glass-card w-full max-w-[400px] h-[550px] mb-6 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-reveal border-white/80">
            <div className="bg-white/20 p-6 flex justify-between items-center border-b border-white/40">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-dakar-yellow rounded-full animate-pulse shadow-[0_0_10px_rgba(255,210,0,1)]"></div>
                <span className="font-black text-xs tracking-[0.2em] uppercase text-black">DAKAR AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/40 rounded-full p-2.5 transition-colors">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[2rem] text-[14px] leading-relaxed shadow-sm transition-all animate-reveal ${
                    m.role === 'user' 
                      ? 'bg-dakar-yellow text-dakar-black font-[800] rounded-br-none' 
                      : 'bg-white/90 text-gray-800 border border-white rounded-bl-none shadow-xl'
                  }`}>
                    <div className="whitespace-pre-wrap">{m.text}</div>
                    {m.links && m.links.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-black/5 flex flex-col gap-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sources:</p>
                        {m.links.map((link, idx) => (
                          <a key={idx} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 font-bold hover:underline truncate">
                            🔗 {link.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-end">
                   <div className="bg-white/50 p-4 rounded-2xl animate-pulse">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white/40 border-t border-white/40 flex gap-3">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسألني أي شي عن الرالي..."
                className="flex-1 bg-white/80 border border-white rounded-2xl px-5 py-4 text-sm outline-none focus:ring-4 ring-dakar-yellow/20 transition-all font-bold"
              />
              <button onClick={handleSend} disabled={isLoading} className="bg-dakar-black text-white p-4 rounded-2xl hover:scale-110 active:scale-95 disabled:opacity-50 transition-all shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </button>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-dakar-black text-white p-6 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-90 transition-all flex items-center justify-center border-4 border-white/50 group"
        >
          <div className="relative">
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            )}
            {!isOpen && <div className="absolute -top-2 -right-2 w-4 h-4 bg-dakar-yellow rounded-full border-2 border-dakar-black animate-ping"></div>}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
