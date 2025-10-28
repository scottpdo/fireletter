import { useCallback, useState, useRef } from 'react'

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback((audioPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Cancel any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      // Create new audio element
      const audio = new Audio(audioPath)
      audioRef.current = audio

      audio.onloadeddata = () => {
        setIsPlaying(true)
      }

      audio.onended = () => {
        setIsPlaying(false)
        resolve()
      }

      audio.onerror = (error) => {
        setIsPlaying(false)
        console.error('Audio playback error:', error)
        reject(error)
      }

      // Start playback
      audio.play().catch((err) => {
        setIsPlaying(false)
        console.error('Audio play failed:', err)
        reject(err)
      })
    })
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [])

  return { play, stop, isPlaying }
}

