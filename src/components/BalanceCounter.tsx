
import React, { useEffect, useState } from 'react';
import { Bitcoin } from 'lucide-react';

interface BalanceCounterProps {
  balance: number;
}

const BalanceCounter: React.FC<BalanceCounterProps> = ({ balance }) => {
  const [displayBalance, setDisplayBalance] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIncrement, setShowIncrement] = useState(false);
  const [lastIncrement, setLastIncrement] = useState(0);

  useEffect(() => {
    if (balance !== displayBalance) {
      const increment = balance - displayBalance;
      setLastIncrement(increment);
      setIsAnimating(true);
      
      if (increment > 0) {
        setShowIncrement(true);
        setTimeout(() => setShowIncrement(false), 2000);
      }
      
      const startBalance = displayBalance;
      const targetBalance = balance;
      const duration = 1000;
      const steps = 60;
      const incrementStep = (targetBalance - startBalance) / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newBalance = startBalance + (incrementStep * currentStep);
        
        if (currentStep >= steps) {
          setDisplayBalance(targetBalance);
          setIsAnimating(false);
          clearInterval(timer);
        } else {
          setDisplayBalance(newBalance);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [balance, displayBalance]);

  return (
    <div className="bg-slate-800 rounded-lg px-3 py-2 md:px-4 md:py-2 border border-slate-700 relative min-w-[140px] md:min-w-[160px]">
      {showIncrement && lastIncrement > 0 && (
        <div className="absolute -top-6 md:-top-8 right-0 text-green-400 text-xs md:text-sm font-bold animate-fade-in z-10 bg-green-900/80 px-2 py-1 rounded-md border border-green-500/30">
          +R$ {lastIncrement.toFixed(2)}
        </div>
      )}
      <div className="flex items-center space-x-2 md:space-x-3">
        <Bitcoin className={`w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0 ${isAnimating ? 'animate-pulse' : ''}`} />
        <div className="min-w-0 flex-1">
          <div className="text-xs text-slate-400 uppercase tracking-wider">
            Saldo Minerado
          </div>
          <div className={`text-sm md:text-lg font-bold text-green-500 truncate ${isAnimating ? 'animate-pulse' : ''}`}>
            R$ {displayBalance.toFixed(2)}
          </div>
        </div>
      </div>
      {isAnimating && (
        <div className="absolute inset-0 bg-green-500/10 rounded-lg animate-pulse" />
      )}
    </div>
  );
};

export default BalanceCounter;
