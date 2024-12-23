import React, { useState } from 'react';
import { useEditorStore } from '../../../store/editorStore';
import { PageElement, FormQuestion } from '../../../types/editor';

interface Props {
  element: PageElement;
}

export const FormElement: React.FC<Props> = ({ element }) => {
  const { updateElement } = useEditorStore();
  const [currentStep, setCurrentStep] = useState(0);
  const questions = element.questions || defaultQuestions;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      updateElement(element.id, { currentStep: currentStep + 1 });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      updateElement(element.id, { currentStep: currentStep - 1 });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm" style={element.style}>
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">
          Step {currentStep + 1} of {questions.length}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{questions[currentStep].question}</h3>
        {questions[currentStep].type === 'text' ? (
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Your answer"
          />
        ) : (
          <div className="space-y-2">
            {questions[currentStep].options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="radio" name={`question-${currentStep}`} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === questions.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const defaultQuestions: FormQuestion[] = [
  {
    id: '1',
    question: 'What is your name?',
    type: 'text'
  },
  {
    id: '2',
    question: 'How did you hear about us?',
    type: 'choice',
    options: ['Social Media', 'Friend', 'Search Engine', 'Other']
  },
  {
    id: '3',
    question: 'What services are you interested in?',
    type: 'choice',
    options: ['Web Design', 'Mobile Apps', 'Consulting', 'Other']
  }
];