import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface SuccessMessageProps {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center py-12 px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6"
      >
        <CheckCircle className="w-10 h-10 text-success" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-text-primary mb-3"
      >
        Message Sent!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-text-secondary max-w-sm mx-auto mb-8 leading-relaxed"
      >
        Your message has been saved locally. In a production app, this would be sent to your inbox.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary border border-primary/30 rounded-2xl hover:bg-primary/10 transition-colors duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Send Another Message
      </motion.button>
    </motion.div>
  );
}
