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
        let ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (ctx.canvas.width = window.innerWidth);
        let h = (ctx.canvas.height = window.innerHeight);
        ctx.filter = `blur(${blur}px)`;
        let nt = 0;

        // Responsive Settings
        const isMobile = window.innerWidth < 768;
        const waveYOffset = isMobile ? 0.5 : 0.75; // Lower on PC (0.75) to hit button
        const waveAmplitude = isMobile ? 100 : 200; // Move more on PC
        const speedMultiplier = isMobile ? 1 : 2;   // Faster on PC

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
                ctx!.lineWidth = waveWidth || 50;
                ctx!.strokeStyle = waveColors[i % waveColors.length];
                for (let x = 0; x < w; x += 5) {
                    var y = noise(x / 800, 0.3 * i, nt) * waveAmplitude;
                    ctx!.lineTo(x, y + h * waveYOffset);
                }
                ctx!.stroke();
                ctx!.closePath();
            }
        };

        let animationId: number;
        const render = () => {
            ctx!.fillStyle = backgroundFill || "black";
            ctx!.globalAlpha = waveOpacity || 0.5;
            ctx!.fillRect(0, 0, w, h);
            drawWave(5);
            animationId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            w = ctx.canvas.width = window.innerWidth;
            h = ctx.canvas.height = window.innerHeight;
            ctx.filter = `blur(${blur}px)`;
            // Re-init on resize to catch layout shifts (though full re-run handled by effect)
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    };

    useEffect(() => {
        const cleanup = init();
        return () => cleanup && cleanup();
    }, [blur, speed, waveOpacity]);

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(
            typeof window !== "undefined" &&
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome")
        );
    }, []);

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
                    ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
                }}
            ></canvas>
            <div className={cn("relative z-10", className)} {...props}>
                {children}
            </div>
        </div>
    );
};
