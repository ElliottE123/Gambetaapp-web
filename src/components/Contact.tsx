import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare, Hash, Loader2, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { submitContactToGoogleSheets, validateContactData, type ContactData } from '../utils/contactSheets';

const Contact = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateContactData(formData);
    if (!validation.isValid) {
      const newErrors: {[key: string]: string} = {};
      validation.errors.forEach(error => {
        if (error.includes('Name')) newErrors.name = error;
        else if (error.includes('Email')) newErrors.email = error;
        else if (error.includes('Subject')) newErrors.subject = error;
        else if (error.includes('Message')) newErrors.message = error;
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setSubmitError('');
    
    try {
      const result = await submitContactToGoogleSheets(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        setSubmitError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your Name',
      icon: User,
      required: true
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'your.email@example.com',
      icon: Mail,
      required: true
    },
    {
      name: 'subject',
      type: 'text',
      placeholder: 'What would you like to discuss?',
      icon: Hash,
      required: true
    }
  ];

  return (
    <section ref={ref} className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Have a Question?{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div 
          className={`transition-all duration-1000 delay-300 ${
            isInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => {
                const Icon = field.icon;
                const isFocused = focusedField === field.name;
                const hasValue = formData[field.name as keyof typeof formData];
                
                return (
                  <div 
                    key={field.name}
                    className={`relative transition-all duration-300 ${
                      field.name === 'subject' ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className="relative">
                      <Icon 
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          isFocused || hasValue 
                            ? 'text-emerald-400' 
                            : 'text-slate-400'
                        }`}
                        size={20}
                      />
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-700/50 border-2 rounded-xl text-white placeholder-slate-400 transition-all duration-300 focus:outline-none ${
                          errors[field.name] 
                            ? 'border-red-500' 
                            : isFocused 
                              ? 'border-emerald-400 bg-slate-700/70 shadow-lg shadow-emerald-400/20' 
                              : 'border-slate-600 hover:border-slate-500'
                        }`}
                      />
                    </div>
                    {errors[field.name] && (
                      <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Message Field */}
            <div className="relative">
              <div className="relative">
                <MessageSquare 
                  className={`absolute left-4 top-6 transition-colors duration-300 ${
                    focusedField === 'message' || formData.message 
                      ? 'text-emerald-400' 
                      : 'text-slate-400'
                  }`}
                  size={20}
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Message"
                  required
                  rows={6}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-700/50 border-2 rounded-xl text-white placeholder-slate-400 transition-all duration-300 focus:outline-none resize-none ${
                    errors.message
                      ? 'border-red-500'
                      : focusedField === 'message'
                        ? 'border-emerald-400 bg-slate-700/70 shadow-lg shadow-emerald-400/20' 
                        : 'border-slate-600 hover:border-slate-500'
                  }`}
                />
              </div>
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send 
                      className="transition-transform duration-300 group-hover:translate-x-1" 
                      size={18}
                    />
                  </>
                )}
              </button>
            </div>
          </form>
          ) : (
            /* Success State */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
              <p className="text-slate-300 mb-6">
                Thanks for reaching out, {formData.name}! We'll get back to you as soon as possible.
              </p>
              <p className="text-sm text-slate-400">
                This form will reset automatically in a few seconds.
              </p>
            </div>
          )}

          {/* Direct Contact Info */}
          {/* <div className="mt-16 text-center">
            <div className="inline-block p-6 bg-slate-700/30 rounded-2xl border border-slate-600/50 backdrop-blur-sm">
              <p className="text-slate-300 mb-4">
                Prefer to reach out directly?
              </p>
              <a 
                href="mailto:hello@gambeta.com"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium text-lg group"
              >
                <Mail 
                  className="transition-transform duration-300 group-hover:scale-110" 
                  size={20}
                />
                hello@gambeta.com
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
