import { createContext, useRef } from 'react'
import type { ReactNode, RefObject } from 'react';
import { useScrollPos } from './CustomHooks';

type AllContextType = {
  scrollPos: number;
  homeRef: RefObject<HTMLDivElement | null>;
  aboutRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLDivElement | null>;
  workRef: RefObject<HTMLDivElement | null>;
};
export const allContext = createContext<AllContextType | null>(null);
const ContextProvider = ({children}:{children: ReactNode}) => {
   const pos=useScrollPos();
   const homeRef=useRef<HTMLDivElement>(null) 
   const aboutRef=useRef<HTMLDivElement>(null) 
   const contactRef=useRef<HTMLDivElement>(null) 
   const workRef=useRef<HTMLDivElement>(null)
   console.log(pos);
  return (
    <div>
        <allContext.Provider value={{homeRef, aboutRef, contactRef, workRef, scrollPos: pos}}>
        {children}
        </allContext.Provider>
    </div>
  )
}

export default ContextProvider