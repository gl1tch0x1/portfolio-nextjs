import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span 
      className={cn(
        "relative inline-block",
        "before:content-[attr(data-text)] before:absolute before:left-[2px] before:text-primary/90 before:top-0 before:animate-glitch-1",
        "after:content-[attr(data-text)] after:absolute after:left-[-2px] after:text-primary/90 after:top-0 after:animate-glitch-2",
        className
      )}
      data-text={text}
    >
      {text}
    </span>
  );
}