import { Navbar, Footer } from "@/features";
import {
  Hero,
  Occasions,
  HowItWorks,
  Experience,
  Gallery,
  Complements,
  Contact
} from "@/features/landing";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Occasions />
      <HowItWorks />
      <Experience />
      <Complements />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}