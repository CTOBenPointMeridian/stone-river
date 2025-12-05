'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({
    seekingHelpFor: '',
    primaryCondition: '',
    duration: '',
    severity: '',
    previousTreatment: '',
    mentalHealthConcerns: [],
    insuranceType: '',
    insuranceProvider: '',
    insuranceCardImage: '',
    insuranceReceivedHow: '',
    recoveryReadiness: 5,
    dateOfBirth: '',
    timeframe: '',
    fullName: '',
    phone: '',
    email: '',
    consentToContact: false,
  });

  type StepType = {
    type: string;
    headline?: string;
    subheadline?: string;
    question?: string;
    options?: string[];
    key?: string;
    placeholder?: string;
    accept?: string;
  };

  const steps: StepType[] = [
    {
      type: 'intro',
      headline: 'Free Confidential Mental Health Assessment',
      subheadline: 'A few quick questions to help us understand your situation and guide you toward the right level of care at Stone River Behavioral Health.',
    },
    {
      type: 'single-choice',
      question: 'Who are you seeking help for?',
      options: ['Myself', 'A family member', 'A friend', 'Someone else'],
      key: 'seekingHelpFor',
    },
    {
      type: 'single-choice',
      question: 'What condition or concern brings you here today?',
      options: ['Anxiety', 'Depression', 'Bipolar Disorder', 'PTSD', 'OCD', 'Trauma', 'Substance Abuse', 'Dual Diagnosis', 'Other Mental Health Concern', 'Not sure yet'],
      key: 'primaryCondition',
    },
    {
      type: 'single-choice',
      question: 'How long has this been a concern?',
      options: ['In the past thirty days', 'One to three months ago', 'Three to twelve months ago', 'Over a year ago'],
      key: 'duration',
    },
    {
      type: 'single-choice',
      question: 'How would you describe the severity of your symptoms?',
      options: ['Mild - occasional symptoms', 'Moderate - frequent symptoms affecting daily life', 'Severe - significantly impacts functioning', 'Crisis - immediate assistance needed'],
      key: 'severity',
    },
    {
      type: 'single-choice',
      question: 'Have you received treatment before?',
      options: ['Yes, and it helped', 'Yes, but not helpful', 'No, this is my first time', 'Not sure'],
      key: 'previousTreatment',
    },
    {
      type: 'multi-choice',
      question: 'Which of these additional concerns apply to you?',
      options: ['Anxiety', 'Depression', 'Sleep issues', 'Substance use concerns', 'Trauma related symptoms', 'Family issues', 'I am not sure', 'None of the above'],
      key: 'mentalHealthConcerns',
    },
    {
      type: 'single-choice',
      question: 'What type of insurance do you have?',
      options: ['PPO', 'HMO', 'Medicaid', 'Medicare', 'No insurance', 'Not sure'],
      key: 'insuranceType',
    },
    {
      type: 'text-input',
      question: 'Who is your insurance provider?',
      key: 'insuranceProvider',
      placeholder: 'Enter your insurance provider (e.g., Blue Cross, Aetna)',
    },
    {
      type: 'file-upload',
      question: 'Optional. Upload a photo of your insurance card',
      key: 'insuranceCardImage',
      accept: 'image/*',
    },
    {
      type: 'single-choice',
      question: 'How do you receive your insurance?',
      options: ['Through employer', 'Private purchase', 'Government program', 'Other'],
      key: 'insuranceReceivedHow',
    },
    {
      type: 'single-choice',
      question: 'How ready do you feel for recovery on a scale of 1-10?',
      options: ['1 - Not ready', '2', '3', '4', '5 - Neutral', '6', '7', '8', '9', '10 - Very ready'],
      key: 'recoveryReadiness',
    },
    {
      type: 'date-input',
      question: 'What is your date of birth?',
      key: 'dateOfBirth',
    },
    {
      type: 'single-choice',
      question: 'When do you need help?',
      options: ['As soon as possible', 'Within the next week', 'Within the next month', 'Sometime in the future'],
      key: 'timeframe',
    },
    {
      type: 'text-input',
      question: 'What is your full name?',
      key: 'fullName',
      placeholder: 'Enter your full name',
    },
    {
      type: 'text-input',
      question: 'What is your phone number?',
      key: 'phone',
      placeholder: 'Enter your phone number',
    },
    {
      type: 'text-input',
      question: 'What is your email address?',
      key: 'email',
      placeholder: 'Enter your email address',
    },
    {
      type: 'checkbox',
      question: 'I consent to being contacted about my assessment results',
      key: 'consentToContact',
    },
  ];

  const handleAnswer = (key: string, value: any) => {
    if (steps[currentStep].type === 'multi-choice') {
      const currentAnswers = answers[key] || [];
      if (currentAnswers.includes(value)) {
        setAnswers({
          ...answers,
          [key]: currentAnswers.filter((a: string) => a !== value),
        });
      } else {
        setAnswers({
          ...answers,
          [key]: [...currentAnswers, value],
        });
      }
    } else {
      setAnswers({
        ...answers,
        [key]: value,
      });
    }
  };

  const handleFileUpload = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAnswers((prev) => ({
          ...prev,
          [key]: e.target?.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
        setCurrentStep(steps.length);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const step = steps[currentStep];
  const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-50 py-16 md:py-24 flex flex-col pt-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        {/* Progress Bar */}
        {currentStep > 0 && currentStep < steps.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-semibold text-gray-800">
                Step {currentStep} of {steps.length - 1}
              </span>
              <span className="text-base font-semibold text-gray-800">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-amber-700 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {currentStep < steps.length ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-16"
            >
              {/* Intro Screen */}
              {step.type === 'intro' && (
                <div className="text-center">
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    {step.headline}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                    {step.subheadline}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-10 py-4 bg-amber-700 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 transition"
                  >
                    Start Assessment
                  </motion.button>
                </div>
              )}

              {/* Single Choice Questions */}
              {step.type === 'single-choice' && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
                    {step.question}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {step.options?.map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleAnswer(step.key || '', option)}
                        className={`p-4 rounded-xl border-2 font-semibold text-lg transition ${
                          answers[step.key || ''] === option
                            ? 'border-amber-700 bg-amber-50 text-amber-700'
                            : 'border-gray-300 bg-white text-gray-900 hover:border-amber-400'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleNext}
                    disabled={!answers[step.key || '']}
                    className="w-full px-8 py-4 bg-amber-700 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Multi-Choice Questions */}
              {step.type === 'multi-choice' && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
                    {step.question}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {step.options?.map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleAnswer(step.key || '', option)}
                        className={`p-4 rounded-xl border-2 font-semibold text-lg transition ${
                          (answers[step.key || ''] || []).includes(option)
                            ? 'border-amber-700 bg-amber-50 text-amber-700'
                            : 'border-gray-300 bg-white text-gray-900 hover:border-amber-400'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-amber-700 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 transition flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Text Input */}
              {step.type === 'text-input' && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
                    {step.question}
                  </h2>
                  <input
                    type="text"
                    placeholder={step.placeholder}
                    value={answers[step.key || ''] || ''}
                    onChange={(e) => handleAnswer(step.key || '', e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl mb-10 text-lg text-gray-900 focus:border-amber-700 focus:outline-none placeholder:text-gray-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleNext}
                    disabled={!answers[step.key || '']}
                    className="w-full px-8 py-4 bg-amber-700 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* File Upload */}
              {step.type === 'file-upload' && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
                    {step.question}
                  </h2>
                  <div className="mb-10">
                    <label className="flex flex-col items-center justify-center w-full px-6 py-10 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-amber-700 hover:bg-amber-50 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="mb-2 text-lg font-semibold text-gray-900">Upload Insurance Card</p>
                        <p className="text-sm text-gray-600">Click to upload or take a photo</p>
                        {answers[step.key || ''] && (
                          <p className="mt-3 text-sm font-semibold text-amber-700">✓ Image uploaded</p>
                        )}
                      </div>
                      <input
                        type="file"
                        accept={step.accept || 'image/*'}
                        onChange={(e) => handleFileUpload(step.key || '', e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-amber-700 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 transition flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Date Input */}
              {step.type === 'date-input' && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
                    {step.question}
                  </h2>
                  <input
                    type="date"
                    value={answers[step.key || ''] || ''}
                    onChange={(e) => handleAnswer(step.key || '', e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl mb-10 text-lg text-gray-900 focus:border-amber-700 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleNext}
                    disabled={!answers[step.key || '']}
                    className="w-full px-8 py-4 bg-amber-700 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Checkbox */}
              {step.type === 'checkbox' && (
                <div>
                  <label className="flex items-center cursor-pointer mb-10">
                    <input
                      type="checkbox"
                      checked={answers[step.key || ''] || false}
                      onChange={(e) => handleAnswer(step.key || '', e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-amber-700 focus:ring-amber-700"
                    />
                    <span className="ml-3 text-xl text-gray-900 font-semibold">
                      {step.question}
                    </span>
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-amber-700 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 transition flex items-center justify-center gap-2"
                  >
                    Submit <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Navigation */}
              {currentStep > 0 && currentStep < steps.length && step.type !== 'checkbox' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleBack}
                  className="mt-6 text-amber-700 font-semibold hover:underline"
                >
                  ← Back
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-16 text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Thank You!
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Thank you for completing the assessment. Our team will review your responses and reach out to you shortly.
              </p>
              <a
                href="tel:+1-844-524-8553"
                className="inline-block px-10 py-4 bg-amber-700 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 transition"
              >
                Call Now: (844) 524-8553
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
