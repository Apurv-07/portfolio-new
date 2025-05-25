import { forwardRef } from 'react'
import ProjectCard from '../common/ProjectCard'
import { projects } from '../constants.ts/const'
import { FaArrowDownLong } from 'react-icons/fa6'

const Work = forwardRef<HTMLDivElement>((_props, ref) => {
    return (
        <div className='max-w-[1000px] mx-auto my-20'>
            <h1 className='text-[32px] max-md:mx-[100px] font-medium text-white mt-10 flex gap-2 items-center animate-[appearFromTop_1s_ease-in-out]'>Featured recent work <FaArrowDownLong /></h1>
            <div ref={ref} className='flex items-center justify-center'>
                <div className='grid grid-cols-2 max-md:grid-cols-1 mt-10 justify-center md:px-10 py-5 md:gap-10'>
                    {projects.map((project, index) => (
                        <div data-aos={index%2==0?"fade-left":"fade-right"} className={`${!(index % 2 === 0) ? 'flex flex-col items-end mt-[100px]' : 'flex flex-col items-start'} mx-5`} key={index}>
                            <ProjectCard {...project} />
                            <h2 className='font-medium text-white mt-5'>{project.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

export default Work