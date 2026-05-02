"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Spotlight definition ────────────────────────────────────────────────────
interface Spot {
  phaseX: number;
  phaseY: number;
  freqX: number;
  freqY: number;
  baseX: number;  // 0–1 normalized
  baseY: number;  // 0–1 normalized
  rangeX: number; // drift amplitude X
  rangeY: number; // drift amplitude Y
  r: number;
  g: number;
  b: number;
  alpha: number;  // peak opacity at center
  radius: number; // fraction of max(width, height)
}

// ─── Public props ─────────────────────────────────────────────────────────────
export interface HeroShaderBackgroundProps {
  /** 0.5 = slow, 1.0 = normal, 2.0 = fast. Defaults to 1.0 */
  animationSpeed?: number;
  /** Enable subtle pointer-following on desktop. Defaults to true */
  enableDesktopInteractivity?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroShaderBackground({
  animationSpeed = 1.0,
  enableDesktopInteractivity = true,
}: HeroShaderBackgroundProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const mouseX      = useRef(0.5);
  const mouseY      = useRef(0.5);
  const targetX     = useRef(0.5);
  const targetY     = useRef(0.5);
  const frameCount  = useRef(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    targetX.current = e.clientX / window.innerWidth;
    targetY.current = e.clientY / window.innerHeight;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      targetX.current = e.touches[0].clientX / window.innerWidth;
      targetY.current = e.touches[0].clientY / window.innerHeight;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Environment detection ────────────────────────────────────────────
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mobile = window.innerWidth < 768;

    // ── Canvas sizing ────────────────────────────────────────────────────
    const resize = () => {
      mobile = window.innerWidth < 768;
      // Render at 75% DPR on mobile for smooth 30fps
      const dpr = mobile ? 0.75 : Math.min(window.devicePixelRatio, 1.5);
      canvas.width  = Math.floor(window.innerWidth  * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();

    // ── Spotlight definitions ─────────────────────────────────────────────
    // 4 layers: primary navy | amber shadow | champagne accent | deep navy-light
    const spots: Spot[] = [
      // 0 — Primary warm navy, upper-center dominant beam
      {
        phaseX: 0,    phaseY: 0.6,
        freqX: 0.00058, freqY: 0.00044,
        baseX: 0.50,  baseY: 0.36,
        rangeX: 0.075, rangeY: 0.055,
        r: 212, g: 172, b: 55, alpha: 0.45, radius: 0.85,
      },
      // 1 — Muted amber, lower-left secondary
      {
        phaseX: 2.1,  phaseY: 1.5,
        freqX: 0.00042, freqY: 0.00067,
        baseX: 0.18,  baseY: 0.70,
        rangeX: 0.10,  rangeY: 0.075,
        r: 186, g: 138, b: 38, alpha: 0.28, radius: 0.70,
      },
      // 2 — Champagne/cream accent, upper-right
      {
        phaseX: 4.2,  phaseY: 3.1,
        freqX: 0.00051, freqY: 0.00039,
        baseX: 0.80,  baseY: 0.25,
        rangeX: 0.08,  rangeY: 0.06,
        r: 238, g: 218, b: 158, alpha: 0.20, radius: 0.60,
      },
      // 3 — Deep navy-light, lower-right for shadow depth richness
      {
        phaseX: 1.3,  phaseY: 3.5,
        freqX: 0.00034, freqY: 0.00049,
        baseX: 0.88,  baseY: 0.80,
        rangeX: 0.065, rangeY: 0.05,
        r: 12,  g: 70,  b: 86,  alpha: 0.25, radius: 0.65,
      },
    ];

    // ── Draw loop ────────────────────────────────────────────────────────
    const MOBILE_FRAME_SKIP = 2; // ~30 fps on mobile

    const draw = () => {
      frameCount.current++;

      // Frame-rate throttle on mobile
      if (mobile && frameCount.current % MOBILE_FRAME_SKIP !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const spd = reducedMotion ? 0 : animationSpeed;

      // Smooth mouse lerp — very restrained
      const lerpAmt = mobile ? 0.012 : 0.020;
      mouseX.current += (targetX.current - mouseX.current) * lerpAmt;
      mouseY.current += (targetY.current - mouseY.current) * lerpAmt;

      const w = canvas.width;
      const h = canvas.height;
      const D = Math.max(w, h);

      // Mouse/touch nudge (DRASTICALLY increased influence for visibility)
      const interactX = enableDesktopInteractivity
        ? (mouseX.current - 0.5) * (mobile ? 0.15 : 0.45)
        : 0;
      const interactY = enableDesktopInteractivity
        ? (mouseY.current - 0.5) * (mobile ? 0.12 : 0.35)
        : 0;

      // Clear to matte black
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, w, h);

      // Render spotlights
      spots.forEach((s) => {
        // Advance phase each frame
        s.phaseX += s.freqX * 16 * spd;
        s.phaseY += s.freqY * 16 * spd;

        const cx = (s.baseX + Math.sin(s.phaseX) * s.rangeX + interactX) * w;
        const cy = (s.baseY + Math.cos(s.phaseY) * s.rangeY + interactY) * h;
        const radius = D * s.radius;

        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grd.addColorStop(0,    `rgba(${s.r},${s.g},${s.b},${s.alpha})`);
        grd.addColorStop(0.20, `rgba(${s.r},${s.g},${s.b},${s.alpha * 0.55})`);
        grd.addColorStop(0.50, `rgba(${s.r},${s.g},${s.b},${s.alpha * 0.18})`);
        grd.addColorStop(0.80, `rgba(${s.r},${s.g},${s.b},${s.alpha * 0.04})`);
        grd.addColorStop(1,    `rgba(${s.r},${s.g},${s.b},0)`);

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      });

      // Deep editorial vignette (centred slightly above middle for headroom)
      const vy = h * 0.44;
      const vig = ctx.createRadialGradient(w / 2, vy, D * 0.18, w / 2, vy, D * 0.88);
      vig.addColorStop(0,    "rgba(0,0,0,0)");
      vig.addColorStop(0.52, "rgba(0,0,0,0.24)");
      vig.addColorStop(1,    "rgba(0,0,0,0.80)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      if (!reducedMotion) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    // Always draw at least one frame (static fallback for reduced-motion)
    draw();

    // ── Event listeners ──────────────────────────────────────────────────
    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    if (enableDesktopInteractivity) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    // Touch follow on mobile/tablet
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [animationSpeed, enableDesktopInteractivity, onMouseMove, onTouchMove]);

  return (
    <>
      {/* ── Shader canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ display: "block" }}
        aria-hidden="true"
      />

      {/* ── Film grain overlay — very subtle, above shader, below text ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: [
            "url(\"data:image/svg+xml,%3Csvg",
            " viewBox='0 0 200 200'",
            " xmlns='http://www.w3.org/2000/svg'%3E",
            "%3Cfilter id='g'%3E",
            "%3CfeTurbulence type='fractalNoise'",
            " baseFrequency='0.88'",
            " numOctaves='4'",
            " stitchTiles='stitch'/%3E",
            "%3C/filter%3E",
            "%3Crect width='100%25' height='100%25'",
            " filter='url(%23g)'/%3E",
            "%3C/svg%3E\")",
          ].join(""),
          backgroundSize: "180px 180px",
          opacity: 0.028,
          mixBlendMode: "overlay" as const,
        }}
      />
    </>
  );
}
