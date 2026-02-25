/**
 * Deterministic hash encoding/decoding for quiz answers.
 * Encodes 12 answers (each 0-3, plus sliders 0-4) into a compact base36 string.
 * This hash appears in the URL and is fully decodable — no database needed.
 */

const BASE = 5; // Each answer can be 0-4 (5 values)
const NUM_QUESTIONS = 12;
const VALID_HASH_REGEX = /^[a-z0-9]{4,12}$/; // Base36, reasonable length

export function isValidHash(hash: string): boolean {
  if (!hash || typeof hash !== 'string') return false;
  return VALID_HASH_REGEX.test(hash);
}

export function encodeAnswers(answers: Record<number, number>): string {
  let value = 0n;
  for (let i = NUM_QUESTIONS; i >= 1; i--) {
    const answer = BigInt(answers[i] ?? 0);
    value = value * BigInt(BASE) + answer;
  }
  return value.toString(36).padStart(6, '0');
}

export function decodeAnswers(hash: string): Record<number, number> {
  if (!isValidHash(hash)) {
    throw new Error(`Invalid quiz hash: ${hash}`);
  }
  const parsed = parseInt(hash, 36);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid quiz hash: ${hash}`);
  }
  let value = BigInt(parsed);
  const answers: Record<number, number> = {};
  for (let i = 1; i <= NUM_QUESTIONS; i++) {
    answers[i] = Number(value % BigInt(BASE));
    value = value / BigInt(BASE);
  }
  return answers;
}

export function hashToSeed(hash: string): number {
  let h = 0;
  for (let i = 0; i < hash.length; i++) {
    h = ((h << 5) - h + hash.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}
