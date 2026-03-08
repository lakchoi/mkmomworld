import { motion } from "framer-motion";
import dreamSafety from "@/assets/dream-safety.jpg";
import dreamFood from "@/assets/dream-food.jpg";
import dreamFuture from "@/assets/dream-future.jpg";

const dreams = [
  {
    image: dreamSafety,
    title: "맘편한 거리",
    desc: "밤에도 걱정 없이 걸을 수 있는 거리를 만들기 위해 노력합니다.",
  },
  {
    image: dreamFood,
    title: "건강한 식탁",
    desc: "생산자와 소비자를 연결하여 믿고 먹는 먹거리를 만듭니다.",
  },
  {
    image: dreamFuture,
    title: "밝은 미래",
    desc: "미래를 향해 응원하는 희망찬 메시지를 전달합니다.",
  },
];

const DreamsSection = () => {
  return (
    <section id="dreams" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-foreground mb-16"
        >
          우리의 꿈 이야기
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-5">
                <img
                  src={dream.image}
                  alt={dream.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {dream.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{dream.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DreamsSection;
