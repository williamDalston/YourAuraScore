import type { Dimensions } from '@/lib/quiz/types';
import { getDominantDimensions } from './matcher';

interface InsightTemplate {
  dimension: keyof Dimensions;
  high: string[];
  low: string[];
}

const insightTemplates: InsightTemplate[] = [
  {
    dimension: 'energy',
    high: [
      'You naturally gravitate toward action over analysis. When others are still planning, you\'re already three steps into execution.',
      'People are drawn to your vitality — you have a natural magnetism that comes from genuine enthusiasm rather than performance.',
      'Your high energy isn\'t restlessness; it\'s a deep conviction that life is meant to be lived at full volume.',
      'You process emotions through movement and action. Sitting still during stress is nearly impossible for you.',
      'Your presence in a room is palpable. You shift the energy just by walking in, whether you intend to or not.',
    ],
    low: [
      'Your power lies in your ability to be still when the world is spinning. This isn\'t passivity — it\'s profound strength.',
      'You conserve your energy with intention, choosing carefully where to invest your focus. This gives everything you do more weight.',
      'Others may mistake your calm for disinterest, but those who know you understand it\'s the stillness before deliberate, powerful action.',
    ],
  },
  {
    dimension: 'warmth',
    high: [
      'You have a gift for making people feel valued without saying a word. Your emotional attunement operates on a frequency most people can\'t even detect.',
      'Your relationships are your greatest investment, and the returns are immeasurable. People trust you instinctively.',
      'You lead with empathy, which paradoxically makes you one of the most influential people in any room.',
      'Your warmth isn\'t naive — it\'s a conscious choice to see the best in people while remaining clear-eyed about who they are.',
    ],
    low: [
      'You maintain clear emotional boundaries that protect your inner world. This isn\'t coldness — it\'s wisdom about where your energy goes.',
      'Your analytical approach to relationships means you form fewer but deeper connections that truly matter.',
    ],
  },
  {
    dimension: 'complexity',
    high: [
      'Your mind doesn\'t do simple. You see layers, connections, and possibilities that make the world richer and more interesting.',
      'You\'re the person people come to when they need a perspective no one else has considered. Your thinking is genuinely original.',
      'Boredom is your kryptonite. Your need for intellectual stimulation drives you to constant growth and discovery.',
      'You can hold contradictions in your mind without needing to resolve them. This tolerance for ambiguity is rarer than you think.',
    ],
    low: [
      'Your clarity of thought is a superpower. While others overcomplicate things, you cut straight to what matters.',
      'You value simplicity not because you can\'t handle complexity, but because you know that elegance is complexity resolved.',
    ],
  },
  {
    dimension: 'luminance',
    high: [
      'You naturally illuminate whatever you focus on. Your clarity makes complex things understandable and dark situations bearable.',
      'Your optimism isn\'t naive — it\'s earned. You\'ve seen enough to know that light persists even in the darkest moments.',
      'People seek you out when they need perspective. Your ability to shed light on confusion is a genuine gift.',
    ],
    low: [
      'You\'re comfortable in the shadows, which gives you access to truths that bright light obscures. Your perception goes deeper.',
      'Your comfort with darkness isn\'t sadness — it\'s the wisdom of someone who knows that the most beautiful things often grow in dim light.',
      'You find beauty and meaning in places others overlook. The subtle, the muted, and the understated speak to you loudly.',
    ],
  },
  {
    dimension: 'rhythm',
    high: [
      'You have an innate sense of timing that extends far beyond music. You know when to speak, when to wait, and when to act.',
      'Your life has a natural flow that others envy. You move between intensity and rest with a grace that seems effortless.',
      'You\'re deeply attuned to cycles — of energy, seasons, relationships. This gives you patience that others lack.',
    ],
    low: [
      'You march to a beat so unique that standard rhythms feel constraining. Your irregular tempo is where your creativity lives.',
      'You resist routines not out of laziness, but because your creative spirit needs unpredictability to thrive.',
    ],
  },
  {
    dimension: 'depth',
    high: [
      'You experience life at a depth that most people never access. Every emotion, every experience is felt fully and completely.',
      'Your capacity for reflection gives your opinions unusual weight. When you speak, it comes from genuine contemplation.',
      'You\'re drawn to meaning the way others are drawn to entertainment. Surface-level existence simply isn\'t enough for you.',
      'Your depth creates a gravity that pulls the right people into your orbit — those who crave authenticity over small talk.',
    ],
    low: [
      'Your gift is the ability to stay present and light. While others get lost in overthinking, you remain engaged with the moment.',
      'You process life in real-time rather than retrospectively. This keeps you agile and responsive to what\'s actually happening.',
    ],
  },
];

export function generateInsights(dimensions: Dimensions): string[] {
  const dominant = getDominantDimensions(dimensions);
  const insights: string[] = [];

  for (const dim of dominant) {
    const template = insightTemplates.find(t => t.dimension === dim);
    if (!template) continue;

    const isHigh = dimensions[dim] > 50;
    const pool = isHigh ? template.high : template.low;

    // Deterministic selection based on dimension value
    const index = Math.floor((dimensions[dim] / 100) * (pool.length - 0.01));
    const insight = pool[Math.min(index, pool.length - 1)];

    if (insight && !insights.includes(insight)) {
      insights.push(insight);
    }

    if (insights.length >= 3) break;
  }

  // Fallback if we don't have 3
  while (insights.length < 3) {
    const template = insightTemplates[insights.length % insightTemplates.length];
    const pool = dimensions[template.dimension] > 50 ? template.high : template.low;
    const fallback = pool[0];
    if (fallback && !insights.includes(fallback)) {
      insights.push(fallback);
    } else {
      break;
    }
  }

  return insights;
}
