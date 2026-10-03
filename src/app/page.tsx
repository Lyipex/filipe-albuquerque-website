import Header from '@/components/Header';
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
      <Header />

      <main>
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
    </>
  );
}