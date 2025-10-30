# Audio Files Required

All audio files should be placed in the `/public/audio/` directory as `.wav` files.

## System Audio Files

These are used for game feedback and transitions:

- `welcome.wav` - "Welcome firefighter! Let's rescue everyone!" ✅ (already recorded)
- `great-job.wav` - "Great job!"
- `try-again.wav` - "Try again!"
- `you-win.wav` - "You rescued everyone! You win!"

## Word Audio Files

The game now uses **word pools** - each letter has multiple word options. A random word is selected for each letter when a level starts, adding variety and replayability.

Prompt format: "Now rescue the [word]"

### Level 1 Letters: B, C, D, M, E, T

**B words:**
- `bear.wav`
- `ball.wav`
- `bird.wav`
- `boat.wav`

**C words:**
- `cat.wav`
- `car.wav`
- `cake.wav`

**D words:**
- `dog.wav`
- `duck.wav`
- `dinosaur.wav`

**M words:**
- `monkey.wav`
- `moon.wav`
- `mouse.wav`

**E words:**
- `egg.wav`
- `elephant.wav`

**T words:**
- `toy.wav`
- `truck.wav`
- `tree.wav`

### Level 2 Letters: A, F, G, H, R, S

**A words:**
- `apple.wav`
- `ant.wav`
- `alligator.wav`

**F words:**
- `fish.wav`
- `frog.wav`
- `flower.wav`

**G words:**
- `goat.wav`
- `giraffe.wav`
- `grapes.wav`

**H words:**
- `hat.wav`
- `horse.wav`
- `house.wav`

**R words:**
- `robot.wav`
- `rabbit.wav`
- `rocket.wav`

**S words:**
- `snake.wav`
- `sun.wav`
- `star.wav`

### Level 3 Letters: K, L, N, O, P, W

**K words:**
- `kite.wav`
- `key.wav`
- `koala.wav`

**L words:**
- `lion.wav`
- `leaf.wav`
- `lemon.wav`

**N words:**
- `nose.wav`
- `nest.wav`

**O words:**
- `orange.wav`
- `owl.wav`
- `octopus.wav`

**P words:**
- `pig.wav`
- `pizza.wav`
- `penguin.wav`

**W words:**
- `watermelon.wav`
- `water.wav`
- `whale.wav`
- `watch.wav`

### Level 4 Letters: I, J, Q, U, V, Z

**I words:**
- `igloo.wav`
- `ice.wav`

**J words:**
- `juice.wav`
- `jet.wav`
- `jump.wav`

**Q words:**
- `queen.wav`

**U words:**
- `umbrella.wav`

**V words:**
- `violin.wav`
- `van.wav`

**Z words:**
- `zebra.wav`

---

## Total Audio Files

- **4 system audio files**
- **68 word audio files** (varies by letter - some have 2-4 options each)
- **Total: 72 audio files**

## Recording Strategy

### Priority 1: Core Words (24 files)
Record at least one word per letter to get the game fully functional:
- bear, cat, dog, monkey, egg, toy (Level 1)
- apple, fish, goat, hat, robot, snake (Level 2)
- kite, lion, nose, orange, pig, watermelon (Level 3)
- igloo, juice, queen, umbrella, violin, zebra (Level 4)

### Priority 2: Additional Options
Add variety by recording additional words for each letter as time allows.

## Recording Tips

1. **Consistent Voice**: Use the same voice/speaker for all recordings
2. **Child-Friendly Tone**: Enthusiastic and encouraging
3. **Clear Pronunciation**: Especially for the letter sounds
4. **Consistent Volume**: Normalize audio levels across all files
5. **No Background Noise**: Record in a quiet environment
6. **Sample Rate**: 44.1kHz or 48kHz recommended
7. **Bit Depth**: 16-bit or 24-bit

## File Naming Convention

- All lowercase
- No spaces (use hyphens if needed for system files)
- `.wav` extension
- Match the word exactly as it appears in `/config/levels.ts`

## Adding More Words

To add more word options for any letter:

1. Edit `/config/levels.ts`
2. Add the new word to the appropriate letter's array in `wordPools`
3. Record and add the corresponding `.wav` file to `/public/audio/`
4. Update this list

Example:
```typescript
b: [
  { word: 'bear', letter: 'b', emoji: '🐻' },
  { word: 'ball', letter: 'b', emoji: '⚽' },
  { word: 'banana', letter: 'b', emoji: '🍌' }, // NEW!
],
```

Then record `banana.wav`.

## Testing

After adding audio files, test:
- ✅ Welcome message plays on level start
- ✅ Word prompts play correctly
- ✅ "Great job" plays on correct answer
- ✅ "Try again" plays on incorrect answer
- ✅ Win message plays at end
- ✅ Repeat button (🔊) replays current word prompt
- ✅ Different words appear when replaying same level
