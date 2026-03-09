interface StatsSectionProps {
  userCount: number;
  campaignCount: number;
}

export function StatsSection({ userCount, campaignCount }: StatsSectionProps) {
  const stats = [
    { value: `${userCount}+`, label: "활성 회원", emoji: "👩‍👩‍👧‍👦" },
    { value: `${campaignCount}+`, label: "진행 캠페인", emoji: "📢" },
    { value: "50+", label: "파트너 브랜드", emoji: "🤝" },
    { value: "98%", label: "회원 만족도", emoji: "⭐" },
  ];

  return (
    <section className="py-10 bg-white border-y border-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-1">{stat.emoji}</div>
              <div className="text-2xl md:text-3xl font-bold text-stone-800">{stat.value}</div>
              <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
