import React, { createContext, useRef } from 'react'
import type { ReactNode, RefObject } from 'react';

type AllContextType = {
  homeRef: RefObject<HTMLDivElement | null>;
  aboutRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLDivElement | null>;
  workRef: RefObject<HTMLDivElement | null>;
};
export const allContext = createContext<AllContextType | null>(null);
const ContextProvider = ({children}:{children: ReactNode}) => {
   const homeRef=useRef<HTMLDivElement>(null) 
   const aboutRef=useRef<HTMLDivElement>(null) 
   const contactRef=useRef<HTMLDivElement>(null) 
   const workRef=useRef<HTMLDivElement>(null)
  return (
    <div>
        <allContext.Provider value={{homeRef, aboutRef, contactRef, workRef}}>
        {children}
        </allContext.Provider>
    </div>
  )
}

export default ContextProvider