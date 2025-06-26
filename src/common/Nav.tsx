import React, { useContext, useState } from 'react';
import { allContext } from './ContextProvider';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

const Nav = () => {
    const getAllRefs = useContext(allContext)!;
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        setIsMenuOpen(false);
        if (ref.current) {
            const yOffset = -180; // Adjust based on your navbar height
            const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };


    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 z-30 fixed  w-full border-b border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.4)] backdrop-blur-sm">
            <div className="sticky top-0 left-0 flex justify-between items-center max-w-[1440px] w-full mx-auto">
                {/* Logo with glow */}
                <img
                    src="/logoAP.png"
                    alt="logo"
                    className="w-32 hover:drop-shadow-[0_0_10px_cyan] transition duration-300"
                />

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10 pr-6 font-mono text-[20px] tracking-widest">
                    {['Home', 'Work', 'Contact', 'About'].map((section) => (
                        <a
                            key={section}
                            onClick={() => scrollToSection(getAllRefs[`${section.toLowerCase()}Ref` as keyof typeof getAllRefs] as React.RefObject<HTMLDivElement>)}
                            className="relative text-white cursor-pointer hover:text-cyan-400 transition duration-200 group"
                        >
                            <span className="relative z-10">{section}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Hamburger / Close icon */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center text-cyan-300 md:hidden z-40"
                >
                    {!isMenuOpen ? (
                        <GiHamburgerMenu size="40px" className="hover:scale-110 transition duration-300" />
                    ) : (
                        <RxCross2 size="40px" className="hover:scale-110 transition duration-300" />
                    )}
                </button>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="w-full absolute top-[80px] left-0 bg-black/95 border-t border-cyan-600/20 shadow-[0_0_40px_rgba(0,255,255,0.05)] z-30 animate-appearFromTop backdrop-blur-md">
                        {['Home', 'Work', 'Contact', 'About'].map((section, idx) => (
                            <React.Fragment key={section}>
                                <a
                                    onClick={() => scrollToSection(getAllRefs[`${section.toLowerCase()}Ref` as keyof typeof getAllRefs] as React.RefObject<HTMLDivElement>)}
                                    className="block text-white text-lg py-5 text-center font-mono tracking-widest hover:text-cyan-400 transition duration-200"
                                >
                                    {section}
                                </a>
                                {idx < 3 && <hr className="border-cyan-500/20 mx-20" />}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nav;
