import { forwardRef, useEffect, useRef, useState, type ForwardedRef } from 'react';

const NUM_STARS = 20;

const Home = forwardRef<HTMLDivElement>((_props, ref: ForwardedRef<HTMLDivElement>) => {
    const demo = "IDENTITY: APURVA // FULL-STACK ENGINEER    ";
    const [title, setTitle] = useState('');
    const [num, setNum] = useState(0);

    // Typing effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (num <= demo.length) {
                setTitle(demo.slice(0, num));
                setNum(num + 1);
            } else {
                setNum(0);
            }
        }, 90);
        return () => clearTimeout(timer);
    }, [num]);

    // Comet cursor spark effect
    useEffect(() => {
        const cursor = document.createElement("div");
        cursor.className = "fixed w-2 h-2 rounded-full bg-yellow-400 opacity-90 pointer-events-none z-[9999] shadow-[0_0_8px_3px_rgba(255,200,50,0.7)]";
        cursor.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(cursor);

        const handleMouseMove = (e: MouseEvent) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            for (let i = 0; i < 2; i++) {
                const spark = document.createElement("div");
                const size = Math.random() * 2 + 1;
                spark.className = `fixed rounded-full pointer-events-none z-[9998] bg-white`;
                Object.assign(spark.style, {
                    top: `${e.clientY + (Math.random() - 0.5) * 6}px`,
                    left: `${e.clientX + (Math.random() - 0.5) * 6}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: "1",
                    transition: "opacity 0.5s, transform 0.5s",
                    transform: "scale(1)",
                    filter: "blur(1px)",
                });
                document.body.appendChild(spark);
                requestAnimationFrame(() => {
                    spark.style.opacity = "0";
                    spark.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px) scale(0)`;
                });
                setTimeout(() => spark.remove(), 500);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            cursor.remove();
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Shooting star effect
    useEffect(() => {
        const createFallingStar = () => {
            const star = document.createElement("div");
            star.className = "fixed bg-white rounded-full pointer-events-none z-[9997]";
            const size = Math.random() * 2 + 1;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight * 0.5;
            const length = Math.random() * 300 + 200;
            Object.assign(star.style, {
                top: `${startY}px`,
                left: `${startX}px`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: "0.8",
                transform: `translate(0, 0)`,
                transition: `transform 1s ease-out, opacity 1s ease-out`,
            });
            document.body.appendChild(star);
            requestAnimationFrame(() => {
                star.style.transform = `translate(${length}px, ${length}px)`;
                star.style.opacity = "0";
            });
            setTimeout(() => star.remove(), 1000);
        };

        const interval = setInterval(createFallingStar, Math.random() * 5000 + 3000);
        return () => clearInterval(interval);
    }, []);

    // 3D-style starfield with slow twinkling, no motion
    const stars = Array.from({ length: NUM_STARS }).map((_, i) => {
        const depth = Math.random();
        const style = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${0.5 + depth * 2}px`,
            height: `${0.5 + depth * 2}px`,
            opacity: `${0.2 + depth * 0.6}`,
            animationDuration: `${5 + Math.random() * 5}s`,
        };
        return <div key={i} className="absolute bg-white rounded-full animate-twinkle" style={style} />;
    });

    const tiltCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = tiltCardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / 10; // Tilt up/down
            const rotateY = (x - centerX) / 10;  // Tilt left/right

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);


    return (
        <div ref={ref} className="relative max-h-[900px] h-[110vh] w-full flex items-center justify-center px-8 bg-black text-white overflow-hidden">
            {/* Starfield */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="relative w-full h-full">{stars}</div>
            </div>

            <div className="absolute inset-0 pointer-events-none z-10 max-w-[1440px] mx-auto">
                {/* Planet 1 - Static with float */}
                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-800 to-indigo-400 animate-float top-[15%] left-[8%] shadow-[0_0_20px_rgba(100,100,255,0.5)]" />

                {/* Planet 2 - Static with float */}
                <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-pink-600 to-yellow-200 animate-float delay-500 top-[70%] left-[15%] shadow-[0_0_30px_rgba(255,150,200,0.5)]" />

                {/* Planet 3 - Saturn-like, orbiting around center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-orbit">
                    <div className="relative w-[100px] h-[100px]">
                        {/* Top half of ring */}
                        <div
                            className="absolute w-[190%] h-[190%] border-[30px] border-red-500 rounded-full box-border top-[-45%] left-[-50px] z-0"
                            style={{
                                transform: "rotate3d(0.8, 0.2, 0, 75deg)",
                                clipPath: "inset(0 0 50% 0)",
                            }}
                        />
                        {/* Planet */}
                        <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-green-900 via-lime-300 to-lime-100 shadow-[inset_-40px_-40px_80px_rgba(0,100,0,0.7)] shadow-green-900 z-10">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-l from-black/40 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                        {/* Bottom half of ring */}
                        <div
                            className="absolute w-[190%] h-[190%] border-[30px] border-red-500 rounded-full box-border top-[-45%] left-[-50px] z-20"
                            style={{
                                transform: "rotate3d(0.8, 0.2, 0, 75deg)",
                                clipPath: "inset(50% 0 0 0)",
                            }}
                        />
                    </div>
                </div>
            </div>


            {/* Glow and noise */}
            <div className="absolute inset-0 bg-[radial-gradient(#0ff2,#000)] opacity-10 pointer-events-none z-0" />
            <div className="absolute w-full h-full bg-noise opacity-[0.03] pointer-events-none z-0" />

            {/* Plasma rings */}
            <div className="absolute w-[400px] h-[400px] border-2 border-cyan-400 rounded-full animate-plasma z-0 top-[-50px] left-[-50px] blur-xl opacity-30"></div>
            <div className="absolute w-[500px] h-[500px] border-2 border-purple-500 rounded-full animate-plasma delay-1000 z-0 bottom-[-80px] right-[-80px] blur-xl opacity-20"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl animate-slideLeft">
                    <h1 className="text-3xl md:text-5xl font-mono font-bold text-cyan-400 tracking-widest leading-tight beam-text">
                        {title}<span className="beam-cursor ml-1">|</span>
                    </h1>
                    <p className="mt-6 text-gray-300 text-[17px] leading-relaxed animate-fadeIn">
                        Initiating sequence: bootstrapping neural code engine...
                        Crafting immersive UIs, optimizing backends, and bending logic into beauty.<br /><br />
                        Apurva isn’t a dev. He’s the system upgrade.
                    </p>
                    <a href="/apurvResumeNewLink.pdf" target="_blank" download className="mt-10 inline-block bg-cyan-600 px-6 py-2 rounded-lg font-medium neon-button hover:scale-105 transition-transform duration-300">
                        🚀 Resume Access Protocol
                    </a>
                </div>
                {/* <div className="relative w-[250px] h-[300px] group">
                    <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20 rounded-xl animate-pulse" />
                    <img src="/profile-2.png" alt="Apurva" className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                    <div className="absolute inset-0 border border-cyan-300 rounded-xl animate-scanline pointer-events-none" />
                </div> */}
                <div
                    className="relative w-[250px] h-[300px] [perspective:1000px] group [transform-style:preserve-3d] transition-transform duration-200 ease-linear"
                >
                    <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20 rounded-xl animate-pulse" />
                    <img
                        src="/profile-2.png"
                        alt="Apurva"
                        className="relative z-10 w-full h-full object-cover rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                    <div className="absolute inset-0 border border-cyan-300 rounded-xl animate-scanline pointer-events-none" />
                </div>

            </div>
        </div>
    );
});

export default Home;
