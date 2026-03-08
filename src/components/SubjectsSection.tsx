import { motion } from "framer-motion";
import { Shield, Apple, Leaf, Handshake } from "lucide-react";

const subjects = [
  {
    icon: Shield,
    title: "치안",
    subtitle: "Safety & Crime Prevention",
    question: "위험한 순간, 우리는 어떻게 서로를 돕는가?",
    color: "subject-safety",
    items: ["터치소리 이해와 활용", "위급 상황 대응", "범죄·유괴 예방 시민 행동", "보호자·아이 시나리오 교육"],
    connections: ["홍보단 활동", "체험 캠페인", "지역 연결"],
    badge: "맘월드의 핵심 뿌리 과목",
  },
  {
    icon: Apple,
    title: "먹거리",
    subtitle: "Food Safety",
    question: "가족이 먹는 건, 누가 어떻게 지키는가?",
    color: "subject-food",
    items: ["안심 먹거리 기준", "생산자 이야기", "소비자 선택 교육", "아이 먹거리 시민 감시"],
    connections: ["신뢰 생산자 캠페인", "체험형 콘텐츠", "캐릭터 스토리"],
    badge: "엄마·아빠 공감도 최고로 강한 과목",
  },
  {
    icon: Leaf,
    title: "환경",
    subtitle: "Environment & Life",
    question: "아이의 미래 환경은 지금의 선택으로 만들어진다",
    color: "subject-environment",
    items: ["생활 속 환경 보호", "아이 눈높이 환경 교육", "지역 환경 캠페인", "일회용·유해환경 인식"],
    connections: ["가족 참여 캠페인", "학교·지역 연계", "캐릭터 미션형 활동"],
    badge: "아이 교육 + 가족 참여에 아주 좋음",
  },
  {
    icon: Handshake,
    title: "사회경제",
    subtitle: "Community & Fair Economy",
    question: "착한 소비와 공정한 관계는 어떻게 연결되는가?",
    color: "subject-economy",
    items: ["사회적 경제 이해", "협동조합·비영리 구조", "시민 소비자 역할", "지속 가능한 공동체"],
    connections: ["지역 상생 프로젝트", "기업 협력", "후원·참여 구조 이해"],
    badge: "어른용 사고 확장 과목",
  },
];

const colorMap: Record<string, string> = {
  "subject-safety": "bg-subject-safety",
  "subject-food": "bg-subject-food",
  "subject-environment": "bg-subject-environment",
  "subject-economy": "bg-subject-economy",
};

const textColorMap: Record<string, string> = {
  "subject-safety": "text-subject-safety",
  "subject-food": "text-subject-food",
  "subject-environment": "text-subject-environment",
  "subject-economy": "text-subject-economy",
};

const bgLightMap: Record<string, string> = {
  "subject-safety": "bg-subject-safety/10",
  "subject-food": "bg-subject-food/10",
  "subject-environment": "bg-subject-environment/10",
  "subject-economy": "bg-subject-economy/10",
};

const SubjectsSection = () => {
  return (
    <section id="subjects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wide uppercase">Education System</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">맘월드 4과목</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            서로 겹치지 않는 4과목 체계로 엄마·아이·시민·기업 모두를 포용합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl ${colorMap[subject.color]} flex items-center justify-center shrink-0`}>
                  <subject.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{subject.title}</h3>
                  <p className="text-sm text-muted-foreground">{subject.subtitle}</p>
                </div>
              </div>

              <div className={`${bgLightMap[subject.color]} rounded-xl p-4 mb-5`}>
                <p className={`text-sm font-medium ${textColorMap[subject.color]}`}>
                  💬 "{subject.question}"
                </p>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">교육 내용</p>
                <ul className="space-y-1.5">
                  {subject.items.map((item) => (
                    <li key={item} className="text-sm text-foreground flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${colorMap[subject.color]}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">안전동행 연결</p>
                <div className="flex flex-wrap gap-2">
                  {subject.connections.map((conn) => (
                    <span key={conn} className={`text-xs px-3 py-1 rounded-full ${bgLightMap[subject.color]} ${textColorMap[subject.color]} font-medium`}>
                      {conn}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">👉 {subject.badge}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
