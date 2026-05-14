import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 273;
const FRAME_BASE = '/home_plane/ezgif-frame-';

const frameUrl = (i: number) =>
  `${FRAME_BASE}${String(i).padStart(3, '0')}.jpg`;

export function FrameBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let cancelled = false;

    const handleOne = () => {
      if (cancelled) return;
      loadedCount += 1;
      setLoaded(loadedCount);
      if (loadedCount === TOTAL_FRAMES) setReady(true);
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = handleOne;
      img.onerror = handleOne;
      images.push(img);
    }
    framesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const firstFrame = framesRef.current[0];
    if (firstFrame && firstFrame.naturalWidth > 0) {
      canvas.width = firstFrame.naturalWidth;
      canvas.height = firstFrame.naturalHeight;
      ctx.drawImage(firstFrame, 0, 0);
    }

    const render = () => {
      const idx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrame.current)),
      );
      const img = framesRef.current[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        currentFrame.current = self.progress * (TOTAL_FRAMES - 1);
        render();
      },
    });

    return () => {
      st.kill();
    };
  }, [ready]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const moveX = (e.clientX / window.innerWidth) * 2 - 1;
      const moveY = (e.clientY / window.innerHeight) * 2 - 1;

      gsap.to(wrapperRef.current, {
        x: moveX * -30,
        y: moveY * -30,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const progress = Math.round((loaded / TOTAL_FRAMES) * 100);

  return (
    <>
      {!ready && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <p className="text-white text-2xl font-sans">
            Loading... {progress}%
          </p>
        </div>
      )}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover scale-[1.35]"
        />
      </div>
    </>
  );
}
