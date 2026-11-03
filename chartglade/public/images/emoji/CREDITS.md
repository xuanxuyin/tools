# Image credits

The outline drawings in this folder come from [OpenMoji](https://openmoji.org) —
the "black" (line-art) color variant, one SVG per English word used on the
letter coloring pages (`/coloring/letters/<letter>/`).

OpenMoji is released under the **Creative Commons Attribution-ShareAlike 4.0**
license (CC BY-SA 4.0). The OpenMoji project is maintained by the HfG
Schwäbisch Gmünd design school.

Regenerate this folder with `node scripts/fetch-emoji-art.mjs` (requires the
local socks proxy). The list of words served from this folder lives in
`EMOJI_WORDS` in `src/lib/drawings.ts` — keep it in sync with
`EMOJI_ART` in the fetch script.
