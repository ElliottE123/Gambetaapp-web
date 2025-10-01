import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, User, Calendar, Smartphone, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { submitSignupToGoogleSheets, validateSignupData } from '../utils/googleSheets';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    platform: 'ios'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Handle form validation
  const validateForm = () => {
    const validation = validateSignupData(formData);
    const newErrors: {[key: string]: string} = {};
    
    // Convert validation errors to field-specific errors
    validation.errors.forEach(error => {
      if (error.includes('Name')) newErrors.name = error;
      else if (error.includes('Email')) newErrors.email = error;
      else if (error.includes('Age')) newErrors.age = error;
      else if (error.includes('Platform')) newErrors.platform = error;
    });
    
    setErrors(newErrors);
    return validation.isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError('');
    
    try {
      const result = await submitSignupToGoogleSheets(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds and close modal
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', age: '', email: '', platform: 'ios' });
          onClose();
        }, 3000);
      } else {
        setSubmitError(result.error || 'Failed to submit signup. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Focus first input when modal opens
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
  className="relative w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

  <div className="p-8 overflow-y-auto">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Get Early Access</h2>
                <p className="text-slate-300">Be the first to know when Gambeta launches in the DMV area!</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Age Field */}
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    min="13"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      errors.age ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="Enter your age"
                  />
                  {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Platform Field */}
                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-slate-300 mb-2">
                    <Smartphone className="w-4 h-4 inline mr-2" />
                    Preferred Platform
                  </label>
                  <select
                    id="platform"
                    value={formData.platform}
                    onChange={(e) => handleInputChange('platform', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  >
                    <option value="ios">iOS (iPhone/iPad)</option>
                    <option value="android">Android</option>
                    <option value="both">Both iOS and Android</option>
                  </select>
                </div>

                {/* Privacy Notice */}
                <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                  <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-300">
                    <p className="font-medium text-white mb-1">Privacy Protected</p>
                    <p>
                      Your data will never be sold or shared with third parties. 
                      We'll only send you quality updates about Gambeta's launch and tournament information. 
                      You can unsubscribe at any time.
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Sign Up for Early Access'
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">You're All Set!</h2>
              <p className="text-slate-300 mb-6">
                Thanks for signing up, {formData.name}! We'll notify you as soon as Gambeta launches in the DMV area.
              </p>
              <p className="text-sm text-slate-400">
                This window will close automatically in a few seconds.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
