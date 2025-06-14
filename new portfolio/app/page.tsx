import Main from '@/components/sections/main';
import Metrics from '@/components/sections/metrics';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import AiShowcase from '@/components/sections/ai-showcase';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Main />
      <Metrics />
      <About />
      <Skills />
      <Projects />
      <AiShowcase />
      <Contact />
    </>
  );
}