# Audio Files Required

All audio files should be placed in the `/public/audio/` directory as `.wav` files.

## System Audio Files

These are used for game feedback and transitions:

- `welcome.wav` - "Welcome firefighter! Let's rescue everyone!" ✅ (already recorded)
- `great-job.wav` - "Great job!"
- `try-again.wav` - "Try again!"
- `you-win.wav` - "You rescued everyone! You win!"

## Level 1 Word Audio Files

Letters: B, C, D, M, E, T

- `bear.wav` - "Now rescue the bear"
- `cat.wav` - "Now rescue the cat"
- `dog.wav` - "Now rescue the dog"
- `monkey.wav` - "Now rescue the monkey"
- `egg.wav` - "Now rescue the egg"
- `toy.wav` - "Now rescue the toy"

## Level 2 Word Audio Files

Letters: A, F, G, H, R, S

- `apple.wav` - "Now rescue the apple"
- `goat.wav` - "Now rescue the goat"
- `hat.wav` - "Now rescue the hat"
- `fish.wav` - "Now rescue the fish"
- `robot.wav` - "Now rescue the robot"
- `snake.wav` - "Now rescue the snake"

## Level 3 Word Audio Files

Letters: K, L, N, O, P, W

- `kite.wav` - "Now rescue the kite"
- `lion.wav` - "Now rescue the lion"
- `nose.wav` - "Now rescue the nose"
- `orange.wav` - "Now rescue the orange"
- `pig.wav` - "Now rescue the pig"
- `watermelon.wav` - "Now rescue the watermelon"

## Level 4 Word Audio Files

Letters: I, J, Q, U, V, Z

- `ice.wav` - "Now rescue the ice"
- `jump.wav` - "Now rescue the jump"
- `queen.wav` - "Now rescue the queen"
- `umbrella.wav` - "Now rescue the umbrella"
- `van.wav` - "Now rescue the van"
- `zebra.wav` - "Now rescue the zebra"

---

## Total Audio Files Needed: 28

- 4 system audio files
- 24 word prompt audio files (6 per level × 4 levels)

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

## Testing

After adding audio files, test:
- ✅ Welcome message plays on level start
- ✅ Word prompts play correctly
- ✅ "Great job" plays on correct answer
- ✅ "Try again" plays on incorrect answer
- ✅ Win message plays at end
- ✅ Repeat button (🔊) replays current word prompt

