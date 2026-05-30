import { Navbar, Footer } from "@/features";
import {
  Hero,
  Occasions,
  HowItWorks,
  Accesories,
  Testimonials,
  FAQSection,
  Contact
} from "@/features/landing";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Occasions />
      <HowItWorks />
      <Accesories />
      <Testimonials />
      <FAQSection />
      <Contact />
      <Footer />
    </main>
  );
}