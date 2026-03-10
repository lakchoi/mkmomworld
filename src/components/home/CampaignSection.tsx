import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnailImage: string | null;
  maxParticipants: number | null;
  currentCount: number;
  requiredGrade: string;
  tags: string;
  category: { name: string } | null;
  _count: { applications: number };
}

const CAMPAIGN_DATA: Record<
  string,
  {
    icon: string;
    title_kr: string;
    subtitle_en: string;
    question: string;
    badge: string;
    items: string[];
    connections: string[];
    tags: string[];
    accentColor: string;
    bgColor: string;
    fallbackImg: string;
  }
> = {
  "safety-campaign": {
    icon: "🛡️",
    title_kr: "치안",
    subtitle_en: "Safety & Crime Prevention",
    question: "위험한 순간, 우리는 어떻게 서로를 돕는가?",
    badge: "맘월드의 핵심 뿌리 캠페인",
    items: [
      "터치소리 이해와 활용",
      "위급 상황 대응",
      "범죄·유괴 예방 시민 행동",
      "보호자·아이 시나리오 교육",
    ],
    connections: ["홍보단 활동", "체험 캠페인", "지역 연결"],
    tags: ["치안", "안전", "밤길", "귀가", "걱정제로"],
    accentColor: "#2dd4bf",
    bgColor: "rgba(45,212,191,0.10)",
    fallbackImg:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80",
  },
  "food-campaign": {
    icon: "🥗",
    title_kr: "먹거리",
    subtitle_en: "Food Safety",
    question: "가족이 먹는 건, 누가 어떻게 지키는가?",
    badge: "엄마·아빠 공감도 최고로 강한 캠페인",
    items: [
      "안심 먹거리 기준",
      "생산자 이야기",
      "소비자 선택 교육",
      "아이 먹거리 시민 감시",
    ],
    connections: ["신뢰 생산자 캠페인", "체험형 콘텐츠", "캐릭터 스토리"],
    tags: ["먹거리", "안심", "건강", "신뢰", "안전"],
    accentColor: "#34d399",
    bgColor: "rgba(52,211,153,0.10)",
    fallbackImg:
      "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&auto=format&fit=crop&q=80",
  },
  "environment-campaign": {
    icon: "🌿",
    title_kr: "환경",
    subtitle_en: "Environment & Life",
    question: "아이의 미래 환경은 지금의 선택으로 만들어진다",
    badge: "아이 교육 + 가족 참여에 아주 좋음",
    items: [
      "생활 속 환경 보호",
      "아이 눈높이 환경 교육",
      "지역 환경 캠페인",
      "일회용·유해환경 인식",
    ],
    connections: ["가족 참여 캠페인", "학교·지역 연계", "캐릭터 미션형 활동"],
    tags: ["환경", "미래", "보호", "실천", "교육"],
    accentColor: "#38bdf8",
    bgColor: "rgba(56,189,248,0.10)",
    fallbackImg:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop&q=80",
  },
  "social-economy-campaign": {
    icon: "📈",
    title_kr: "사회경제",
    subtitle_en: "Community & Fair Economy",
    question: "착한 소비와 공정한 관계는 어떻게 연결되는가?",
    badge: "어른용 사고 확장 캠페인",
    items: [
      "사회적 경제 이해",
      "협동조합·비영리 구조",
      "시민 소비자 역할",
      "지속 가능한 공동체",
    ],
    connections: ["지역 상생 프로젝트", "기업 협력", "후원·참여 구조 이해"],
    tags: ["청년", "미래", "희망", "꿈", "응원"],
    accentColor: "#a78bfa",
    bgColor: "rgba(167,139,250,0.10)",
    fallbackImg:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&auto=format&fit=crop&q=80",
  },
  "hospital-companion-campaign": {
    icon: "🏥",
    title_kr: "병원동행",
    subtitle_en: "Hospital Accompaniment",
    question: "혼자 병원에 갈 수 없는 이웃, 누가 함께 걸어줄 것인가?",
    badge: "고령화 시대, 가장 절실한 돌봄 캠페인",
    items: [
      "독거노인·장애인·1인 가구 병원 동행 지원",
      "집에서 출발 → 진료 → 귀가까지 원스톱 동행",
      "자원봉사자·동행매니저 연계 시스템",
      "의료 접근성 사각지대 해소 캠페인",
    ],
    connections: [
      "지역 자원봉사센터 연계",
      "지자체 동행서비스 협력",
      "시니어케어 네트워크",
    ],
    tags: ["병원동행", "돌봄", "독거노인", "자원봉사", "동행매니저"],
    accentColor: "#fb7185",
    bgColor: "rgba(251,113,133,0.10)",
    fallbackImg:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80",
  },
};

