import { motion } from "framer-motion";
import { Shield, Apple, Leaf, Handshake, HeartHandshake, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "@/hooks/useCampaigns";

import campaignSafety from "@/assets/campaign-safety.png";
import campaignFood from "@/assets/campaign-food.png";
import campaignEnvironment from "@/assets/campaign-environment.png";
import campaignEconomy from "@/assets/campaign-economy.png";
import campaignHospital from "@/assets/campaign-hospital.png";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Apple, Leaf, Handshake, HeartHandshake, Heart, Star,
};

const fallbackImages: Record<string, string> = {
  "치안": campaignSafety,
  "먹거리": campaignFood,
  "환경": campaignEnvironment,
  "사회경제": campaignEconomy,
  "병원동행": campaignHospital,
};

const SubjectsSection = () => {
  const { data: campaigns = [], isLoading } = useCampaigns();
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <div id="campaigns">
      {campaigns.map((campaign, index) => {
        const Icon = iconMap[campaign.icon || "Shield"] || Shield;
        const reversed = index % 2 !== 0;
        const imageUrl = campaign.image_url?.startsWith("http")
          ? campaign.image_url
          : fallbackImages[campaign.title] || campaignSafety;

        return (
          <section
            key={campaign.id}
            className={`py-20 md:py-28 ${index % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 80 : -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className={reversed ? "lg:order-2" : "lg:order-1"}
                >
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => navigate(`/campaign/${campaign.id}`)}
                  >
                    <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-full aspect-[4/3] rounded-3xl shadow-2xl shadow-primary/20 group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden bg-card">
                      <img
                        src={imageUrl}
                        alt={`${campaign.title} 캠페인`}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold text-sm">
                        캠페인 {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </motion.div>

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

                  {campaign.description && (
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{campaign.description}</p>
                  )}

                  <ul className="space-y-3 mb-6">
                    {(campaign.items || []).map((item: string, i: number) => (
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
                    {(campaign.tags || []).map((tag: string) => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">안전동행 →</span>
                    {(campaign.connections || []).map((conn: string) => (
                      <span key={conn} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                        {conn}
                      </span>
                    ))}
                  </div>

                  {campaign.badge && <p className="text-primary font-semibold text-sm">👉 {campaign.badge}</p>}

                  <button
                    onClick={() => navigate(`/campaign/${campaign.id}`)}
                    className="mt-4 text-sm text-primary font-bold hover:underline"
                  >
                    자세히 보기 →
                  </button>
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
