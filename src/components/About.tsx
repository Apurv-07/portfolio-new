import { forwardRef } from 'react'
import { skills } from '../constants.ts/const'

const About = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className='max-w-[1200px] mx-auto p-10'>
        <h1 className='text-[32px] font-medium text-white'>About me</h1>
        <p className='text-[16px] text-white mt-5'>Full Stack Developer with 2+ years of experience in building and maintaining scalable web applications. Proficient in 
JavaScript frameworks like React.js, Next.js, and Angular, with backend expertise in Node.js and .NET Core. Skilled in 
RESTful API development, SQL/NoSQL databases, and working with ORMs like Mongoose and Prisma. Familiar with 
basic cloud concepts (AWS), and experienced in Agile environments, performance optimization, and writing clean, 
production-ready code. Passionate about continuous learning and staying up-to-date with industry trends.</p>
            <h1 className='text-[32px] font-medium text-white mt-10'>My skills</h1>
        <div className='flex items-center justify-center mt-10'>
        <div className='grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-10'>
            {skills.map((skill, index) => (
                <div className='bg-gray-400 md:w-[150px] w-[100px] rounded-xl' key={index}>
                    <img src={skill.url} alt={skill.name} className='w-full' />
                    <p className='text-[16px] text-white text-center'>{skill.name}</p>
                </div>
            ))}
        </div>
        </div>
    </div>
  )
})

export default About