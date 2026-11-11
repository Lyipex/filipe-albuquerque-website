import Header from '@/components/Header';
import MotionLayer from '@/components/MotionLayer';
import Hero from '@/components/Hero';
import FeaturedProject from '@/components/FeaturedProject';
import About from '@/components/About';
import Services from '@/components/Services';
import ServiceMotion from '@/components/ServiceMotion';
import ContactCTA from '@/components/ContactCTA';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.home}>
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
          <Services />
          <About />
        </main>
      </div>
      <ContactCTA />
      <MotionLayer />
      <ServiceMotion />
    </>
  );
}
