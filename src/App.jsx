import { useState } from 'react';
import { Cursor } from './components/Background';
import KineticGrid from './components/KineticGrid';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { About, Skills, Projects, Education, Contact, Footer } from './components/Sections';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Debug from './components/Debug';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      {new URLSearchParams(location.search).has('debug') && <Debug />}
      <KineticGrid globalColor="green" />
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
