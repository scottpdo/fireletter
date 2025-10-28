import { Level, RescueTarget } from '@/types/game'

// Level 1: Focus on letters B, C, D, M, P, T
const level1Targets: RescueTarget[] = [
  { word: 'bear', letter: 'b', emoji: '🐻' },
  { word: 'cat', letter: 'c', emoji: '🐱' },
  { word: 'dog', letter: 'd', emoji: '🐕' },
  { word: 'monkey', letter: 'm', emoji: '🐒' },
  { word: 'egg', letter: 'e', emoji: '🥚' },
  { word: 'toy', letter: 't', emoji: '🧸' },
]

// Level 2: Focus on letters A, F, G, H, R, S
const level2Targets: RescueTarget[] = [
  { word: 'apple', letter: 'a', emoji: '🍎' },
  { word: 'goat', letter: 'g', emoji: '🐐' },
  { word: 'hat', letter: 'h', emoji: '🎩' },
  { word: 'fish', letter: 'f', emoji: '🐟' },
  { word: 'robot', letter: 'r', emoji: '🤖' },
  { word: 'snake', letter: 's', emoji: '🐍' },
]

// Level 3: Focus on letters K, L, N, O, P, W
const level3Targets: RescueTarget[] = [
  { word: 'kite', letter: 'k', emoji: '🪁' },
  { word: 'lion', letter: 'l', emoji: '🦁' },
  { word: 'nose', letter: 'n', emoji: '👃' },
  { word: 'owl', letter: 'o', emoji: '🦉' },
  { word: 'pig', letter: 'p', emoji: '🐷' },
  { word: 'water', letter: 'w', emoji: '💧' },
]

// Level 4: Focus on letters I, J, Q, U, V, Z
const level4Targets: RescueTarget[] = [
  { word: 'ice', letter: 'i', emoji: '🧊' },
  { word: 'jump', letter: 'j', emoji: '🦘' },
  { word: 'queen', letter: 'q', emoji: '👸' },
  { word: 'umbrella', letter: 'u', emoji: '☂️' },
  { word: 'van', letter: 'v', emoji: '🚐' },
  { word: 'zebra', letter: 'z', emoji: '🦓' },
]

export const levels: Level[] = [
  { name: 'Level 1', targets: level1Targets },
  { name: 'Level 2', targets: level2Targets },
  { name: 'Level 3', targets: level3Targets },
  { name: 'Level 4', targets: level4Targets },
]

