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
  const { homeRef } = useContext(allContext)!;
  return <Home ref={homeRef} />;
};
const ContactWrapper = () => {
  const { contactRef } = useContext(allContext)!;
  return <Contact ref={contactRef} />;
};
const AboutWrapper = () => {
  const { aboutRef } = useContext(allContext)!;
  return <About ref={aboutRef} />;
};
const WorkWrapper = () => {
  const { workRef } = useContext(allContext)!;
  return <Work ref={workRef} />;
};

export default App
