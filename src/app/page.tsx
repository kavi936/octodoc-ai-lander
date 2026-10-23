import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TheName } from "@/components/sections/TheName";
import { TwoFutures } from "@/components/sections/TwoFutures";
import { DocumentDemo } from "@/components/sections/DocumentDemo";
import { ClinicalDemo } from "@/components/sections/ClinicalDemo";
import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { WhyThisDomain } from "@/components/sections/WhyThisDomain";
import { Acquire } from "@/components/sections/Acquire";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <TheName />
        <TwoFutures />
        <DocumentDemo />
        <ClinicalDemo />
        <CapabilityMarquee />
        <WhyThisDomain />
        <Acquire />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
