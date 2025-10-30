import { RescueTarget } from '@/types/game'

// Word pools organized by letter
// Each letter has multiple word options
export const wordPools: Record<string, RescueTarget[]> = {
  a: [
    { word: 'apple', letter: 'a', emoji: '🍎' },
    { word: 'ant', letter: 'a', emoji: '🐜' },
    { word: 'alligator', letter: 'a', emoji: '🐊' },
  ],
  b: [
    { word: 'bear', letter: 'b', emoji: '🐻' },
    { word: 'ball', letter: 'b', emoji: '⚽' },
    { word: 'bird', letter: 'b', emoji: '🐦' },
    { word: 'boat', letter: 'b', emoji: '⛵' },
  ],
  c: [
    { word: 'cat', letter: 'c', emoji: '🐱' },
    { word: 'car', letter: 'c', emoji: '🚗' },
    { word: 'cake', letter: 'c', emoji: '🎂' },
  ],
  d: [
    { word: 'dog', letter: 'd', emoji: '🐕' },
    { word: 'duck', letter: 'd', emoji: '🦆' },
    { word: 'dinosaur', letter: 'd', emoji: '🦕' },
  ],
  e: [
    { word: 'egg', letter: 'e', emoji: '🥚' },
    { word: 'elephant', letter: 'e', emoji: '🐘' },
  ],
  f: [
    { word: 'fish', letter: 'f', emoji: '🐟' },
    { word: 'frog', letter: 'f', emoji: '🐸' },
    { word: 'flower', letter: 'f', emoji: '🌸' },
  ],
  g: [
    { word: 'goat', letter: 'g', emoji: '🐐' },
    { word: 'gorilla', letter: 'g', emoji: '🦍' },
    { word: 'grapes', letter: 'g', emoji: '🍇' },
    { word: 'guitar', letter: 'g', emoji: '🎸' },
  ],
  h: [
    { word: 'hat', letter: 'h', emoji: '🎩' },
    { word: 'horse', letter: 'h', emoji: '🐴' },
    { word: 'house', letter: 'h', emoji: '🏠' },
  ],
  i: [
    { word: 'igloo', letter: 'i', emoji: '🏔️' },
    { word: 'iguana', letter: 'i', emoji: '🦎' },
    { word: 'insect', letter: 'i', emoji: '🐛' },
  ],
  j: [
    { word: 'juice', letter: 'j', emoji: '🧃' },
    { word: 'jet', letter: 'j', emoji: '✈️' },
    { word: 'jellyfish', letter: 'j', emoji: '🪼' },
  ],
  k: [
    { word: 'kite', letter: 'k', emoji: '🪁' },
    { word: 'key', letter: 'k', emoji: '🔑' },
    { word: 'koala', letter: 'k', emoji: '🐨' },
  ],
  l: [
    { word: 'lion', letter: 'l', emoji: '🦁' },
    { word: 'leaf', letter: 'l', emoji: '🍃' },
    { word: 'lemon', letter: 'l', emoji: '🍋' },
  ],
  m: [
    { word: 'monkey', letter: 'm', emoji: '🐒' },
    { word: 'moon', letter: 'm', emoji: '🌙' },
    { word: 'mouse', letter: 'm', emoji: '🐭' },
  ],
  n: [
    { word: 'nose', letter: 'n', emoji: '👃' },
    { word: 'nest', letter: 'n', emoji: '🪺' },
  ],
  o: [
    { word: 'orange', letter: 'o', emoji: '🍊' },
    { word: 'octopus', letter: 'o', emoji: '🐙' },
    { word: 'olive', letter: 'o', emoji: '🫒' },
  ],
  p: [
    { word: 'pig', letter: 'p', emoji: '🐷' },
    { word: 'pizza', letter: 'p', emoji: '🍕' },
    { word: 'penguin', letter: 'p', emoji: '🐧' },
  ],
  q: [
    { word: 'queen', letter: 'q', emoji: '👸' },
  ],
  r: [
    { word: 'robot', letter: 'r', emoji: '🤖' },
    { word: 'rabbit', letter: 'r', emoji: '🐰' },
    { word: 'rocket', letter: 'r', emoji: '🚀' },
  ],
  s: [
    { word: 'snake', letter: 's', emoji: '🐍' },
    { word: 'sun', letter: 's', emoji: '☀️' },
    { word: 'star', letter: 's', emoji: '⭐' },
  ],
  t: [
    { word: 'toy', letter: 't', emoji: '🧸' },
    { word: 'truck', letter: 't', emoji: '🚚' },
    { word: 'tree', letter: 't', emoji: '🌲' },
  ],
  u: [
    { word: 'umbrella', letter: 'u', emoji: '☂️' },
  ],
  v: [
    { word: 'violin', letter: 'v', emoji: '🎻' },
    { word: 'van', letter: 'v', emoji: '🚐' },
  ],
  w: [
    { word: 'watermelon', letter: 'w', emoji: '🍉' },
    { word: 'water', letter: 'w', emoji: '💧' },
    { word: 'whale', letter: 'w', emoji: '🐋' },
    { word: 'watch', letter: 'w', emoji: '⌚' },
  ],
  z: [
    { word: 'zebra', letter: 'z', emoji: '🦓' },
  ],
}

// Level configurations - specifying which letters each level uses
export interface LevelConfig {
  name: string
  letters: string[]
}

export const levels: LevelConfig[] = [
  { name: 'Level 1', letters: ['b', 'c', 'd', 'm', 'e', 't'] },
  { name: 'Level 2', letters: ['a', 'f', 'g', 'h', 'r', 's'] },
  { name: 'Level 3', letters: ['k', 'l', 'n', 'o', 'p', 'w'] },
  { name: 'Level 4', letters: ['i', 'j', 'q', 'u', 'v', 'z'] },
]

// Helper function to get random word for a letter
export function getRandomWordForLetter(letter: string): RescueTarget {
  const pool = wordPools[letter.toLowerCase()]
  if (!pool || pool.length === 0) {
    throw new Error(`No words available for letter: ${letter}`)
  }
  return pool[Math.floor(Math.random() * pool.length)]
}
