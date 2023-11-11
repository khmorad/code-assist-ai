import React, { useEffect, useRef } from 'react';

const MovingDots: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    class Dot {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.radius = random(2, 4);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
      }

      move() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.speedX = -Math.abs(this.speedX);
        if (this.x < 0) this.speedX = Math.abs(this.speedX);
        if (this.y > canvas.height) this.speedY = -Math.abs(this.speedY);
        if (this.y < 0) this.speedY = Math.abs(this.speedY);
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = '#fff';
        context.fill();
      }
    }

    const numDots = 50;
    const dots: Dot[] = [];

    for (let i = 0; i < numDots; i++) {
      dots.push(new Dot());
    }

    const animate = () => {
      requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const dot of dots) {
        dot.move();
        dot.draw();
      }

      for (let i = 0; i < numDots - 1; i++) {
        for (let j = i + 1; j < numDots; j++) {
          const distanceX = dots[i].x - dots[j].x;
          const distanceY = dots[i].y - dots[j].y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (distance < 120) {
            context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(dots[i].x, dots[i].y);
            context.lineTo(dots[j].x, dots[j].y);
            context.stroke();
          }
        }
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <canvas ref={canvasRef} id="animation" style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default MovingDots;
