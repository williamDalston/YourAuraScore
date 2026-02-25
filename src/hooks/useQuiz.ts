'use client';

import { useReducer, useCallback } from 'react';
import type { QuizState, QuizAction } from '@/lib/quiz/types';
import { questions } from '@/lib/quiz/questions';
import { calculateDimensions } from '@/lib/quiz/scoring';
import { encodeAnswers } from '@/lib/quiz/hash';

const initialState: QuizState = {
  currentQuestion: 0,
  answers: {},
  dimensions: null,
  hash: null,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.optionId },
        currentQuestion: state.currentQuestion + 1,
      };
    case 'GO_BACK':
      return {
        ...state,
        currentQuestion: Math.max(0, state.currentQuestion - 1),
      };
    case 'COMPLETE':
      return {
        ...state,
        dimensions: action.dimensions,
        hash: action.hash,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const answerQuestion = useCallback((questionId: number, optionId: number) => {
    dispatch({ type: 'ANSWER', questionId, optionId });
  }, []);

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' });
  }, []);

  const completeQuiz = useCallback((answers: Record<number, number>) => {
    const dimensions = calculateDimensions(answers);
    const hash = encodeAnswers(answers);
    dispatch({ type: 'COMPLETE', dimensions, hash });
    return { dimensions, hash };
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const isComplete = state.currentQuestion >= questions.length;
  const progress = state.currentQuestion / questions.length;
  const currentQuestion = questions[state.currentQuestion] ?? null;

  return {
    state,
    currentQuestion,
    progress,
    isComplete,
    answerQuestion,
    goBack,
    completeQuiz,
    reset,
  };
}
