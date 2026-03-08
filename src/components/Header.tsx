import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";

const Header = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-7 h-7 text-primary" />
          <span className="text-lg font-bold text-foreground tracking-wide">MK MOMWORLD</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button onClick={() => scrollTo("dreams")} className="hover:text-primary transition-colors">우리의 꿈</button>
          <button onClick={() => scrollTo("campaigns")} className="hover:text-primary transition-colors">캠페인</button>
          <button onClick={() => scrollTo("faq")} className="hover:text-primary transition-colors">FAQ</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">참여하기</button>
        </nav>
        <button
          onClick={() => scrollTo("contact")}
          className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all flex items-center gap-2"
        >
          참여하기 <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
