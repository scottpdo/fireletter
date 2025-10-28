# 🛠 Development Guide

## Project Structure

```
fireletter/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with styled-components
│   ├── page.tsx             # Home page (renders Game)
│   ├── registry.tsx         # Styled-components SSR registry
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Game.tsx             # Main game logic and state
│   ├── Building.tsx         # Building visual with fire effects
│   ├── Window.tsx           # Individual window component
│   ├── WinScreen.tsx        # Victory screen
│   └── LevelSelector.tsx    # Level selection screen
├── config/
│   └── levels.ts            # Game levels and word lists
├── hooks/
│   ├── useTextToSpeech.ts   # Text-to-speech functionality
│   └── useBackgroundMusic.ts # Background music control
├── types/
│   └── game.ts              # TypeScript type definitions
└── public/                  # Static assets (images, audio)
```

## Development Workflow

### Running the Dev Server

```bash
npm run dev
```

The dev server runs on `http://localhost:3000` with hot-reload enabled.

### Type Checking

```bash
npx tsc --noEmit
```

### Building

```bash
npm run build
```

## Common Customizations

### 1. Adding New Levels

Edit `config/levels.ts`:

```typescript
const level5Targets: RescueTarget[] = [
  { word: 'xylophone', letter: 'x', emoji: '🎵' },
  { word: 'yacht', letter: 'y', emoji: '⛵' },
  // ... more targets
]

export const levels: Level[] = [
  // ... existing levels
  { name: 'Level 5', targets: level5Targets },
]
```

### 2. Changing Window Layout

To change from 3x2 to 2x3 grid, edit `components/Building.tsx`:

```typescript
const BuildingContainer = styled.div`
  // Change this:
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  
  // To this:
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
`
```

### 3. Adjusting Speech Settings

Edit `hooks/useTextToSpeech.ts`:

```typescript
utterance.rate = 0.9   // Speed: 0.1 to 10 (default 1)
utterance.pitch = 1.1  // Pitch: 0 to 2 (default 1)
utterance.volume = 1   // Volume: 0 to 1 (default 1)
```

### 4. Customizing Colors

Main colors are defined in styled-components. Key locations:

- **Building**: `components/Building.tsx` - browns and fire colors
- **Windows**: `components/Window.tsx` - blue, green, gray
- **Buttons**: `components/WinScreen.tsx` and `LevelSelector.tsx`
- **Background**: `components/Game.tsx` - sky blue gradient

### 5. Adding Sound Effects

Create a hook similar to `useBackgroundMusic.ts`:

```typescript
// hooks/useSoundEffects.ts
export const useSoundEffects = () => {
  const playSuccess = () => {
    const audio = new Audio('/sounds/success.mp3')
    audio.play()
  }
  
  const playError = () => {
    const audio = new Audio('/sounds/error.mp3')
    audio.play()
  }
  
  return { playSuccess, playError }
}
```

Then use in `components/Game.tsx`:

```typescript
const { playSuccess, playError } = useSoundEffects()

// In handleWindowClick:
if (isCorrect) {
  playSuccess()
} else {
  playError()
}
```

### 6. Replacing Emojis with Sprites

1. Add images to `public/sprites/`:
   ```
   public/sprites/
   ├── ball.png
   ├── cat.png
   ├── dog.png
   └── ...
   ```

2. Update `types/game.ts`:
   ```typescript
   export interface RescueTarget {
     word: string
     letter: string
     imageUrl: string  // Changed from emoji
   }
   ```

3. Update `config/levels.ts`:
   ```typescript
   { word: 'dog', letter: 'd', imageUrl: '/sprites/dog.png' }
   ```

4. Update `components/Window.tsx`:
   ```typescript
   {window.isRevealed && window.isRescued && (
     <img 
       src={window.target.imageUrl} 
       alt={window.target.word}
       style={{ width: '60px', height: '60px' }}
     />
   )}
   ```

## Animation System

The game uses CSS keyframe animations defined with styled-components:

### Key Animations

- **Bounce**: Letters in active windows
- **SlideDown**: Characters appearing
- **Rescued**: Character sliding down ladder
- **Flicker**: Fire effect
- **Confetti**: Win screen celebration

### Creating New Animations

```typescript
const myAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const AnimatedElement = styled.div`
  animation: ${myAnimation} 2s infinite;
`
```

## State Management

The game uses React hooks for state management in `components/Game.tsx`:

### Key State Variables

- `currentLevelIndex`: Which level is active
- `windows`: Array of window states (revealed, rescued)
- `currentTargetIndex`: Which target is being sought
- `gamePhase`: 'intro' | 'playing' | 'won'
- `musicEnabled`: Background music on/off

### Game Flow

1. **Intro**: Level selector shown
2. **Level Start**: Windows initialized, first prompt spoken
3. **Window Click**: 
   - Correct → Mark rescued, move to next target
   - Incorrect → Show X, allow retry
4. **All Rescued**: Show win screen
5. **Next/Restart**: Return to level selector or next level

## Browser Compatibility

### Text-to-Speech Support

- ✅ Chrome/Edge (Windows, Mac, Android)
- ✅ Safari (iOS, macOS)
- ✅ Firefox (limited voices)
- ❌ Internet Explorer (not supported)

Test with:
```typescript
if ('speechSynthesis' in window) {
  // Supported
}
```

### Touch Events

The game uses `onClick` which works for both mouse and touch. For advanced touch:

```typescript
onTouchStart={(e) => {
  e.preventDefault()
  handleWindowClick(index)
}}
```

## Performance Tips

1. **Optimize Images**: Use WebP format for sprites
2. **Lazy Load Levels**: Only load active level data
3. **Reduce Animations**: On low-end devices
4. **Audio Preloading**: Preload background music

## Testing on Devices

### iOS Safari
- Enable sound permission
- Test touch interactions
- Verify landscape mode

### Android Chrome
- Test text-to-speech voices
- Check performance on various devices
- Verify fullscreen mode

### Desktop
- Test with mouse clicks
- Verify keyboard navigation (future feature)
- Check different screen sizes

## Debugging

### Console Logs

Add debug logging:

```typescript
console.log('Window clicked:', windowIndex)
console.log('Current target:', currentTargetIndex)
console.log('Windows state:', windows)
```

### React DevTools

Install [React DevTools](https://react.dev/learn/react-developer-tools) to inspect:
- Component state
- Props
- Re-render performance

### TypeScript Errors

Check types with:
```bash
npx tsc --noEmit
```

## Future Enhancement Ideas

- [ ] Keyboard support for desktop
- [ ] Multiple difficulty modes (speed challenges)
- [ ] Progress tracking/local storage
- [ ] Parent dashboard
- [ ] More animation effects
- [ ] Reward system (stars, badges)
- [ ] Additional mini-games
- [ ] Accessibility improvements (screen reader support)
- [ ] Internationalization (multiple languages)
- [ ] Custom avatar selection

---

Happy coding! 🚀

