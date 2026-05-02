"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Helper for random colors within our brand palette (INVERTED for CSS trick)
const getInverseBrandColor = () => {
  // Original: ["#0A2342", "#2B4C7E", "#343A40", "#2B4C7E", "#FFFFFF", "#6C757D"]
  // Inverted:
  const inverseColors = ["#f5dcbd", "#d4b381", "#cbc5bf", "#d4b381", "#000000", "#938a82"];
  return inverseColors[Math.floor(Math.random() * inverseColors.length)];
};

const randomInverseBrandColors = (count: number) => {
  return new Array(count).fill(0).map(() => getInverseBrandColor());
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
            colors: ["#d4b381", "#f5dcbd", "#d4b381"], // Inverted Navy 
            lights: {
              intensity: 200,
              colors: ["#f5dcbd", "#000000", "#cbc5bf", "#d4b381"]
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
    
    // Randomize colors on click using inverse brand colors
    const colors = randomInverseBrandColors(3);
    const lightsColors = randomInverseBrandColors(4);
    
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
        style={{ 
          touchAction: 'pan-y', 
          filter: 'invert(1)', 
          mixBlendMode: 'multiply',
          opacity: 0.8
        }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
