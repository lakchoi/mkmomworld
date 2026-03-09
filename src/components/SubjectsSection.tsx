import { motion } from "framer-motion";
import { Shield, Apple, Leaf, Handshake, HeartHandshake } from "lucide-react";
import campaignSafety from "@/assets/campaign-safety.png";
import campaignFood from "@/assets/campaign-food.png";
import campaignEnvironment from "@/assets/campaign-environment.png";
import campaignEconomy from "@/assets/campaign-economy.png";
import campaignHospital from "@/assets/campaign-hospital.png";

const campaigns = [
  {
    icon: Shield,
    title: "치안",
    subtitle: "Safety & Crime Prevention",
    question: "위험한 순간, 우리는 어떻게 서로를 돕는가?",
    image: campaignSafety,
    items: ["터치소리 이해와 활용", "위급 상황 대응", "범죄·유괴 예방 시민 행동", "보호자·아이 시나리오 교육"],
    connections: ["홍보단 활동", "체험 캠페인", "지역 연결"],
    badge: "맘월드의 핵심 뿌리 캠페인",
    tags: ["치안", "안전", "밤길", "귀가", "걱정제로"],
  },
  {
    icon: Apple,
    title: "먹거리",
    subtitle: "Food Safety",
    question: "가족이 먹는 건, 누가 어떻게 지키는가?",
    image: campaignFood,
    items: ["안심 먹거리 기준", "생산자 이야기", "소비자 선택 교육", "아이 먹거리 시민 감시"],
    connections: ["신뢰 생산자 캠페인", "체험형 콘텐츠", "캐릭터 스토리"],
    badge: "엄마·아빠 공감도 최고로 강한 캠페인",
    tags: ["먹거리", "안심", "건강", "신뢰", "안전"],
  },
  {
    icon: Leaf,
    title: "환경",
    subtitle: "Environment & Life",
    question: "아이의 미래 환경은 지금의 선택으로 만들어진다",
    image: campaignEnvironment,
    items: ["생활 속 환경 보호", "아이 눈높이 환경 교육", "지역 환경 캠페인", "일회용·유해환경 인식"],
    connections: ["가족 참여 캠페인", "학교·지역 연계", "캐릭터 미션형 활동"],
    badge: "아이 교육 + 가족 참여에 아주 좋음",
    tags: ["환경", "미래", "보호", "실천", "교육"],
  },
  {
    icon: Handshake,
    title: "사회경제",
    subtitle: "Community & Fair Economy",
    question: "착한 소비와 공정한 관계는 어떻게 연결되는가?",
    image: campaignEconomy,
    items: ["사회적 경제 이해", "협동조합·비영리 구조", "시민 소비자 역할", "지속 가능한 공동체"],
    connections: ["지역 상생 프로젝트", "기업 협력", "후원·참여 구조 이해"],
    badge: "어른용 사고 확장 캠페인",
    tags: ["청년", "미래", "희망", "꿈", "응원"],
  },
  {
    icon: HeartHandshake,
    title: "병원동행",
    subtitle: "Hospital Accompaniment",
    question: "혼자 병원에 갈 수 없는 이웃, 누가 함께 걸어줄 것인가?",
    image: campaignHospital,
    items: [
      "독거노인·장애인·1인 가구 병원 동행 지원",
      "집에서 출발 → 진료 → 귀가까지 원스톱 동행",
      "자원봉사자·동행매니저 연계 시스템",
      "의료 접근성 사각지대 해소 캠페인",
    ],
    connections: ["지역 자원봉사센터 연계", "지자체 동행서비스 협력", "시니어케어 네트워크"],
    badge: "고령화 시대, 가장 절실한 돌봄 캠페인",
    description: "우리 사회에는 거동이 불편하거나 혼자 병원을 가기 어려운 독거노인, 장애인, 1인 가구가 급증하고 있습니다. 경기도·인천 등 여러 지자체에서 '병원동행 서비스'를 시행하며, 요양보호사·자원봉사자가 집에서 출발해 진료 접수, 대기, 수납, 약국, 귀가까지 함께합니다. 하지만 아직 전국적으로 확대되지 못한 상황입니다. 맘월드는 시민 참여를 통해 병원동행 문화를 확산하고, 돌봄 공백을 채우는 데 앞장섭니다.",
    tags: ["병원동행", "돌봄", "독거노인", "자원봉사", "동행매니저"],
  },
];

const SubjectsSection = () => {
  return (
    <div id="campaigns">
      {campaigns.map((campaign, index) => {
        const Icon = campaign.icon;
        const reversed = index % 2 !== 0;

        return (
          <section
            key={campaign.title}
            className={`py-20 md:py-28 ${index % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="container mx-auto px-6">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 80 : -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className={reversed ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={campaign.image}
                      alt={`${campaign.title} 캠페인`}
                      className="relative w-full rounded-3xl shadow-2xl shadow-primary/20 group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold text-sm">
                      캠페인 {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: reversed ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={reversed ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-8 h-8 text-primary" />
                    <span className="text-primary font-bold text-sm tracking-widest uppercase">{campaign.subtitle}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">{campaign.title}</h2>

                  <div className="border-l-4 border-primary bg-primary/5 rounded-r-xl px-6 py-4 mb-6">
                    <p className="text-foreground font-semibold text-lg">"{campaign.question}"</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {campaign.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="flex items-center gap-3 text-foreground"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {campaign.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">안전동행 →</span>
                    {campaign.connections.map((conn) => (
                      <span key={conn} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                        {conn}
                      </span>
                    ))}
                  </div>

                  <p className="text-primary font-semibold text-sm">👉 {campaign.badge}</p>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default SubjectsSection;
