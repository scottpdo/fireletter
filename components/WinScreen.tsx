'use client'

import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const confetti = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
`

const WinContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
`

const WinMessage = styled.div`
  font-size: 80px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out 0.3s both;
`

const Subtitle = styled.div`
  font-size: 36px;
  color: #fff;
  margin-bottom: 40px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out 0.5s both;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  animation: ${fadeIn} 0.8s ease-out 0.7s both;
`

const Button = styled.button<{ $primary?: boolean }>`
  padding: 20px 40px;
  font-size: 28px;
  font-weight: bold;
  color: white;
  background: ${props => props.$primary ? 
    'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)' : 
    'linear-gradient(135deg, #4ecdc4 0%, #44b3aa 100%)'};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`

const Confetti = styled.div<{ $delay: number; $left: number }>`
  position: absolute;
  top: -20px;
  left: ${props => props.$left}%;
  width: 10px;
  height: 10px;
  background: ${() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd700', '#95e1d3', '#f38181', '#aa96da']
    return colors[Math.floor(Math.random() * colors.length)]
  }};
  animation: ${confetti} 3s linear ${props => props.$delay}s infinite;
`

interface WinScreenProps {
  onRestart: () => void
  onNextLevel?: () => void
}

export default function WinScreen({ onRestart, onNextLevel }: WinScreenProps) {
  return (
    <WinContainer>
      {/* Confetti effect */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Confetti key={i} $delay={i * 0.1} $left={Math.random() * 100} />
      ))}
      
      <WinMessage>🎉 YOU WIN! 🎉</WinMessage>
      <Subtitle>Great job, firefighter!</Subtitle>
      
      <ButtonContainer>
        <Button onClick={onRestart}>
          Play Again
        </Button>
        {onNextLevel && (
          <Button $primary onClick={onNextLevel}>
            Next Level →
          </Button>
        )}
      </ButtonContainer>
    </WinContainer>
  )
}

