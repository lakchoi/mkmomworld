import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Megaphone, Users } from "lucide-react";

const GoalsSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">MK MOMWORLD</h2>
            <p className="text-xl text-primary font-semibold mb-6">2000년대의 따뜻한 마음으로 함께하는 세상.</p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              과거의 순수함과 현재의 열정을 담아, 더 나은 미래를 함께 만들어갑니다.
              안전하고, 풍요롭고, 모두가 행복한 대한민국을 만드는 것.
              우리의 작은 행동 하나하나가 모여 큰 변화를 이끌어낼 것입니다.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:brightness-110 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              활동하기 <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <div className="grid gap-6">
            {[
              { icon: BookOpen, title: "배우고", desc: "4대 캠페인을 통해 시민이 배웁니다" },
              { icon: Users, title: "연결되고", desc: "안전동행으로 서로 연결됩니다" },
              { icon: Megaphone, title: "함께 움직이는", desc: "현장·캠페인·참여로 실행합니다" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-card border rounded-xl p-6 flex items-center gap-5 hover:border-primary/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
