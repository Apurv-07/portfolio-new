import React, { forwardRef } from 'react'

const Home = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className='flex flex-col items-center justify-center my-10 gap-10 z-10 px-5 md:flex-row'>
            <div className="flex flex-col">
                <h1 className='text-[32px] font-medium text-white max-w-[400px] leading-[50px]'>
                    Hi, I'm Apurva. A web developer based in India
                </h1>
                <ul className='mt-5'>
                    <li className='text-[16px] text-white max-w-[350px]'>I code not just to run the world, but to reinvent it. To break the rules, rewrite the script, and build a future that’s just a little brighter, a little smarter, and a lot more human.</li>
                    <li className='text-[16px] text-white max-w-[350px] mt-5'>Every project is a journey, every bug a challenge, and every line of code a step closer to something beautiful. I am a creator, a thinker, a dreamer — and my language is code.</li>
                </ul>
                <div className='mt-10'>
                    <a href="Untitled document.pdf" target="_blank" download="apurvResumeNewLink" className='text-[16px] bg-gray-500 text-white px-8 py-2 rounded-md hover:bg-gray-700'>
                        Download Resume
                    </a>
                </div>
            </div>
            <div className='relative h-[200px]'>
                <div style={{clipPath: "polygon(0 35%, 100% 54%, 76% 100%, 20% 100%)"}} className='bg-yellow-400 h-[200px] w-[200px]' />
                <img src="/profile-2.png" alt="profile" className='h-[240px] absolute top-0 left-0' />
            </div>
        </div>
    )
})

export default Home