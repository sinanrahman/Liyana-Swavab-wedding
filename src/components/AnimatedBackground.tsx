import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    let scrollOffset = 0;
    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.4;
    };
    window.addEventListener("scroll", handleScroll);

    // Optimization: Pre-render the particle glow
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, `rgba(212, 175, 55, 1)`);
    pGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.beginPath();
    pCtx.arc(32, 32, 32, 0, Math.PI * 2);
    pCtx.fill();

    const particles = Array.from({ length: 60 }, () => {
      const isForeground = Math.random() > 0.8;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: isForeground ? Math.random() * 4 + 2 : Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        a: isForeground ? Math.random() * 0.03 + 0.02 : Math.random() * 0.05 + 0.1,
        ap: Math.random() * 0.005 + 0.001,
        isForeground
      };
    });

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.ap;
        if (p.a > 0.15 || p.a < 0.1) p.ap *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        let parallaxFactor = p.isForeground ? 0.8 : 0.4;
        let drawY = (p.y - scrollOffset * parallaxFactor) % canvas.height;
        if (drawY < 0) drawY += canvas.height;

        ctx.globalAlpha = Math.max(0, p.a);
        const size = p.r * 16;
        ctx.drawImage(pCanvas, p.x - size / 2, drawY - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
