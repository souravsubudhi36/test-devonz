import { motion } from 'framer-motion';
import type { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon: React.ReactNode;
}

export function InputField({ label, error, icon, ...props }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-secondary">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors duration-300">
          {icon}
        </div>
        <input
          {...props}
          className={`w-full pl-12 pr-4 py-3.5 bg-surface border rounded-2xl text-text-primary placeholder:text-text-secondary/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary ${
            error ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border hover:border-text-secondary/30'
          }`}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-error text-xs font-medium pl-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
