import Threads from '@/components/Threads';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';

import Portfolio from '@/components/Portfolio';
import HowWeWork from '@/components/HowWeWork';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      <Header />
      <Hero />
      <About />
      <Portfolio />
      <HowWeWork />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
