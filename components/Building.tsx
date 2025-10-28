'use client'

import styled, { keyframes } from 'styled-components'
import { WindowState } from '@/types/game'
import Window from './Window'

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`

const sway = keyframes`
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`

const BuildingContainer = styled.div`
  position: relative;
  width: 90vw;
  max-width: 900px;
  height: 70vh;
  max-height: 500px;
  background: linear-gradient(to bottom, #8b4513 0%, #654321 100%);
  border: 8px solid #4a2511;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  padding: 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(255, 100, 0, 0.3), transparent 50%),
                radial-gradient(circle at 80% 60%, rgba(255, 150, 0, 0.2), transparent 40%);
    animation: ${flicker} 2s infinite;
    pointer-events: none;
    border-radius: 10px;
  }
`

const FireEffect = styled.div`
  position: absolute;
  bottom: -40px;
  left: 10%;
  right: 10%;
  height: 60px;
  background: linear-gradient(to top, rgba(255, 100, 0, 0.8), rgba(255, 200, 0, 0.3));
  filter: blur(10px);
  animation: ${flicker} 1.5s infinite;
  border-radius: 50% 50% 0 0;
`

const Roof = styled.div`
  position: absolute;
  top: -40px;
  left: -10px;
  right: -10px;
  height: 50px;
  background: linear-gradient(to bottom, #8b4513, #654321);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  border: 4px solid #4a2511;
`

const Ground = styled.div`
  position: absolute;
  bottom: -80px;
  left: -200px;
  right: -200px;
  height: 80px;
  background: linear-gradient(to bottom, #228b22, #1a6b1a);
`

const Ladder = styled.div`
  position: absolute;
  bottom: -80px;
  right: -30px;
  width: 40px;
  height: calc(100% + 80px);
  background: repeating-linear-gradient(
    to bottom,
    #c0c0c0 0px,
    #c0c0c0 5px,
    transparent 5px,
    transparent 15px,
    #a9a9a9 15px,
    #a9a9a9 20px,
    transparent 20px,
    transparent 40px
  );
  border-left: 6px solid #888;
  border-right: 6px solid #888;
  transform: rotate(10deg);
  transform-origin: bottom right;
  
  @media (max-width: 768px) {
    right: 10px;
    transform: rotate(5deg);
  }
`

const FireEmoji = styled.div<{ $top?: string; $left?: string; $right?: string; $bottom?: string; $delay?: number }>`
  position: absolute;
  font-size: 36px;
  top: ${props => props.$top};
  left: ${props => props.$left};
  right: ${props => props.$right};
  bottom: ${props => props.$bottom};
  animation: ${sway} 2s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  z-index: 1;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(255, 100, 0, 0.8));
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`

interface BuildingProps {
  windows: WindowState[]
  onWindowClick: (index: number) => void
}

export default function Building({ windows, onWindowClick }: BuildingProps) {
  return (
    <>
      <Ground />
      <BuildingContainer>
        <Roof />
        <FireEffect />
        
        {/* Fire emojis around the building - positioned to avoid overlapping windows */}
        <FireEmoji $top="2%" $left="5%" $delay={0}>🔥</FireEmoji>
        <FireEmoji $top="2%" $right="8%" $delay={0.3}>🔥</FireEmoji>
        <FireEmoji $top="48%" $left="2%" $delay={0.6}>🔥</FireEmoji>
        <FireEmoji $top="48%" $right="2%" $delay={0.9}>🔥</FireEmoji>
        <FireEmoji $bottom="2%" $left="15%" $delay={0.2}>🔥</FireEmoji>
        <FireEmoji $bottom="2%" $right="18%" $delay={0.5}>🔥</FireEmoji>
        
        {windows.map((window, index) => (
          <Window
            key={index}
            window={window}
            onClick={() => onWindowClick(index)}
          />
        ))}
        <Ladder />
      </BuildingContainer>
    </>
  )
}

