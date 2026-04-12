import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContentSection from "@/components/ContentSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import { LangProvider, useLang } from "@/components/LangContext";

const PageContent = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleNetwork />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        {t.sections.map((s, i) => (
          <ContentSection key={s.id} {...s} index={i} />
        ))}
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

const Index = () => (
  <LangProvider>
    <PageContent />
  </LangProvider>
);

export default Index;
