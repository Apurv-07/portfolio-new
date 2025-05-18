import React, { useContext, useState } from 'react'
import { allContext } from './ContextProvider'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'

const Nav = () => {
    const getAllRefs = useContext(allContext)!
    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        setIsMenuOpen(false)
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    return (
        <div className='relative flex justify-between bg-gradient-to-br from-black to-gray-600'>
            <img src="/logoAP.png" alt="logo" className='w-32' />
            <div className='flex items-center gap-8 pr-10 max-md:hidden'>
                <a onClick={() => scrollToSection(getAllRefs.homeRef)} className='text-white hover:text-gray-400 cursor-pointer'>Home</a>
                <a onClick={() => scrollToSection(getAllRefs.workRef)} className='text-white hover:text-gray-400 cursor-pointer'>Work</a>
                <a onClick={() => scrollToSection(getAllRefs.contactRef)} className='text-white hover:text-gray-400 cursor-pointer'>Contact</a>
                <a onClick={() => scrollToSection(getAllRefs.aboutRef)} className='text-white hover:text-gray-400 cursor-pointer'>About</a>
            </div>
            <button onClick={()=>setIsMenuOpen(!isMenuOpen)} className='flex items-center mr-10 text-white md:hidden'>{!isMenuOpen?<GiHamburgerMenu size={'60px'} />:<RxCross2 size={'60px'} />}</button>
            {isMenuOpen && <div className='w-full z-20 absolute top-[129px] left-0 md:hidden flex flex-col justify-center bg-black'>
                <a onClick={() => scrollToSection(getAllRefs.homeRef)} className='text-white text-[20px] py-4 text-center hover:text-gray-400 cursor-pointer'>Home</a>
                <hr className='bg-white'/>
                <a onClick={() => scrollToSection(getAllRefs.workRef)} className='text-white text-[20px] py-4 text-center hover:text-gray-400 cursor-pointer'>Work</a>
                <hr className='bg-white'/>
                <a onClick={() => scrollToSection(getAllRefs.contactRef)} className='text-white text-[20px] py-4 text-center hover:text-gray-400 cursor-pointer'>Contact</a>
                <hr className='bg-white'/>
                <a onClick={() => scrollToSection(getAllRefs.aboutRef)} className='text-white text-[20px] py-4 text-center hover:text-gray-400 cursor-pointer'>About</a>
            </div>}
        </div>
    )
}

export default Nav