import { useContext } from 'react'
import Nav from './common/Nav'
import Home from './components/Home'
import Work from './components/Work'
import ContextProvider, { allContext } from './common/ContextProvider'
import Contact from './components/Contact'
import About from './components/About'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Footer from './common/Footer'

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <ContextProvider>
      <Nav />
      <HomeWrapper />
      <WorkWrapper />
      <AboutWrapper />
      <ContactWrapper />
      <Footer />
      </ContextProvider>
    </div>
  )
}

const HomeWrapper = () => {
  const { homeRef, scrollPos } = useContext(allContext)!;
  return <Home ref={homeRef} scrollPos={scrollPos} />;
};
const ContactWrapper = () => {
  const { contactRef, scrollPos } = useContext(allContext)!;
  return <Contact ref={contactRef} scrollPos={scrollPos} />;
};
const AboutWrapper = () => {
  const { aboutRef, scrollPos } = useContext(allContext)!;
  return <About ref={aboutRef} scrollPos={scrollPos}/>;
};
const WorkWrapper = () => {
  const { workRef } = useContext(allContext)!;
  return <Work ref={workRef} />;
};

export default App
