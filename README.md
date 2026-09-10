# Happy Birthday, iCEY 🌲✨

A dark-fantasy, single-page birthday website — a little journey through a
midnight forest, built as a static site (HTML + CSS + vanilla JS only).
No backend, no build step, no dependencies. Works straight out of the box
on GitHub Pages.

## How to publish it on GitHub Pages

1. Create a new GitHub repository (public, or private with GitHub Pages on
   a paid plan).
2. Upload all the files in this folder, keeping the same structure:
   ```
   index.html
   style.css
   script.js
   images/photo1.jpg
   images/photo2.jpg
   images/photo3.jpg
   README.md
   ```
3. In the repo, go to **Settings → Pages**, set the source to your default
   branch (usually `main`) and root folder, then save.
4. GitHub will give you a URL like `https://yourusername.github.io/repo-name/`
   — that's the finished site.

No Node, npm, build commands, or environment variables needed.

## What to customize before sending it

Every editable spot is marked in the code with a comment like
`CUSTOMIZE #n`. Here's the full list:

| # | What | Where |
|---|------|-------|
| 1 | Website `<title>` / meta description | top of `index.html` |
| 2 | Her real name / username | `index.html` — hero section & sign-off |
| 3 | Age (22 → whatever it should be) | `index.html` — hero, easter egg, finale "23." |
| 4 | *(reserved — see #5)* | — |
| 5 | The four firefly messages | top of `script.js`, `FIREFLY_MESSAGES` array |
| 6 | Three image paths + captions | `index.html`, gallery section (`images/photo1.jpg` etc.) |
| 7 | Song / player info | `index.html`, music section + `audio/lokkhyyo.mp3` |
| 8 | Colors | top of `style.css`, the `:root` variables |
| 9 | Final suspense text | `index.html`, finale section |

### Replacing the photos

Drop your own images into the `images/` folder using the **exact same
filenames** (`photo1.jpg`, `photo2.jpg`, `photo3.jpg`) and they'll appear
automatically. JPG, PNG, or WEBP all work — just keep the filenames (or
update the `src` in `index.html` if you rename them). Placeholder images
are included so the layout looks right until you swap them in.

### Adding the song for real playback

Because this is a static site with no server, it can't legally re-host or
stream someone else's copyrighted song file. The player is wired up to
work two ways:

- **Best option:** if you own a legally-obtained copy of the track, add it
  at `audio/lokkhyyo.mp3` (create the `audio` folder) and the in-page
  player will play it directly, no autoplay, only on tap.
- **Fallback:** if no local file is found, pressing play opens the
  original YouTube Music link in a new tab instead — nothing is
  downloaded, copied, or redistributed by the site itself.

### The two easter eggs

- **"LEVEL 22 UNLOCKED"** is tucked into the small italic inscription just
  above the main headline — hover it (or tap it on mobile) to reveal the
  hidden text.
- **The firefly forest** has exactly four larger, brighter fireflies mixed
  in with the decorative ones. Finding and tapping all four reveals four
  short handwritten-style messages.

## Notes on browser support & accessibility

- Respects `prefers-reduced-motion`: animations are minimized automatically
  for anyone with that OS setting on.
- All interactive elements are keyboard-focusable with visible focus
  rings.
- No external JS frameworks — just the two Google Fonts and vanilla CSS/JS,
  so the whole page stays fast even on older phones.

Happy birthday, Aastha. 🌿
