import { motion } from "framer-motion";
import { Shield, Apple, Leaf, Handshake } from "lucide-react";
import campaignSafety from "@/assets/campaign-safety.png";
import campaignFood from "@/assets/campaign-food.png";
import campaignEnvironment from "@/assets/campaign-environment.png";
import campaignEconomy from "@/assets/campaign-economy.png";

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
    accentClass: "bg-subject-safety",
    accentTextClass: "text-subject-safety",
    accentBgLight: "bg-subject-safety/10",
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
    accentClass: "bg-subject-food",
    accentTextClass: "text-subject-food",
    accentBgLight: "bg-subject-food/10",
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
    accentClass: "bg-subject-environment",
    accentTextClass: "text-subject-environment",
    accentBgLight: "bg-subject-environment/10",
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
    accentClass: "bg-subject-economy",
    accentTextClass: "text-subject-economy",
    accentBgLight: "bg-subject-economy/10",
  },
];

const CampaignSection = ({
  campaign,
  index,
  reversed,
}: {
  campaign: (typeof campaigns)[0];
  index: number;
  reversed: boolean;
}) => {
  const Icon = campaign.icon;

  return (
    <section
      className={`relative py-20 md:py-28 overflow-hidden ${index % 2 === 0 ? "bg-background" : "bg-muted"}`}
    >
      <div className="container mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? "lg:direction-rtl" : ""}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${reversed ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative group">
              <div className={`absolute -inset-4 ${campaign.accentBgLight} rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
              <img
                src={campaign.image}
                alt={`${campaign.title} 캠페인`}
                className="relative w-full rounded-2xl shadow-xl group-hover:scale-[1.02] transition-transform duration-500"
              />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`absolute -bottom-4 ${reversed ? "-left-4" : "-right-4"} ${campaign.accentClass} text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg`}
              >
                캠페인 {String(index + 1).padStart(2, "0")}
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className={`${reversed ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-xl ${campaign.accentClass} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">{campaign.title}</h2>
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-6 tracking-wide">{campaign.subtitle}</p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className={`${campaign.accentBgLight} rounded-xl p-5 mb-8 border-l-4 ${campaign.accentClass.replace("bg-", "border-")}`}
            >
              <p className={`font-semibold ${campaign.accentTextClass} text-base`}>
                "{campaign.question}"
              </p>
            </motion.div>

            <div className="mb-6">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">캠페인 내용</p>
              <ul className="space-y-2.5">
                {campaign.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <span className={`w-2 h-2 rounded-full ${campaign.accentClass} shrink-0`} />
                    <span className="text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">안전동행 연결</p>
              <div className="flex flex-wrap gap-2">
                {campaign.connections.map((conn) => (
                  <span
                    key={conn}
                    className={`text-xs px-4 py-1.5 rounded-full ${campaign.accentBgLight} ${campaign.accentTextClass} font-semibold border ${campaign.accentClass.replace("bg-", "border-")}/20`}
                  >
                    {conn}
                  </span>
                ))}
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 ${campaign.accentBgLight} px-4 py-2 rounded-full`}>
              <span className="text-base">👉</span>
              <span className={`text-sm font-semibold ${campaign.accentTextClass}`}>{campaign.badge}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SubjectsSection = () => {
  return (
    <div id="subjects">
      {/* Section header */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-4"
            >
              4 Campaigns
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">맘월드 4대 캠페인</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              서로 겹치지 않는 4대 캠페인 체계로<br className="hidden sm:block" />
              엄마·아이·시민·기업 모두를 포용합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Campaign sections */}
      {campaigns.map((campaign, index) => (
        <CampaignSection
          key={campaign.title}
          campaign={campaign}
          index={index}
          reversed={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default SubjectsSection;
