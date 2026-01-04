
import React, { useState, useRef, useEffect } from 'react';
import { createDakarChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'مرحباً بك! أنا مساعد رالي داكار. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = createDakarChat();
      }

      // Start streaming response from the chat session
      const result = await chatRef.current.sendMessageStream({ message: userMsg });
      let fullText = '';
      let links: Array<{ title: string; uri: string }> = [];
      
      setMessages(prev => [...prev, { role: 'model', text: '', links: [] }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        // Access chunk text via the .text property as per guidelines
        const chunkText = c.text || '';
        fullText += chunkText;

        // Extract grounding chunks if available in the stream chunks for search citations
        const groundingChunks = c.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
          const newLinks = groundingChunks
            .filter((chunk: any) => chunk.web)
            .map((chunk: any) => ({
              title: chunk.web.title,
              uri: chunk.web.uri,
            }));
          if (newLinks.length > 0) {
            links = [...links, ...newLinks];
            // Deduplicate links based on their URI
            links = Array.from(new Map(links.map(l => [l.uri, l])).values());
          }
        }

        setMessages(prev => {
          const newMsgs = [...prev];
          const lastMsg = newMsgs[newMsgs.length - 1];
          lastMsg.text = fullText;
          lastMsg.links = links;
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً، حدث خطأ في معالجة طلبك.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[100]">
      {isOpen && (
        <div className="bg-white border-2 border-dakar-black w-[calc(100vw-32px)] max-w-[360px] h-[450px] mb-4 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-dakar-black p-4 text-dakar-yellow flex justify-between items-center">
            <span className="font-black">مساعد داكار</span>
            <button onClick={() => setIsOpen(false)} className="bg-white/10 rounded-full p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-dakar-yellow text-dakar-black font-bold shadow-sm' 
                    : 'bg-white text-dakar-black border border-gray-200 shadow-sm'
                }`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {/* Display extracted grounding links as required by guidelines */}
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">المصادر:</p>
                      {m.links.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-600 underline truncate hover:text-blue-800"
                        >
                          {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-white border border-gray-200 p-2 rounded-xl animate-pulse text-[10px] font-bold">جاري الكتابة...</div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسألني عن أي شيء..."
              className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm outline-none focus:ring-1 ring-dakar-yellow"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-dakar-black text-dakar-yellow p-2 rounded-full hover:scale-105 disabled:opacity-50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-dakar-black text-dakar-yellow p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
      </button>
    </div>
  );
};

export default ChatBot;
