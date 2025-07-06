
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface FormData {
  age: string;
  education: string;
  interests: string;
  timeAvailability: string;
  currentSkills: string;
  goals: string;
  preferredLearningStyle: string;
  budget: string;
}

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const MultiStepForm = ({ onSubmit, isLoading }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    education: "",
    interests: "",
    timeAvailability: "",
    currentSkills: "",
    goals: "",
    preferredLearningStyle: "",
    budget: ""
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="age" className="text-lg font-medium">What's your age range?</Label>
            <Select value={formData.age} onValueChange={(value) => updateFormData('age', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your age range" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="16-20">16-20</SelectItem>
                <SelectItem value="21-25">21-25</SelectItem>
                <SelectItem value="26-30">26-30</SelectItem>
                <SelectItem value="31-35">31-35</SelectItem>
                <SelectItem value="36-40">36-40</SelectItem>
                <SelectItem value="41+">41+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="education" className="text-lg font-medium">What's your education level?</Label>
            <Select value={formData.education} onValueChange={(value) => updateFormData('education', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="some-college">Some College</SelectItem>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      title: "Interests & Skills",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="interests" className="text-lg font-medium">What are your main interests?</Label>
            <Textarea
              id="interests"
              placeholder="e.g., Technology, Design, Business, Healthcare, Arts..."
              value={formData.interests}
              onChange={(e) => updateFormData('interests', e.target.value)}
              className="mt-2 min-h-24"
            />
          </div>
          
          <div>
            <Label htmlFor="currentSkills" className="text-lg font-medium">What skills do you currently have?</Label>
            <Textarea
              id="currentSkills"
              placeholder="e.g., Programming, Communication, Project Management..."
              value={formData.currentSkills}
              onChange={(e) => updateFormData('currentSkills', e.target.value)}
              className="mt-2 min-h-24"
            />
          </div>
        </div>
      )
    },
    {
      title: "Goals & Availability",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="goals" className="text-lg font-medium">What are your career goals?</Label>
            <Textarea
              id="goals"
              placeholder="e.g., Become a software developer, Start my own business, Change careers to UX design..."
              value={formData.goals}
              onChange={(e) => updateFormData('goals', e.target.value)}
              className="mt-2 min-h-24"
            />
          </div>
          
          <div>
            <Label htmlFor="timeAvailability" className="text-lg font-medium">How much time can you dedicate to learning per week?</Label>
            <Select value={formData.timeAvailability} onValueChange={(value) => updateFormData('timeAvailability', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your availability" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="1-5 hours">1-5 hours</SelectItem>
                <SelectItem value="6-10 hours">6-10 hours</SelectItem>
                <SelectItem value="11-20 hours">11-20 hours</SelectItem>
                <SelectItem value="20+ hours">20+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      title: "Learning Preferences",
      content: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="preferredLearningStyle" className="text-lg font-medium">What's your preferred learning style?</Label>
            <Select value={formData.preferredLearningStyle} onValueChange={(value) => updateFormData('preferredLearningStyle', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your learning style" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="visual">Visual (videos, diagrams)</SelectItem>
                <SelectItem value="reading">Reading (books, articles)</SelectItem>
                <SelectItem value="hands-on">Hands-on (projects, practice)</SelectItem>
                <SelectItem value="structured">Structured courses</SelectItem>
                <SelectItem value="mixed">Mixed approach</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="budget" className="text-lg font-medium">What's your learning budget?</Label>
            <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="free">Free resources only</SelectItem>
                <SelectItem value="low">$1-50/month</SelectItem>
                <SelectItem value="medium">$51-200/month</SelectItem>
                <SelectItem value="high">$200+/month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    }
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.age && formData.education;
      case 1:
        return formData.interests && formData.currentSkills;
      case 2:
        return formData.goals && formData.timeAvailability;
      case 3:
        return formData.preferredLearningStyle && formData.budget;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto backdrop-blur-lg bg-white/95 shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-800">
            {steps[currentStep].title}
          </CardTitle>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index <= currentStep ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="animate-fade-in">
            {steps[currentStep].content}
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 0}
              className="px-6"
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || isLoading}
              className="bg-gradient-primary text-white px-6 hover:opacity-90"
            >
              {isLoading ? (
                "Generating..."
              ) : currentStep === steps.length - 1 ? (
                "Generate Roadmap"
              ) : (
                <>
                  Next
                  <ArrowDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
