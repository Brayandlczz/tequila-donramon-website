import { Navbar, Footer } from "@/features";
import {
  Hero,
  Occasions,
  HowItWorks,
  Experience,
  Products,
  Boxes,
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
      <Boxes />
      <Products />
      <Contact />
      <Footer />
    </main>
  );
}