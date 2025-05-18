import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaArrowUpLong } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 ">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <p className="text-sm text-center md:text-left">&copy; {new Date().getFullYear()} Apurva. All rights reserved.</p>

                <div className="flex gap-5 mt-4 md:mt-0">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white cursor-pointer">
                        <FaArrowUpLong size={20} />
                    </button>
                    <a href="https://github.com/Apurv-07/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaGithub size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/apurva-pr1-950-offi" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaLinkedin size={20} />
                    </a>
                    <a href="https://leetcode.com/u/Mr-Apurv/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <SiLeetcode size={20} />
                    </a>
                    <a href="mailto:apurv.pr1@gmail.com" className="hover:text-white">
                        <FaEnvelope size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
