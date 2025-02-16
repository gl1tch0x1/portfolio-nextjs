'use client'

import { Terminal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-6 w-64">
        <Terminal className="w-12 h-12 text-primary mx-auto animate-spin" />
        <div className="font-mono space-y-4">
          <p className="text-sm text-primary">
            <span className="opacity-50">root@fsociety:~# </span>
            <span className="animate-pulse">Loading system...</span>
          </p>
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground animate-fade-in">
            Initializing secure environment ({progress}%)
          </p>
        </div>
      </div>
    </div>
  );
}