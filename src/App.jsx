import { useState } from 'react';
import { GridCanvas, Cursor } from './components/Background';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { About, Skills, Projects, Education, Contact, Footer } from './components/Sections';
import Experience from './components/Experience';
import Achievements from './components/Achievements';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <GridCanvas />
      <Cursor />
      <Nav showLogo={collapsed} />
      <Hero onCollapse={setCollapsed} />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
