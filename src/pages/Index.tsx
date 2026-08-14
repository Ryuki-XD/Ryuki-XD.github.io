import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WelcomeOverlay, { SEEN_KEY } from "@/components/WelcomeOverlay";

const Index = () => {
  /* The intro plays once per browser session, not on every navigation back. */
  const [showIntro, setShowIntro] = useState(
    () => sessionStorage.getItem(SEEN_KEY) !== "1",
  );

  const endIntro = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen">
      {showIntro && <WelcomeOverlay onDone={endIntro} />}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        {/* Code typing waits for the intro so the two do not compete. */}
        <Hero startCodeTyping={!showIntro} />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
