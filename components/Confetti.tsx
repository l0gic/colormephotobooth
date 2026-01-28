'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Confetti() {
  useEffect(() => {
    // Initial celebration burst - explosive and joyful!
    const end = Date.now() + 1500;

    const colors = [
      '#4F46E5', // indigo-600
      '#A855F7', // purple-500
      '#EC4899', // pink-500
      '#FBBF24', // amber-400
      '#3B82F6', // blue-500
      '#F43F5E', // rose-500
      '#FCD34D', // yellow-300
    ];

    (function frame() {
      // Launch confetti from both sides - DOUBLED for more impact!
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: colors,
        gravity: 0.8,
        drift: 1,
        ticks: 200,
        scalar: 1,
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: colors,
        gravity: 0.8,
        drift: -1,
        ticks: 200,
        scalar: 1,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // After the burst, create subtle falling confetti in the background - DOUBLED!
    setTimeout(() => {
      const duration = 12000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const subtleInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(subtleInterval);
          return;
        }

        const particleCount = 2;
        const spread = 50;

        confetti({
          particleCount,
          spread,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2,
          },
          colors: colors,
          gravity: 0.5,
          drift: randomInRange(-0.5, 0.5),
          ticks: 300,
          scalar: randomInRange(0.5, 0.8),
          colors: colors,
        });
      }, 150);
    }, 1600);

  }, []);

  return null;
}
