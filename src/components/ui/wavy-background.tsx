"use client";
import { cn } from "../../utils/cn";
import React, { useEffect, useRef, useState, ReactNode } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 10,
    speed = "fast",
    waveOpacity = 0.5,
    ...props
}: {
    children?: ReactNode;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
    [key: string]: any;
}) => {
    const noise = createNoise3D();
    let canvasRef = useRef<HTMLCanvasElement>(null);

    const getSpeed = () => {
        switch (speed) {
            case "slow":
                return 0.001;
            case "fast":
                return 0.002;
            default:
                return 0.001;
        }
    };

    const init = () => {
        let canvas = canvasRef.current;
        if (!canvas) return;

        // Optimizations:
        const dpr = Math.min(window.devicePixelRatio, 1); // Cap DPR at 1 to prevent lag on 4K/Retina
        let ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let w = (ctx.canvas.width = window.innerWidth * dpr);
        let h = (ctx.canvas.height = window.innerHeight * dpr);
        ctx.scale(dpr, dpr);

        let nt = 0;

        // Responsive Settings
        const isMobile = window.innerWidth < 768;
        const waveYOffset = isMobile ? 0.5 : 0.75;
        const waveAmplitude = isMobile ? 100 : 200;
        const speedMultiplier = isMobile ? 0.5 : 1.5;

        const waveColors = colors ?? [
            "#38bdf8",
            "#818cf8",
            "#c084fc",
            "#e879f9",
            "#22d3ee",
        ];

        const drawWave = (n: number) => {
            nt += getSpeed() * speedMultiplier;
            for (let i = 0; i < n; i++) {
                ctx!.beginPath();
                ctx!.lineWidth = (waveWidth || 50);
                ctx!.strokeStyle = waveColors[i % waveColors.length]; // Removed .slice to avoid GC

                // HEAVY OPTIMIZATION: Step 20 instead of 10. 
                // Since we blur it, the lack of detail is invisible but performance doubles.
                for (let x = 0; x < w / dpr; x += 20) {
                    var y = noise(x / 600, 0.3 * i, nt) * waveAmplitude;
                    ctx!.lineTo(x, y + (h / dpr) * waveYOffset);
                }
                ctx!.stroke();
                ctx!.closePath();
            }
        };

        let animationId: number;
        let isRunning = false;

        const render = () => {
            if (!isRunning) return; // Stop if paused
            ctx!.fillStyle = backgroundFill || "black";
            ctx!.globalAlpha = waveOpacity || 0.5;
            ctx!.fillRect(0, 0, w / dpr, h / dpr);
            // Limit waves to 3 instead of 5 for 60fps lock
            drawWave(3);
            animationId = requestAnimationFrame(render);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!isRunning) {
                        isRunning = true;
                        render();
                    }
                } else {
                    isRunning = false;
                    cancelAnimationFrame(animationId);
                }
            },
            { threshold: 0 }
        );

        if (canvas) observer.observe(canvas);

        const handleResize = () => {
            w = ctx.canvas.width = window.innerWidth * dpr;
            h = ctx.canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            isRunning = false;
            cancelAnimationFrame(animationId);
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
        };
    };

    useEffect(() => {
        const cleanup = init();
        return () => cleanup && cleanup();
    }, [blur, speed, waveOpacity]);

    return (
        <div
            className={cn(
                "h-screen flex flex-col items-center justify-center",
                containerClassName
            )}
        >
            <canvas
                className="absolute inset-0 z-0"
                ref={canvasRef}
                id="canvas"
                style={{
                    filter: `blur(${blur}px)`,
                    transform: 'translate3d(0,0,0)', // GPU Force
                    width: '100%',
                    height: '100%'
                }}
            ></canvas>
            <div className={cn("relative z-10", className)} {...props}>
                {children}
            </div>
        </div>
    );
};
