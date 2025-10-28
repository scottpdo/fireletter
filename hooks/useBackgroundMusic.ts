import { useEffect, useRef } from 'react'

export const useBackgroundMusic = (enabled: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
      
      // You can replace this with an actual music file URL
      // For now, we'll use a silent approach as placeholder
      // When you have music files, set: audioRef.current.src = '/music/background.mp3'
    }

    const audio = audioRef.current

    if (enabled) {
      // Attempt to play
      audio.play().catch(err => {
        console.log('Audio playback prevented:', err)
        // Browser may block autoplay - user interaction required
      })
    } else {
      audio.pause()
    }

    return () => {
      if (audio) {
        audio.pause()
      }
    }
  }, [enabled])

  return audioRef
}

