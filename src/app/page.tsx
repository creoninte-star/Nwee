import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-wrapper" className="relative bg-background text-text selection:bg-navy selection:text-background w-full overflow-clip origin-center will-change-transform">
        <Hero />
        <Services />
        <Process />
        <Work />
        <Footer />
      </main>
    </>
  );
}
