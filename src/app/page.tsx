import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FeaturedProject from '@/components/FeaturedProject';
import Process from '@/components/Process';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Services />
        <FeaturedProject />
        <Process />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}