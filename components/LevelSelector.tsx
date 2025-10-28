'use client'

import styled, { keyframes } from 'styled-components'
import { levels } from '@/config/levels'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  animation: ${fadeIn} 0.6s ease-out;
  padding: 20px;
  max-height: 100vh;
  
  @media (max-width: 768px) {
    gap: 15px;
    padding: 10px;
  }
`

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 10px;
  
  @media (max-width: 768px) {
    gap: 15px;
    margin-top: 5px;
  }
`

const LevelButton = styled.button`
  padding: 30px 50px;
  font-size: 32px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #4ecdc4 0%, #44b3aa 100%);
  border: none;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 200px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 20px 30px;
    font-size: 24px;
    min-width: 140px;
  }
`

interface LevelSelectorProps {
  onSelectLevel: (levelIndex: number) => void
}

export default function LevelSelector({ onSelectLevel }: LevelSelectorProps) {
  return (
    <SelectorContainer>
      <LevelGrid>
        {levels.map((level, index) => (
          <LevelButton key={index} onClick={() => onSelectLevel(index)}>
            {level.name}
          </LevelButton>
        ))}
      </LevelGrid>
    </SelectorContainer>
  )
}

