
import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2027-01-06T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const Card = ({ val, unit }: { val: number, unit: string }) => (
    <div className="flex flex-col items-center bg-white/5 rounded-xl p-3 min-w-[65px] border border-white/5">
      <span className="text-2xl md:text-4xl font-black text-dakar-yellow tabular-nums">
        {val.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] font-bold text-white/40 mt-1">{unit}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 animate-fade">
      <div className="liquid-glass p-8 md:p-14 rounded-[2.5rem] w-full max-w-lg text-center">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
          نلقاكم في داكار 2027
        </h1>
        <p className="text-xl md:text-2xl text-white/70 font-medium mb-10">إن شاء الله</p>
        
        <div className="flex gap-2 md:gap-4 justify-center mb-10" dir="ltr">
          <Card val={timeLeft.days} unit="يوم" />
          <Card val={timeLeft.hours} unit="ساعة" />
          <Card val={timeLeft.minutes} unit="دقيقة" />
          <Card val={timeLeft.seconds} unit="ثانية" />
        </div>

        <div className="w-16 h-1 bg-dakar-yellow mx-auto rounded-full shadow-[0_0_20px_#c4390e]"></div>
      </div>
    </div>
  );
};

export default App;
