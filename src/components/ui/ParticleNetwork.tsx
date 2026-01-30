import React, { useEffect, useRef } from 'react';

const ParticleNetwork: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        // Set explicit dimensions based on parent
        let w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        let h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

        // Track mouse relative to the viewport/canvas
        const mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseX: number;
            baseY: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.3; // Very slow drift
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5; // Small dots
                this.baseX = this.x;
                this.baseY = this.y;
            }

            update() {
                // Standard movement
                this.x += this.vx;
                this.y += this.vy;

                // Wall collision (bounce)
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;

                // Mouse Repulsion
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * 1.5; // Repulsion strength
                    const directionY = forceDirectionY * force * 1.5;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            // Calculate density: 1 particle per 9000 sq px (adjust for sparse look)
            const density = 9000;
            const particleCount = Math.floor((w * h) / density);

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const connectDistance = 120;

                    if (distance < connectDistance) {
                        ctx.beginPath();
                        // Fade out line as distance increases
                        const opacity = 1 - (distance / connectDistance);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (canvas.parentElement) {
                w = canvas.width = canvas.parentElement.clientWidth;
                h = canvas.height = canvas.parentElement.clientHeight;
            } else {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Adjust mouse coordinates if canvas is relative to viewport
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default ParticleNetwork;
