import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpen, Megaphone } from "lucide-react";

const PlatformSection = () => {
  return (
    <section id="platform" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold text-sm tracking-wide uppercase">Action Platform</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">안전동행</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            4대 캠페인은 교육·가치·콘텐츠 체계이고, 안전동행은 현장·캠페인·참여의 실행 플랫폼입니다
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-2xl border p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <span className="font-semibold text-foreground">배우고</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              <div className="flex items-center gap-3">
                <div className="bg-secondary/10 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <span className="font-semibold text-foreground">연결되고</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              <div className="flex items-center gap-3">
                <div className="bg-subject-environment/10 p-3 rounded-xl">
                  <Megaphone className="w-6 h-6 text-subject-environment" />
                </div>
                <span className="font-semibold text-foreground">함께 움직이는</span>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <p className="text-foreground font-medium text-center text-lg leading-relaxed">
                "맘월드는 치안·먹거리·환경·사회경제 4과목을 통해<br />
                시민이 배우고, <strong className="text-primary">'안전동행'</strong>으로 함께 움직이는 실행 플랫폼입니다."
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                "서로 겹치지 않는 체계",
                "엄마·아이·시민·기업 모두 포용",
                "학습–실행–확산 구조",
                "교육·자격 구조 확장 가능",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformSection;
