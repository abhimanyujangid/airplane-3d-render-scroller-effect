# Airplane 3D Render — Scroll Scrubber

A React + Vite playground that drives a fullscreen background animation from the page's scroll position. Built with **GSAP ScrollTrigger** for the scroll-to-time mapping, Tailwind CSS for layout, and React Router for two demo routes.

The interesting part of this repo is that it implements the same scroll-scrubbed background effect **two different ways**, on two different routes, so you can compare them side by side.

| Route | Component | Technique |
| --- | --- | --- |
| `/` (Home) | [`FrameBackground`](src/components/FrameBackground.tsx) | 273-frame JPG image sequence drawn to a `<canvas>` |
| `/about` | [`VideoBackground`](src/components/VideoBackground.tsx) | Streaming MP4 with `video.currentTime` seeking |

Both components register a GSAP `ScrollTrigger` spanning `top top` → `bottom bottom`, so scroll position is mapped 1:1 onto animation progress. Only the consumer of `self.progress` differs.

---

## The two approaches

### 1. Video URL (used on `/about`)

```ts
ScrollTrigger.create({
  trigger: document.documentElement,
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate: (self) => {
    video.currentTime = self.progress * video.duration;
  },
});
```

Pros:
- Tiny payload — H.264 compresses across frames, so a few seconds of clip is hundreds of KB, not megabytes.
- Streams progressively; the page can become interactive before the whole asset is downloaded.
- No upfront preload pause.

Cons:
- `video.currentTime = …` is **asynchronous**. The browser may still be decoding the previous seek when the next scroll tick arrives, so without throttling the video stutters.
- iOS Safari is notoriously slow at seeking and can drop frames or freeze entirely on fast scrolls.
- Smoothness depends on how the video was encoded — bitrate, GOP/keyframe density, and `moov` atom placement all matter.
- The component has to ship debounce logic (`seeking`, `seekPending`, `requestAnimationFrame`) just to survive normal scroll input. See [`VideoBackground.tsx`](src/components/VideoBackground.tsx) lines 24–41.

### 2. Frame sequence (used on `/`)

```ts
ScrollTrigger.create({
  trigger: document.documentElement,
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate: (self) => {
    const idx = Math.round(self.progress * (TOTAL_FRAMES - 1));
    ctx.drawImage(frames[idx], 0, 0, canvas.width, canvas.height);
  },
});
```

The 273 frames live in [`public/home_plane/`](public/home_plane) as `ezgif-frame-001.jpg` … `ezgif-frame-273.jpg`. They are preloaded into `Image` objects on mount; the canvas is drawn one frame at a time as `ScrollTrigger` reports progress.

Pros:
- `ctx.drawImage(...)` is **synchronous**. Each scroll tick maps to exactly one frame, painted in the same animation frame.
- No decoder, no `currentTime` round-trips, no `seeked` events to wait for.
- Frame-perfect — what you see is exactly the frame for your scroll position.
- Works identically across desktop Chrome, Safari, Firefox, and iOS Safari.

Cons:
- Larger preload: 273 JPGs total ~9.5 MB on this repo. The user sees a `Loading… %` overlay until all images are decoded.
- Higher memory footprint (all frames sit in image cache).
- Best suited to short clips. A 30-second clip at 30 fps would be ~900 frames — heading into "annoying preload" territory unless you optimize.

---

## Which is smoother?

**The frame sequence on `/` is noticeably smoother than the video on `/about`.**

You can verify this in the running app:

1. Open `/about` and scroll fast up/down. On most browsers (and especially Safari/iOS) you'll see the video pause briefly, then jump — that's the decoder catching up. On a long, fast scroll there is a visible "lag → snap" pattern.
2. Open `/` after the loader finishes. Scroll at the same speed. The plane animates 1:1 with the scrollbar position; reverse the scroll and it reverses frame-for-frame. Zero decoder hiccups.

Why this happens, briefly:

- The video approach has to ask the browser's video pipeline for a specific timestamp, wait for it to decode, then paint. This is async and the pipeline isn't optimized for tens of seeks per second.
- The frame approach is just `drawImage`. The frames are already decoded bitmaps in memory once preloading is done. There's nothing to wait for.

### Trade-off summary

| Concern | Video URL | Frame sequence |
| --- | --- | --- |
| Scroll smoothness | Decent on desktop, jittery on Safari/iOS | Buttery, identical on all browsers |
| Initial download | Small (~few hundred KB) | Larger (~10 MB here) |
| Time to interactive | Fast (streams) | Waits for preload |
| Memory | Low | Higher |
| Best clip length | Long-form OK | Short loops (a few seconds) |
| Code complexity | Higher (needs seek debouncing) | Lower (one `drawImage` line) |

### Rule of thumb

- Short hero animation, smoothness matters → **frame sequence**.
- Long ambient background, want minimum bytes → **video URL**, and re-encode with `-g 1 -keyint_min 1` (every frame a keyframe, larger file but instant seeks).

---

## Run locally

Prerequisites: Node.js 18+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

- `/` — frame-sequence background. You'll see a `Loading… %` overlay until all 273 frames are cached, then scroll to scrub.
- `/about` — video-URL background. Loads streaming, no preload gate.

Build for production:

```bash
npm run build
npm run preview
```

---

## Project layout

```
src/
  App.tsx                       Router + DynamicBackground that picks Video or Frame by route
  components/
    FrameBackground.tsx         Canvas-based, 273-frame scroll scrubber
    VideoBackground.tsx         <video> + currentTime scroll scrubber
    Navbar.tsx
    Footer.tsx
  pages/
    Home.tsx                    Uses FrameBackground via App.tsx
    AboutUs.tsx                 Uses VideoBackground; also has its own pinned horizontal timeline via GSAP
public/
  home_plane/                   ezgif-frame-001.jpg … ezgif-frame-273.jpg
  fonts/                        Helvetica Neue webfonts
```

---

## Tech

- React 19 + React Router 7
- Vite 6
- Tailwind CSS v4
- GSAP 3 (with the `ScrollTrigger` plugin)
- TypeScript
