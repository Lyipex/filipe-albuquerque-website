import Header from '@/components/Header';
import MotionLayer from '@/components/MotionLayer';
import Hero from '@/components/Hero';
import FeaturedProject from '@/components/FeaturedProject';
import About from '@/components/About';
import ContactCTA from '@/components/ContactCTA';

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <Header />

      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <FeaturedProject />
        <About/>
        <ContactCTA />
      </main>
      <MotionLayer />
    </>
  );
}