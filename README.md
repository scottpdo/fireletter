# 🚒 FireLetter - Letter Learning Game

An educational web game for children learning to identify and read letters of the alphabet. Players take on the role of a firefighter rescuing people, animals, and objects from a burning building by selecting the correct first letter of each word.

## 🎮 Game Features

- **6 Windows**: Each round presents 6 windows with different letters
- **Voice Prompts**: Text-to-speech announces which item to rescue (e.g., "Now rescue the dog")
- **Letter Recognition**: Players tap the window showing the first letter of the target word
- **Multiple Levels**: 4 levels focusing on different letter groups
- **Sprite-Based Animations**: Visual feedback with character animations
- **No Failure Mode**: Unlimited attempts - children can keep trying until they succeed
- **Mobile-First**: Designed for horizontal tablet/phone orientation
- **Win Screen**: Celebration screen with confetti and level progression

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🎨 Adding Custom Assets

### Background Music

To add background music:

1. Place your music file in the `public` directory (e.g., `public/background-music.mp3`)
2. Update `/hooks/useBackgroundMusic.ts` and uncomment/modify this line:
```typescript
audioRef.current.src = '/background-music.mp3'
```

Recommended: Use royalty-free music suitable for children. Sources:
- [Incompetech](https://incompetech.com/)
- [Bensound](https://www.bensound.com/)
- [FreePD](https://freepd.com/)

### Pixel Art Sprites

The game currently uses emoji placeholders. To add pixel art sprites:

1. Download sprite assets from:
   - **[Kenney.nl](https://kenney.nl/assets)** (Recommended - CC0 license)
   - [OpenGameArt.org](https://opengameart.org/)
   - [itch.io](https://itch.io/game-assets/free)

2. Place sprite images in `public/sprites/`

3. Update the components to use images instead of emojis:
   - Modify `components/Window.tsx` to render `<img>` tags
   - Update `types/game.ts` to use `imageUrl` instead of `emoji`
   - Update `config/levels.ts` with sprite file paths

## 📚 Game Structure

### Levels

The game includes 4 levels, each focusing on different letter groups:

- **Level 1**: B, C, D, F, P, T
- **Level 2**: A, G, H, M, R, S
- **Level 3**: E, K, L, N, O, W
- **Level 4**: I, J, Q, U, V, Z

Edit `/config/levels.ts` to add more levels or modify vocabulary.

### Adding New Words

To add words appropriate for 4-year-olds:

```typescript
// In config/levels.ts
const newTarget: RescueTarget[] = [
  { word: 'bear', letter: 'b', emoji: '🐻' },
  // Add more...
]
```

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: styled-components
- **Text-to-Speech**: Web Speech API
- **Deployment**: Vercel-ready

## 📱 Device Compatibility & PWA

- **Orientation**: Optimized for landscape/horizontal mode
- **Touch Controls**: Tap/click to select windows
- **Screen Sizes**: Responsive design for tablets and phones
- **Browsers**: Modern browsers with Web Speech API support
- **Progressive Web App**: Can be installed to home screen (hides URL bar)
  - See `PWA_SETUP.md` for icon requirements and installation guide

## 🎯 Educational Goals

- **Letter Recognition**: Identifying individual letters
- **Phonics**: Associating letters with word sounds
- **First Letter Awareness**: Understanding that words start with specific letters
- **Vocabulary Building**: Learning age-appropriate words
- **Confidence Building**: No-fail design encourages repeated attempts

## 🔧 Customization

### Adjusting Difficulty

In `/components/Game.tsx`, you can modify:
- Speech rate and pitch in `useTextToSpeech.ts`
- Animation speeds in styled components
- Number of windows (requires restructuring the grid)

### Styling

All styling uses styled-components. Key style files:
- `/components/Building.tsx` - Building and fire effects
- `/components/Window.tsx` - Window animations
- `/components/WinScreen.tsx` - Victory screen
- `/app/globals.css` - Global styles

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

For questions or issues, please open a GitHub issue.

---

Made with ❤️ for young learners
