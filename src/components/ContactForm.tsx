import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, FileText, MessageSquare, Send, Sparkles } from 'lucide-react';
import type { ContactFormData, ContactSubmission, FormFieldError } from '../types/contact';
import { validateForm, hasErrors } from '../utils/validation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { SuccessMessage } from './SuccessMessage';
import { SubmissionsList } from './SubmissionsList';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<FormFieldError>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useLocalStorage<ContactSubmission[]>('contact-submissions', []);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const newSubmission: ContactSubmission = {
      ...formData,
      id: crypto.randomUUID(),
      submittedAt: Date.now(),
    };

    setSubmissions(prev => [newSubmission, ...prev]);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
  };

  const handleClearSubmissions = () => {
    setSubmissions([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-16 sm:py-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Get in Touch</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4 tracking-tight">
          Contact{' '}
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Us
          </span>
        </h1>
        <p className="text-text-secondary max-w-md mx-auto text-lg leading-relaxed">
          Have a question or want to work together? Drop us a message and we'll get back to you.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="relative">
          {/* Glow border effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-[28px] blur-sm opacity-60" />

          <div className="relative bg-surface/80 backdrop-blur-xl border border-border rounded-[28px] p-8 sm:p-10">
            {isSubmitted ? (
              <SuccessMessage onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    error={errors.name}
                    icon={<User className="w-4 h-4" />}
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    error={errors.email}
                    icon={<Mail className="w-4 h-4" />}
                  />
                </div>

                <InputField
                  label="Subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                  error={errors.subject}
                  icon={<FileText className="w-4 h-4" />}
                />

                <TextAreaField
                  label="Message"
                  placeholder="Tell us more about your project, ideas, or questions..."
                  rows={5}
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                  error={errors.message}
                  icon={<MessageSquare className="w-4 h-4" />}
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full relative group py-4 px-6 rounded-2xl font-semibold text-white overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {/* Button gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <span className="relative flex items-center justify-center gap-2.5">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.div>

      {/* Submissions List */}
      <SubmissionsList submissions={submissions} onClear={handleClearSubmissions} />

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-text-secondary/40 text-xs mt-12 text-center relative z-10"
      >
        Messages are stored locally in your browser. No data is sent to any server.
      </motion.p>
    </div>
  );
}