export function CampaignSection({ campaigns }: { campaigns: Campaign[] }) {
  if (!campaigns.length) return null;

  return (
    <div id="campaigns" style={{ backgroundColor: "#1e293b" }}>
      {/* 캠페인 목록 */}
      {campaigns.map((campaign, index) => {
        const d = CAMPAIGN_DATA[campaign.slug] ?? {
          icon: "📢",
          title_kr: campaign.category?.name ?? "캠페인",
          subtitle_en: "Campaign",
          question: campaign.summary,
          badge: campaign.category?.name ?? "캠페인",
          items: [],
          connections: [],
          tags: [],
          accentColor: "#2dd4bf",
          bgColor: "rgba(45,212,191,0.10)",
          fallbackImg: "",
        };
        const num = String(index + 1).padStart(2, "0");

        return (
          <section
            key={campaign.id}
            id={`campaign-${index + 1}`}
            className="border-t"
            style={{
              borderColor: "#334155",
              backgroundColor: "#1e293b",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 md:py-20">
              {/* 항상 왼쪽 이미지 + 오른쪽 텍스트 */}
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* 왼쪽: 이미지 */}
                <div className="relative">
                  <Link href={`/campaigns/${campaign.slug}`} className="block">
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        border: `1px solid ${d.accentColor}30`,
                        boxShadow: `0 8px 40px rgba(0,0,0,0.30)`,
                      }}
                    >
                      {campaign.thumbnailImage ? (
                        <img
                          src={campaign.thumbnailImage}
                          alt={campaign.title}
                          className="w-full object-cover"
                          style={{ aspectRatio: "4/3" }}
                        />
                      ) : d.fallbackImg ? (
                        <img
                          src={d.fallbackImg}
                          alt={d.title_kr}
                          className="w-full object-cover"
                          style={{ aspectRatio: "4/3" }}
                        />
                      ) : (
                        <div
                          className="w-full flex flex-col items-center justify-center gap-4 py-20"
                          style={{
                            background: `linear-gradient(135deg, #1e293b 0%, ${d.bgColor.replace("0.10", "0.35")} 100%)`,
                          }}
                        >
                          <span className="text-8xl">{d.icon}</span>
                          <p className="font-black text-2xl" style={{ color: d.accentColor }}>
                            {d.title_kr}
                          </p>
                        </div>
                      )}
                      {/* 번호 배지 (좌상단) */}
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-lg font-bold text-sm"
                        style={{ backgroundColor: d.accentColor, color: "#0f172a" }}
                      >
                        {d.badge.length > 10 ? d.title_kr : d.badge}
                      </div>
                    </div>
                  </Link>
                </div>

                {/* 오른쪽: 텍스트 */}
                <div>
                  {/* 서브타이틀 */}
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2"
                    style={{ color: d.accentColor }}
                  >
                    <span className="w-5 h-0.5 rounded-full" style={{ backgroundColor: d.accentColor }} />
                    {d.subtitle_en}
                  </p>

                  {/* 제목 */}
                  <h3
                    className="text-2xl md:text-3xl font-extrabold mb-3 leading-snug"
                    style={{ color: "#f1f5f9" }}
                  >
                    {d.title_kr}
                  </h3>

                  {/* 핵심 질문 (왼쪽 테두리 강조) */}
                  <p
                    className="text-sm font-semibold mb-5 pl-3 border-l-2 leading-relaxed"
                    style={{ color: "#e2e8f0", borderColor: d.accentColor }}
                  >
                    {d.question}
                  </p>

                  {/* 주요 활동 */}
                  {d.items.length > 0 && (
                    <div className="mb-5">
                      <ul className="space-y-2">
                        {d.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm"
                            style={{ color: "#cbd5e1" }}
                          >
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: d.accentColor }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 연결 활동 태그 */}
                  {d.connections.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {d.connections.map((c, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-lg"
                          style={{
                            backgroundColor: d.bgColor,
                            color: d.accentColor,
                            border: `1px solid ${d.accentColor}25`,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 해시태그 */}
                  {d.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {d.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ color: "#64748b", backgroundColor: "#293548" }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 상세보기 버튼 */}
                  <Link
                    href={`/campaigns/${campaign.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                    style={{ color: d.accentColor }}
                  >
                    자세히 보기 <ArrowRight size={15} />
                  </Link>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* 하단 CTA */}
      <div
        className="border-t py-10"
        style={{ backgroundColor: "#253041", borderColor: "#334155" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-base" style={{ color: "#e2e8f0" }}>
            5대 캠페인 전체 보기
          </p>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-full transition-all hover:-translate-y-0.5 btn-primary"
          >
            캠페인 목록 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
