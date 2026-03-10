import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getGradeInfo } from "@/lib/grades";
import { UserRole } from "@prisma/client";

interface CampaignDetailProps {
  campaign: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string;
    thumbnailImage: string | null;
    bannerImage: string | null;
    images: string;
    startDate: Date | null;
    endDate: Date | null;
    maxParticipants: number | null;
    currentCount: number;
    requiredGrade: UserRole;
    tags: string;
    category: { name: string } | null;
    products: Array<{ id: string; name: string; basePrice: number; images: string; description: string; gradePrices: string; gradePointRates: string; }>;
    _count: { applications: number };
  };
}

const CAMPAIGN_ICONS: Record<string, string> = {
  "safety-campaign": "🛡️",
  "food-campaign": "🥗",
  "environment-campaign": "🌿",
  "social-economy-campaign": "📈",
  "hospital-companion-campaign": "🏥",
};

function parseDescription(text: string) {
  const sections: { heading: string; content: string; level: number }[] = [];
  const lines = text.split("\n");
  let currentHeading = "";
  let currentContent: string[] = [];
  let currentLevel = 0;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (currentHeading || currentContent.length) sections.push({ heading: currentHeading, content: currentContent.join("\n").trim(), level: currentLevel });
      currentHeading = line.replace("### ", "");
      currentContent = [];
      currentLevel = 3;
    } else if (line.startsWith("## ")) {
      if (currentHeading || currentContent.length) sections.push({ heading: currentHeading, content: currentContent.join("\n").trim(), level: currentLevel });
      currentHeading = line.replace("## ", "");
      currentContent = [];
      currentLevel = 2;
    } else {
      currentContent.push(line);
    }
  }
  if (currentHeading || currentContent.length) sections.push({ heading: currentHeading, content: currentContent.join("\n").trim(), level: currentLevel });
  return sections;
}

export function CampaignDetail({ campaign }: CampaignDetailProps) {
  const icon = CAMPAIGN_ICONS[campaign.slug] || "📢";
  const sections = parseDescription(campaign.description);

  return (
    <article>
      {/* Back */}
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#2dd4bf] transition-colors mb-8">
        <ChevronLeft size={16} /> 캠페인 목록으로
      </Link>

      {/* Banner */}
      <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-10 bg-[#ffffff]">
        {campaign.bannerImage || campaign.thumbnailImage ? (
          <img src={campaign.bannerImage || campaign.thumbnailImage || ""} alt={campaign.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl opacity-30">{icon}</div>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }} />
        <div className="absolute bottom-6 left-6 right-6">
          {campaign.category && (
            <span className="text-xs font-bold bg-[#ffffff]0 text-slate-800 px-3 py-1 rounded-full mb-3 inline-block">{campaign.category.name}</span>
          )}
          <h1 className="text-2xl md:text-4xl font-bold text-slate-800">{campaign.title}</h1>
          <p className="mt-2 text-sm text-slate-800/80">{campaign.summary}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-3xl p-6 md:p-10 mb-8 border border-[#ccfbf1] shadow-sm">
        <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
          <span>{icon}</span> 캠페인 상세 안내
        </h2>
        <div className="space-y-7">
          {sections.map((section, i) => {
            if (!section.heading && !section.content) return null;
            return (
              <div key={i}>
                {section.heading && (
                  <h3 className={`font-bold mb-3 ${section.level === 2 ? "text-xl text-[#2dd4bf]" : "text-base text-stone-800"}`}>
                    {section.heading}
                  </h3>
                )}
                {section.content && (
                  <div className="text-sm text-slate-500 leading-relaxed">
                    {section.content.split("\n").map((line, j) => {
                      if (line.startsWith("- "))
                        return (
                          <div key={j} className="flex items-start gap-2 mb-1.5">
                            <span className="text-[#2dd4bf] flex-shrink-0 mt-0.5">▸</span>
                            <span>{line.replace("- ", "")}</span>
                          </div>
                        );
                      if (line.startsWith("**") && line.endsWith("**"))
                        return <p key={j} className="font-bold text-stone-800 text-base mb-2">{line.replace(/\*\*/g, "")}</p>;
                      if (line.startsWith("> "))
                        return (
                          <div key={j} className="pl-4 py-2 my-3 rounded-r-xl italic text-sm text-[#2dd4bf] border-l-4 border-[#2dd4bf]/50 bg-[#ffffff]">
                            {line.replace("> ", "")}
                          </div>
                        );
                      if (line.trim()) return <p key={j} className="mb-2">{line}</p>;
                      return <br key={j} />;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
