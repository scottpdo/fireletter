This repo is the codebase for a web game whose audience is children learning to identify and read letters of the alphabet. The plot of the game is simple:

- The player is a firefighter rescuing people/objects/animals from a burning building.
- There are six windows in view. Every round, a voice says, "Now rescue the _____" (example: "dog," "teacher"). When the voice says it, different individual letters appear in the windows (example: "d," "t").
- The player chooses one window. If they are correct (ex. "d" for "dog"), the person/object/animal appears and goes down a ladder to safety. If they are incorrect, a different person/object/animal appears but is not rescued. On subsequent rounds, letters do not appear in that window.
- The letters and people/objects/animals are chosen at the start and do not change across rounds. The game ends when the player has rescued everything from the windows.

UI:
- The game is meant to be played on a mobile device held horizontally. The only user interaction is tapping on a window.
- Sprite-based pixel art/tiles.

Technology:
- Next.js, React, TypeScript
- Will deploy to Vercel
- No need for back-end data store or authentication, just a single page for the game