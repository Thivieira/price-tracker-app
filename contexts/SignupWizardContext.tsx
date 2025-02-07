import { createContext, useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signupSchema = z.object({
  // Account Details
  phone: z.string(),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number and special character'),
  password_confirmation: z.string()
    .min(1, 'Password confirmation is required'),
  // Personal Information
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  // Address
  streetAddress: z.string().min(5, 'Street address is required'),
  complement: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  region: z.string().min(2, 'Region is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  // PIN
  pin: z.string().length(4, 'PIN must be 4 digits')
})

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupWizardContextType {
  methods: ReturnType<typeof useForm<SignupFormData>>;
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
}

const SignupWizardContext = createContext<SignupWizardContextType | undefined>(undefined);

export function SignupWizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUnregister: false,
    defaultValues: {
      phone: '',
      username: '',
      password: '',
      password_confirmation: '',
      // ... other default values
    }
  });

  const totalSteps = 4; // Account, Personal Info, Address, PIN

  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <SignupWizardContext.Provider
      value={{
        methods,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        isLastStep: currentStep === totalSteps - 1
      }}
    >
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </SignupWizardContext.Provider>
  );
}

export const useSignupWizard = () => {
  const context = useContext(SignupWizardContext);
  if (!context) {
    throw new Error('useSignupWizard must be used within SignupWizardProvider');
  }
  return context;
}; 