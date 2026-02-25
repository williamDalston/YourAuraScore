import type { Metadata } from 'next';
import QuizContainer from '@/components/quiz/QuizContainer';

export const metadata: Metadata = {
  title: 'Take the Quiz | YourAuraScore',
  description: 'Answer 12 visual questions to discover your unique aura visualization.',
};

export default function QuizPage() {
  return <QuizContainer />;
}
