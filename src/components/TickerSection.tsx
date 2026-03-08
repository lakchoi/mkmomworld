const TickerSection = () => {
  const items = [
    "안전한 길, 걱정 없는 밤!",
    "범죄 제로 사회, 꿈이 현실로!",
    "건강한 먹거리, 믿을 수 있는 식탁!",
    "아이들의 밝은 미래!",
    "함께 만드는 공정한 사회!",
  ];

  const repeated = [...items, ...items];

  return (
    <section className="py-6 bg-primary overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="text-primary-foreground font-bold text-sm mx-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary-foreground/50" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TickerSection;
