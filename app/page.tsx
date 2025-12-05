import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Treatment } from "@/components/Treatment";
import { Facilities } from "@/components/Facilities";
import { Housing } from "@/components/Housing";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Treatment />
        <Facilities />
        <Housing />
        <WhatWeOffer />
      </main>
      <Footer />
    </>
  );
}
