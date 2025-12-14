import React, { useRef, useEffect } from 'react';
import { AppState, Particle } from '../types';
import { COLORS } from '../constants';

interface ParticleBackgroundProps {
  appState: AppState;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ appState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial population
    const particles: Particle[] = [];
    const count = 400; // Increased density for starry look
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.1, // Slower, majestic movement
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: 250 + Math.random() * 150, // Ring radius
        color: Math.random() > 0.7 ? COLORS.GOLD_LIGHT : COLORS.WHITE,
      });
    }
    particlesRef.current = particles;

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const render = () => {
      // Deep Blue/Black gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width);
      gradient.addColorStop(0, '#0b1026'); // Lighter center
      gradient.addColorStop(1, '#020617'); // Dark edges
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint constellation lines (IDLE only)
      if (appState === AppState.IDLE) {
         ctx.save();
         ctx.translate(centerX, centerY);
         ctx.rotate(Date.now() * 0.0001); // Slow full rotation of the sky
         ctx.translate(-centerX, -centerY);
      }

      particlesRef.current.forEach((p, index) => {
        // State Logic
        
        // 1. IDLE: Formation of a subtle Ring + Drift
        if (appState === AppState.IDLE) {
           // Gently pull some particles to a ring
           if (index % 2 === 0) {
              const targetX = centerX + Math.cos(p.orbitAngle) * p.orbitRadius!;
              const targetY = centerY + Math.sin(p.orbitAngle) * p.orbitRadius!;
              p.x += (targetX - p.x) * 0.01;
              p.y += (targetY - p.y) * 0.01;
              p.orbitAngle! += 0.0005; // Rotate ring
           } else {
              // Free drift
              p.x += p.vx;
              p.y += p.vy;
           }
        }
        
        // 2. SILENT: Focus
        else if (appState === AppState.SILENT_QUESTION) {
            const targetX = centerX + Math.cos(p.orbitAngle! + Date.now()*0.001) * 100;
            const targetY = centerY + Math.sin(p.orbitAngle! + Date.now()*0.001) * 100;
            p.x += (targetX - p.x) * 0.03;
            p.y += (targetY - p.y) * 0.03;
        }

        // 3. RITUAL: Scatter outward slightly
        else if (appState === AppState.RITUAL_SELECTION) {
             p.x += p.vx * 2;
             p.y += p.vy * 2;
        }

        // 4. TRANSITION: Hyperdrive
        else if (appState === AppState.TRANSITION) {
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const dist = Math.sqrt(dx*dx + dy*dy) || 1;
            p.x += (dx/dist) * 10;
            p.y += (dy/dist) * 10;
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                p.x = centerX;
                p.y = centerY;
            }
        }

        // 5. REVELATION: Gentle Ambience
        else if (appState === AppState.REVELATION) {
             p.x += p.vx;
             p.y += p.vy;
        }

        // Wrap
        if (appState !== AppState.TRANSITION) {
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        }

        // Draw Particle
        ctx.beginPath();
        const size = p.size * (Math.random() > 0.95 ? 1.5 : 1); // Random twinkle size
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        
        // Alpha twinkle
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(Date.now() * 0.005 + index));
        ctx.fillStyle = `${p.color}${alpha})`;
        
        // Glow for larger stars
        if (p.size > 1.5) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#fcd34d'; // Amber glow
        } else {
            ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });
      
      if (appState === AppState.IDLE) {
        ctx.restore();
      }

      frameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(frameIdRef.current);
  }, [appState]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default ParticleBackground;