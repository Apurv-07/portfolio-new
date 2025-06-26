import { forwardRef } from 'react';
import ProjectCard from '../common/ProjectCard';
import { projects } from '../constants.ts/const';
import { FaArrowDownLong } from 'react-icons/fa6';

const Work = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className="max-w-[1100px] mx-auto my-24 px-4 md:px-6">
      {/* Header */}
      <h1 className="text-[32px] md:text-[36px] font-bold text-white mt-10 flex items-center gap-3 animate-[appearFromTop_1s_ease-in-out]">
        <span className="tracking-wide relative before:absolute before:inset-0 before:animate-pulse before:bg-cyan-400/10 before:blur before:rounded-md">
          <span className="relative z-10">Featured Recent Work</span>
        </span>
        <FaArrowDownLong className="text-cyan-400 animate-bounce" />
      </h1>

      {/* Project Cards Grid */}
      <div ref={ref} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-16 place-items-center">
        {projects.map((project, index) => (
          <div
            key={index}
            data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
            className={`group relative w-full flex justify-center max-w-[480px] transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:-rotate-[0.5deg] perspective-[1000px]`}
          >
            {/* Inner 3D Card */}
            <div className="transform transition-transform duration-500 group-hover:rotate-x-[6deg] group-hover:-rotate-y-[4deg] group-hover:translate-y-[-5px] rounded-xl overflow-hidden">
              
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-cyan-400 transition duration-500 pointer-events-none z-20" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-sm animate-[shimmer_2s_infinite] z-10 pointer-events-none" />

              <ProjectCard {...project} />

              {/* Project name */}
              <h2 className="text-white font-semibold mt-4 text-lg px-2 text-center">{project.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Work;
