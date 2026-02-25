export type AnswerType = 'image' | 'word' | 'icon' | 'slider';

export interface Dimensions {
  energy: number;
  warmth: number;
  complexity: number;
  luminance: number;
  rhythm: number;
  depth: number;
}

export interface Option {
  id: number;
  label: string;
  sublabel?: string;
  gradient?: string; // CSS gradient for image-type options
  icon?: string;     // SVG path or emoji for icon-type options
}

export interface Question {
  id: number;
  text: string;
  type: AnswerType;
  options: Option[];
  dimensionWeights: Record<number, Partial<Dimensions>>;
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, number>; // questionId → optionId
  dimensions: Dimensions | null;
  hash: string | null;
}

export type QuizAction =
  | { type: 'ANSWER'; questionId: number; optionId: number }
  | { type: 'GO_BACK' }
  | { type: 'COMPLETE'; dimensions: Dimensions; hash: string }
  | { type: 'RESET' };
