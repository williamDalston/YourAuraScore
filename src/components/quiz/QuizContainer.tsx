'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useQuiz } from '@/hooks/useQuiz';
import { questions } from '@/lib/quiz/questions';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

export default function QuizContainer() {
  const router = useRouter();
  const {
    state,
    currentQuestion,
    progress,
    isComplete,
    answerQuestion,
    goBack,
    completeQuiz,
  } = useQuiz();

  useEffect(() => {
    if (isComplete && !state.hash) {
      const { hash } = completeQuiz(state.answers);
      router.push(`/results/${hash}`);
    }
  }, [isComplete, state.hash, state.answers, completeQuiz, router]);

  const handleAnswer = useCallback(
    (optionId: number) => {
      if (!currentQuestion) return;
      answerQuestion(currentQuestion.id, optionId);
    },
    [currentQuestion, answerQuestion]
  );

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <ProgressBar
        progress={progress}
        current={state.currentQuestion}
        total={questions.length}
      />

      <div className="px-6 h-10 flex items-center">
        {state.currentQuestion > 0 && (
          <button
            onClick={goBack}
            aria-label="Go to previous question"
            className="text-white/50 hover:text-white transition-colors
                       text-sm flex items-center gap-1 cursor-pointer min-h-[44px] min-w-[44px]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center pb-12">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
