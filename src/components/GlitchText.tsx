import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <motion.div
      className={cn("relative inline-block", className)}
      whileHover={{
        filter: [
          'none',
          'blur(1px) hue-rotate(90deg)',
          'blur(0.5px) hue-rotate(-90deg)',
          'none'
        ],
        x: [0, -2, 2, 0],
        transition: {
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'reverse'
        }
      }}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 text-[#ff0000] opacity-50"
        initial={{ x: 0 }}
        animate={{ x: [-2, 2, -2] }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-[#00ff00] opacity-50"
        initial={{ x: 0 }}
        animate={{ x: [2, -2, 2] }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}