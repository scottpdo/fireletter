'use client'

import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { levels } from '@/config/levels'
import { WindowState, GamePhase } from '@/types/game'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic'
import Building from './Building'
import WinScreen from './WinScreen'
import LevelSelector from './LevelSelector'

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #87ceeb 0%, #e0f6ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (orientation: portrait) {
    &::before {
      content: 'Please rotate your device';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      font-weight: bold;
      color: #333;
      text-align: center;
      z-index: 1000;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
`

const AudioButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const MusicToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 100px;
  background: #4ecdc4;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

export default function Game() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number | null>(null)
  const [windows, setWindows] = useState<WindowState[]>([])
  const [promptOrder, setPromptOrder] = useState<string[]>([]) // Order of words to prompt
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [gamePhase, setGamePhase] = useState<GamePhase>('intro')
  const [musicEnabled, setMusicEnabled] = useState(false)
  
  const { play, isPlaying } = useAudioPlayer()
  useBackgroundMusic(musicEnabled)

  // Shuffle array helper
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Initialize level
  const startLevel = useCallback((levelIndex: number) => {
    const level = levels[levelIndex]
    // Shuffle the targets for random letter placement in windows
    const shuffledForWindows = shuffleArray(level.targets)
    const initialWindows: WindowState[] = shuffledForWindows.map((target) => ({
      target,
      isRevealed: false,
      isRescued: false,
    }))
    
    // Shuffle separately for prompt order
    const shuffledForPrompts = shuffleArray(level.targets)
    const promptOrderWords = shuffledForPrompts.map(t => t.word)
    
    setWindows(initialWindows)
    setPromptOrder(promptOrderWords)
    setCurrentPromptIndex(0)
    setCurrentLevelIndex(levelIndex)
    setGamePhase('playing')
    
    // Welcome message and first prompt
    setTimeout(async () => {
      try {
        await play('/audio/welcome.wav')
        if (promptOrderWords[0]) {
          await play(`/audio/${promptOrderWords[0]}.wav`)
        }
      } catch (error) {
        console.error('Audio playback failed:', error)
      }
    }, 500)
  }, [play])

  // Announce current target
  const announceTarget = useCallback(async () => {
    const currentWord = promptOrder[currentPromptIndex]
    if (currentWord) {
      try {
        await play(`/audio/${currentWord}.wav`)
      } catch (error) {
        console.error('Audio playback failed:', error)
      }
    }
  }, [promptOrder, currentPromptIndex, play])

  // Handle window click
  const handleWindowClick = useCallback((windowIndex: number) => {
    if (gamePhase !== 'playing' || isPlaying) return

    const clickedWindow = windows[windowIndex]
    if (clickedWindow.isRevealed) return // Already tried this window

    const newWindows = [...windows]
    const currentWord = promptOrder[currentPromptIndex]

    // Reveal the window
    newWindows[windowIndex] = {
      ...clickedWindow,
      isRevealed: true,
    }

    // Check if correct - compare clicked window's word with current prompt word
    const isCorrect = clickedWindow.target.word === currentWord

    if (isCorrect) {
      newWindows[windowIndex].isRescued = true
      setWindows(newWindows)
      
      // Play success sound
      play('/audio/great-job.wav').catch(console.error)
      
      // Move to next target or win
      setTimeout(async () => {
        const rescuedCount = newWindows.filter(w => w.isRescued).length
        
        if (rescuedCount === newWindows.length) {
          setGamePhase('won')
          setTimeout(() => {
            play('/audio/you-win.wav').catch(console.error)
          }, 500)
        } else {
          // Move to next prompt
          const nextPromptIndex = currentPromptIndex + 1
          
          // Reset isRevealed for all non-rescued windows so they can be clicked again
          const resetWindows = newWindows.map(w => ({
            ...w,
            isRevealed: w.isRescued ? w.isRevealed : false
          }))
          setWindows(resetWindows)
          
          setCurrentPromptIndex(nextPromptIndex)
          setTimeout(async () => {
            const nextWord = promptOrder[nextPromptIndex]
            if (nextWord) {
              try {
                await play(`/audio/${nextWord}.wav`)
              } catch (error) {
                console.error('Audio playback failed:', error)
              }
            }
          }, 1000)
        }
      }, 1500)
    } else {
      // Show the incorrect choice - stays locked for this round
      setWindows(newWindows)
      
      // Play try again sound
      play('/audio/try-again.wav').catch(console.error)
      
      // Repeat the prompt after a delay
      setTimeout(async () => {
        if (currentWord) {
          try {
            await play(`/audio/${currentWord}.wav`)
          } catch (error) {
            console.error('Audio playback failed:', error)
          }
        }
      }, 1500)
    }
  }, [windows, promptOrder, currentPromptIndex, gamePhase, isPlaying, play])

  const handleRestart = useCallback(() => {
    setCurrentLevelIndex(null)
    setGamePhase('intro')
    setWindows([])
    setPromptOrder([])
    setCurrentPromptIndex(0)
  }, [])

  const handleNextLevel = useCallback(() => {
    if (currentLevelIndex !== null && currentLevelIndex < levels.length - 1) {
      startLevel(currentLevelIndex + 1)
    } else {
      handleRestart()
    }
  }, [currentLevelIndex, startLevel, handleRestart])

  return (
    <GameContainer>
      {gamePhase === 'intro' && (
        <LevelSelector onSelectLevel={startLevel} />
      )}
      
      {gamePhase === 'playing' && (
        <>
          <AudioButton 
            onClick={announceTarget}
            disabled={isPlaying}
            title="Repeat prompt"
          >
            🔊
          </AudioButton>
          
          <Building
            windows={windows}
            onWindowClick={handleWindowClick}
          />
        </>
      )}
      
      {gamePhase === 'won' && (
        <WinScreen 
          onRestart={handleRestart}
          onNextLevel={currentLevelIndex !== null && currentLevelIndex < levels.length - 1 ? handleNextLevel : undefined}
        />
      )}
    </GameContainer>
  )
}

