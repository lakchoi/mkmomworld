import { motion } from "framer-motion";
import actionImg from "@/assets/action-community.jpg";

const CallToAction = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={actionImg} alt="함께하는 활동" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-bold text-sm tracking-widest mb-4"
        >
          함께해요
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-foreground mb-6"
        >
          당신의 목소리가<br />중요합니다
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto"
        >
          작은 관심과 참여가 모여 큰 변화를 만듭니다. 지금 바로 MK MOMWORLD와 함께하세요!
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onClick={() => scrollTo("contact")}
          className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-base hover:brightness-110 hover:scale-105 transition-all duration-300"
        >
          참여하기
        </motion.button>
      </div>
    </section>
  );
};

export default CallToAction;
