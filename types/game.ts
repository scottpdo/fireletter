export interface RescueTarget {
  word: string // e.g., "dog"
  letter: string // First letter, e.g., "d"
  emoji: string // Visual representation for now (can be replaced with sprites)
}

export interface WindowState {
  target: RescueTarget
  isRevealed: boolean // Has a rescue attempt been made?
  isRescued: boolean // Was it successful?
}

export interface Level {
  name: string
  targets: RescueTarget[]
}

export type GamePhase = 'intro' | 'playing' | 'won'

