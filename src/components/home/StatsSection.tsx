const TICKER_TEXTS = [
  "안전한 길, 걱정 없는 밤!",
  "범죄 제로 사회, 꿈이 현실로!",
  "건강한 먹거리, 믿을 수 있는 식탁!",
  "아이들의 밝은 미래!",
  "함께 만드는 공정한 사회!",
  "혼자가 아닌, 함께!",
];

const STATS = [
  { value: "99", unit: "명", label: "활성 회원" },
  { value: "100", unit: "대", label: "참여 지역" },
  { value: "100", unit: "%", label: "참여 의지" },
];

export function StatsSection() {
  const doubled = [...TICKER_TEXTS, ...TICKER_TEXTS];

  return (
    <>
      {/* 티커바 */}
      <div className="ticker-bar py-2.5 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap gap-16">
          {doubled.map((text, i) => (
            <span
              key={i}
              className="text-white font-medium text-sm flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 bg-white/70 rounded-full inline-block flex-shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* 통계 */}
      <section
        className="py-14 md:py-20"
        style={{ backgroundColor: "#1e293b" }}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-5xl md:text-6xl font-black mb-2 tabular-nums"
                  style={{ color: "#2dd4bf" }}
                >
                  {stat.value}
                  <span className="text-3xl md:text-4xl">{stat.unit}</span>
                </div>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
