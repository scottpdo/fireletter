'use client'

import styled, { keyframes, css } from 'styled-components'
import { WindowState } from '@/types/game'

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const rescued = keyframes`
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(300px) scale(0.5); opacity: 0; }
`

const WindowFrame = styled.div<{ $isRevealed: boolean; $isRescued: boolean; $isClickable: boolean }>`
  background: ${props => props.$isRevealed ? 
    (props.$isRescued ? 'linear-gradient(135deg, #90ee90 0%, #32cd32 100%)' : 'linear-gradient(135deg, #696969 0%, #404040 100%)') :
    'linear-gradient(135deg, #87ceeb 0%, #4682b4 100%)'};
  border: 6px solid #333;
  border-radius: 8px;
  cursor: ${props => props.$isClickable && !props.$isRevealed ? 'pointer' : 'default'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: ${props => props.$isClickable && !props.$isRevealed ? 
    '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.3)' : 
    '0 2px 4px rgba(0, 0, 0, 0.2)'};
  overflow: hidden;

  &:hover {
    transform: ${props => props.$isClickable && !props.$isRevealed ? 'scale(1.05)' : 'scale(1)'};
    box-shadow: ${props => props.$isClickable && !props.$isRevealed ? 
      '0 6px 12px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.4)' : 
      '0 2px 4px rgba(0, 0, 0, 0.2)'};
  }

  &:active {
    transform: ${props => props.$isClickable && !props.$isRevealed ? 'scale(0.95)' : 'scale(1)'};
  }
`

const WindowDivider = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 100%;
  background: #999;
  transform: translateX(-50%);
`

const WindowDividerH = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background: #999;
  transform: translateY(-50%);
`

const Letter = styled.div`
  font-size: 64px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
`

const Emoji = styled.div<{ $isRescued: boolean }>`
  font-size: 60px;
  animation: ${slideDown} 0.5s ease-out;
  ${props => props.$isRescued && css`
    animation: ${rescued} 1.5s ease-in forwards;
  `}
`

const FailIcon = styled.div`
  font-size: 40px;
  animation: ${slideDown} 0.5s ease-out;
`

interface WindowProps {
  window: WindowState
  onClick: () => void
}

export default function Window({ window, onClick }: WindowProps) {
  const isClickable = !window.isRevealed

  return (
    <WindowFrame
      onClick={onClick}
      $isRevealed={window.isRevealed}
      $isRescued={window.isRescued}
      $isClickable={isClickable}
    >
      <WindowDivider />
      <WindowDividerH />
      
      {!window.isRevealed && (
        <Letter>
          {window.target.letter}
        </Letter>
      )}
      
      {window.isRevealed && window.isRescued && (
        <Emoji $isRescued={true}>
          {window.target.emoji}
        </Emoji>
      )}
      
      {window.isRevealed && !window.isRescued && (
        <FailIcon>❌</FailIcon>
      )}
    </WindowFrame>
  )
}

