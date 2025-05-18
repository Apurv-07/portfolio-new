import React from 'react'

const ProjectCard = ({name, stack, about}: {name: string, stack: string[], about: string}) => {
    return (
        <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-lg w-[300px] shadow shadow-white min-h-[400px]">
            <p>// Project: {name}</p>
            <pre className="whitespace-pre-wrap">
                <code>
                    {`function stack() {
  return [
    ${stack.map((call) => `"${call}"`).join(',\n    ')}
  ];
}`}
                </code>
            </pre>
            <p className="mt-2">// {about}</p>
        </div>

    )
}

export default ProjectCard