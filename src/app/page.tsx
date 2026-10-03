import Header from '@/components/Header';
import MotionLayer from '@/components/MotionLayer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FeaturedProject from '@/components/FeaturedProject';
import About from '@/components/About';
import Method from "@/components/Method";
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

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
        <Services />
        <FeaturedProject />
        <About/>
        <Method/>
        <Process />
        <FAQ/>
        <ContactCTA />
      </main>

      <Footer />
      <MotionLayer />
    </>
  );
}