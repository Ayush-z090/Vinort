# TrialDreamProduct

A fast, minimal YouTube-style app where you can search videos, open a stream view, and toggle a recommendations drawer. It focuses on speed, smooth animations, and avoiding unnecessary network calls.

## What can you do?

- Search for videos and browse results
- Click a card to open the video in a stream view
- Toggle a Recommendations panel based on your saved interests
- Get a clean, readable layout with long titles neatly truncated

## How it works (in simple terms)

- When you search, results are cached in memory so going back and forth doesn’t re-fetch the same data.
- Recommendations are fetched only once per session and reused when you toggle them on/off.
- If the YouTube API limit is reached, the app automatically shows built‑in sample results so the UI stays usable.
- Animations and micro‑interactions are handled with `framer-motion` for a smoother feel.

## Quick start

1) Install dependencies

```bash
npm install
```

2) Add your YouTube API key in a `.env` file at the project root

```bash
VITE_YT_API_KEY=YOUR_YOUTUBE_API_KEY
```

3) Run the app

```bash
npm run dev
```

4) Build for production (optional)

```bash
npm run build
```

## Using the app

- Home page
  - Type your prompt/search in the form and submit.
  - Use the toggle to open/close the Recommendations panel.

- Search page
  - Shows your search results as cards.
  - Long titles are truncated with `...` to keep cards tidy.

- Stream page
  - Opens the selected video in an embedded player.

## Performance and network behavior

- Search caching: results are cached per query and page size. Returning to a search reuses the cache.
- Recommendation caching: fetched once and reused while the app is open.
- Fallback data: when API limits occur, the UI displays sample results instead of breaking.

## Small details you’ll notice

- Animated, stylish 3‑dot loader for better perceived performance.
- Hover and scale interactions on cards for a polished feel.
- Layout adjusts for smaller screens.

## Troubleshooting

- I only see sample videos
  - Your YouTube API quota may be exhausted. Add a valid key or try again later.

- Search returns no results
  - Ensure your API key is correct in `.env` and you restarted the dev server after creating/updating it.

## Tech stack

- React 18 + Vite
- Framer Motion (animations)
- CSS Modules

---

This project aims to be a clean starting point for video search + viewing with thoughtful UX and sensible caching out of the box.
