import logo from "@/assets/mk-momworld-logo.png";

const Footer = () => {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="MK MOMWORLD 로고" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-lg font-bold text-foreground">MK MOMWORLD</span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            © 2026 MK MOMWORLD. 2000년대 감성, 함께하는 세상
          </p>
          <div className="text-muted-foreground text-sm">
            mk.momworld@gmail.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
