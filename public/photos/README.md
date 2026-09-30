# Photos & music

## Hero childhood photo
- Drop ONE photo of her as a kid: `public/photos/little-her.jpg` (3:4, <250KB, squoosh.app).
- No code change needed — the site tries `.jpg` first, then the placeholder.

## Gallery (6 slots)
1. Save as `public/photos/cuking-1.jpg` ... `cuking-6.jpg` (3:4, <250KB each, squoosh.app).
2. Edit `lib/content.ts` → array `photoChapters` → change `.svg` to `.jpg`.

## Music
- Primary: YouTube video set in `lib/content.ts` (`videoId`). Starts instantly at
  full volume after the "step into your world" gate tap, loops while the site is open.
- Fallback: if the video blocks embedding, `public/music/ultah.mp3` plays instead.
  Drop one mp3 there (<3MB) so the fallback exists.
- "Now playing" text: edit `nowPlaying` in `lib/content.ts`.
- Signature at the end of the finale letter: edit `signature` in `lib/content.ts`.
