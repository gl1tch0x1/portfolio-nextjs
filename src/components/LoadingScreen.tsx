import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <Terminal className="w-12 h-12 text-primary animate-pulse" />
        <div className="font-mono text-primary space-y-2">
          <p className="text-sm">
            <span className="terminal-cursor">root@fsociety:~# </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Loading system...
            </motion.span>
          </p>
          <div className="w-48 h-1 bg-primary/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}