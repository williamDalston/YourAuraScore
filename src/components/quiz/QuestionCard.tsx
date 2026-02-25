'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/lib/quiz/types';
import ImageOption from './ImageOption';
import WordOption from './WordOption';
import IconOption from './IconOption';
import SliderOption from './SliderOption';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionId: number) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="w-full max-w-lg mx-auto flex flex-col items-center gap-8 px-6"
    >
      <h2 className="text-white text-2xl sm:text-3xl font-bold text-center leading-tight">
        {question.text}
      </h2>

      {question.type === 'slider' ? (
        <SliderOption options={question.options} onSelect={onAnswer} />
      ) : (
        <div
          className={`w-full grid gap-4 ${
            question.type === 'image'
              ? 'grid-cols-2'
              : question.type === 'icon'
              ? 'grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {question.options.map((option, index) => {
            switch (question.type) {
              case 'image':
                return (
                  <ImageOption
                    key={option.id}
                    option={option}
                    index={index}
                    onSelect={() => onAnswer(option.id)}
                  />
                );
              case 'word':
                return (
                  <WordOption
                    key={option.id}
                    option={option}
                    index={index}
                    onSelect={() => onAnswer(option.id)}
                  />
                );
              case 'icon':
                return (
                  <IconOption
                    key={option.id}
                    option={option}
                    index={index}
                    onSelect={() => onAnswer(option.id)}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      )}
    </motion.div>
  );
}
