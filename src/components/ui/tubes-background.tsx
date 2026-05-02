"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Helper for random colors within our brand palette
const getRandomBrandColor = () => {
  const brandColors = ["#D4AF37", "#F5E6A0", "#A07C18", "#0F4C5C", "#FFFFFF", "#6B5010"];
  return brandColors[Math.floor(Math.random() * brandColors.length)];
};

const randomBrandColors = (count: number) => {
  return new Array(count).fill(0).map(() => getRandomBrandColor());
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Dynamically import the threejs-components tubes cursor
        // We use Function to hide the import from Webpack and prevent build errors on Vercel
        const loadModule = new Function("return import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')");
        const threejsModule = await loadModule();
        const TubesCursor = threejsModule.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#F5E6A0", "#D4AF37", "#0F4C5C"], // Nwee Gold and Teal
            lights: {
              intensity: 200,
              colors: ["#D4AF37", "#FFFFFF", "#A07C18", "#0F4C5C"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          if (app && app.resize) {
            app.resize();
          }
        };

        window.addEventListener('resize', handleResize);
        
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
        };

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    
    // Randomize colors on click using brand colors
    const colors = randomBrandColors(3);
    const lightsColors = randomBrandColors(4);
    
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={cn("absolute inset-0 w-full h-full overflow-hidden bg-background", className)}
      onClick={handleClick}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
