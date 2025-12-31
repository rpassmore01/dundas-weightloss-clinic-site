'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Testimonial from './Testimonial';

export default function TestimonialsCarousel({
  items = [],
  autoPlay = true,
  intervalMs = 5000,
  className = '',
}) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  // timer refs
  const timerRef = useRef(null);
  const nextAtRef = useRef(null);
  const remainingRef = useRef(null);

  const clamp = (i) => (i + count) % count;
  const go = (dir) => setIndex((i) => clamp(i + dir));
  const goTo = (i) => setIndex(clamp(i));

  const stop = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const schedule = (delay) => {
    stop();
    nextAtRef.current = Date.now() + delay;
    timerRef.current = setTimeout(() => {
      go(1);
      schedule(intervalMs); // chain next tick
    }, delay);
  };

  const pause = () => {
    if (!timerRef.current) return;
    const remaining = Math.max(0, nextAtRef.current - Date.now());
    remainingRef.current = remaining;
    stop();
  };

  const resume = () => {
    if (!autoPlay || count <= 1) return;
    const delay = remainingRef.current ?? intervalMs;
    remainingRef.current = null;
    schedule(delay);
  };

  // autoplay lifecycle
  useEffect(() => {
    if (autoPlay && count > 1) schedule(intervalMs);
    return stop; // cleanup
    // note: don't depend on index; we don't want to reset on every slide change
  }, [autoPlay, intervalMs, count]);

  // Pause when tab is hidden (avoids large jumps on return)
  useEffect(() => {
    const onVis = () => (document.hidden ? pause() : resume());
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (!items || count === 0)
    return null;

  return (
      <div
        className={`relative mx-auto w-full max-w-4xl ${className}`}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* Track */}
        <div
          className="relative overflow-hidden"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            pause();
            e.currentTarget.dataset.startX = e.clientX;
          }}
          onPointerUp={(e) => {
            const startX = Number(e.currentTarget.dataset.startX || 0);
            const dx = e.clientX - startX;
            if (dx < -80) go(1);
            else if (dx > 80) go(-1);
            resume();
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((t, i) => (
              <div key={i} className="shrink-0 grow-0 basis-full">
                <Testimonial {...t} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {count > 1 && (
          <>
            <button
              aria-label="Previous testimonial"
              onClick={() => { pause(); go(-1); resume(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => { pause(); go(1); resume(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {count > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => { pause(); goTo(i); resume(); }}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
        )}
      </div>
  );
}
