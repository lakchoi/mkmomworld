import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SubjectsSection from "@/components/SubjectsSection";
import PlatformSection from "@/components/PlatformSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SubjectsSection />
      <PlatformSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
