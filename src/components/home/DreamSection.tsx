export function DreamSection() {
  const cards = [
    {
      img: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600&auto=format&fit=crop&q=80",
      title: "배우고",
      subtitle: "치안·먹거리·환경·사회경제 분야를 배웁니다.",
    },
    {
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
      title: "연결되고",
      subtitle: "안전동행으로 이웃과 따뜻하게 연결됩니다.",
    },
    {
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80",
      title: "함께 움직이는",
      subtitle: "현장·캠페인·참여로 세상을 바꿉니다.",
    },
  ];

  return (
    <section
      id="dream"
      className="py-16 md:py-20"
      style={{ backgroundColor: "#1e293b" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* 섹션 제목 */}
        <h2
          className="text-2xl md:text-3xl font-extrabold mb-8"
          style={{ color: "#f1f5f9" }}
        >
          우리의 꿈 이야기
        </h2>

        {/* 사진 3장 가로 배열 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div key={i} className="group">
              {/* 사진 */}
              <div
                className="relative rounded-2xl overflow-hidden mb-4"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* 살짝 어두운 오버레이 */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(15,25,39,0.5) 100%)",
                  }}
                />
              </div>

              {/* 제목 + 설명 */}
              <h3
                className="text-base font-extrabold mb-1"
                style={{ color: "#f1f5f9" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
