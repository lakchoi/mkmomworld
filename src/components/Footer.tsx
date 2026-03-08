import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-background">
              MK<span className="text-primary">momworld</span>
            </span>
          </div>
          <p className="text-background/60 text-sm text-center">
            © 2026 MKmomworld. 배우고 · 연결되고 · 함께 움직이는 실행 플랫폼
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
