import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, Inbox } from 'lucide-react';
import type { ContactSubmission } from '../types/contact';

interface SubmissionsListProps {
  submissions: ContactSubmission[];
  onClear: () => void;
}

export function SubmissionsList({ submissions, onClear }: SubmissionsListProps) {
  if (submissions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto mt-10"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Inbox className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Saved Messages
            <span className="ml-2 text-sm font-normal text-text-secondary">
              ({submissions.length})
            </span>
          </h3>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-error transition-colors duration-300 px-3 py-1.5 rounded-xl hover:bg-error/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {submissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 bg-surface border border-border rounded-2xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {submission.subject}
                  </h4>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {submission.name} · {submission.email}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary/60 shrink-0">
                  <Clock className="w-3 h-3" />
                  {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                {submission.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
