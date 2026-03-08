import { motion } from "framer-motion";
import heroImage from "@/assets/hero-illustration.png";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              배우고 · 연결되고 · 함께 움직이는
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6">
              맘월드는<br />
              <span className="text-primary">4대 캠페인</span>을 통해<br />
              시민이 배우고,<br />
              함께 움직입니다
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              치안·먹거리·환경·사회경제 캠페인을 배우고,
              <strong className="text-foreground"> '안전동행'</strong>으로 함께 움직이는 실행 플랫폼입니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity text-base"
              >
                상담 신청하기
              </button>
              <button
                onClick={() => scrollTo("subjects")}
                className="border-2 border-primary text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary/5 transition-colors text-base"
              >
                자세히 보기
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <img src={heroImage} alt="맘월드 4과목 - 치안, 먹거리, 환경, 사회경제" className="w-full max-w-md lg:max-w-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
