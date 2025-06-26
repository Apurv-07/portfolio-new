import { forwardRef, useEffect, useState, type ForwardedRef } from 'react';
import { skills } from '../constants.ts/const';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = forwardRef<HTMLDivElement>((_props, ref: ForwardedRef<HTMLDivElement>) => {
    useEffect(() => { AOS.init({ once: false, mirror: true }); }, []);

    // Initialize stars for constellation & starfield
    const [stars] = useState(() =>
        Array.from({ length: 100 }).map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 0.7,
            z: Math.random() * window.innerWidth,
        }))
    );

    useEffect(() => {
        const canvas = document.getElementById('starfield-canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        const speed = 5;
        const maxDepth = w;
        class Star {
            x: number; y: number; z: number;
            constructor(s: { x: number; y: number; z: number; }) { this.x = s.x - w / 2; this.y = s.y - h / 2; this.z = s.z; }
            update() {
                this.z -= speed;
                if (this.z < 1) this.z = maxDepth;
            }
            draw() {
                const scale = maxDepth / this.z;
                const x = this.x * scale + w / 2;
                const y = this.y * scale + h / 2;
                const radius = (1 - this.z / maxDepth) * 2;
                ctx.beginPath();
                ctx.fillStyle = 'white';
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        const runningStars = stars.map(s => new Star(s));
        const draw = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(0, 0, w, h);
            runningStars.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);

        return () => window.removeEventListener('resize', resize);
    }, [stars]);

    return (
        <div ref={ref} className="relative mx-auto p-10 text-white overflow-hidden">
            {/* Cosmic gradient & noise */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black to-gray-900" />
            <div className="absolute inset-0 -z-20 bg-noise opacity-5" />

            {/* Starfield Canvas */}
            <canvas id="starfield-canvas" className="absolute inset-0 -z-10" />
            <div className='max-w-[1440px] mx-auto'>
                <h1 className="relative text-4xl font-medium mb-5" data-aos="zoom-in-up">
                    <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-300 bg-clip-text text-transparent">
                        About Me
                    </span>
                </h1>
                <p className="mb-10 text-lg leading-relaxed" data-aos="fade-up">
                    Passionate Full Stack Developer with 2+ years in crafting scalable web applications...
                </p>

                <h2 className="relative text-4xl font-medium mb-6" data-aos="fade-down">
                    My Skills
                </h2>
            </div>
            <div className="flex flex-wrap gap-10 mx-auto pb-5 max-w-[1440px] justify-center">
                {skills.map((skill, idx) => (
                    <div key={idx} data-aos={idx % 2 ? 'fade-right' : 'fade-left'}
                        className="relative bg-gray-800 rounded-xl overflow-hidden transform transition-transform hover:-translate-y-2 duration-500 h-20 w-20"
                    >
                        <img src={skill.url} alt={skill.name} className="object-contain p-4" />
                        <p className="text-center pb-4">{skill.name}</p>
                        <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default About;

