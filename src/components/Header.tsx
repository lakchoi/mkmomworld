import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Header = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-7 h-7 text-primary" />
          <span className="text-lg font-bold text-foreground">MK<span className="text-primary">momworld</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button onClick={() => scrollTo("subjects")} className="hover:text-primary transition-colors">4과목</button>
          <button onClick={() => scrollTo("platform")} className="hover:text-primary transition-colors">안전동행</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">상담신청</button>
        </nav>
        <button
          onClick={() => scrollTo("contact")}
          className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          상담신청
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
