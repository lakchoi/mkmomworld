import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Apple, Leaf, Handshake, HeartHandshake, Heart, Star } from "lucide-react";
import type { Campaign } from "@/hooks/useCampaigns";

import campaignSafety from "@/assets/campaign-safety.png";
import campaignFood from "@/assets/campaign-food.png";
import campaignEnvironment from "@/assets/campaign-environment.png";
import campaignEconomy from "@/assets/campaign-economy.png";
import campaignHospital from "@/assets/campaign-hospital.png";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Apple, Leaf, Handshake, HeartHandshake, Heart, Star,
};

const fallbackImages: Record<string, string> = {
  "\"터치소리\" 안심귀가": campaignSafety,
  "먹거리": campaignFood,
  "환경": campaignEnvironment,
  "사회경제": campaignEconomy,
  "병원동행": campaignHospital,
};

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: campaign, isLoading, error } = useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as Campaign;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">캠페인을 찾을 수 없습니다.</p>
        <button onClick={() => navigate("/")} className="text-primary font-bold hover:underline">홈으로 돌아가기</button>
      </div>
    );
  }

  const Icon = iconMap[campaign.icon || "Shield"] || Shield;
  const imageUrl = campaign.image_url?.startsWith("http")
    ? campaign.image_url
    : fallbackImages[campaign.title] || campaignSafety;

  const scrollToContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={imageUrl} alt={campaign.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute top-6 left-6 z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-background transition-colors">
            <ArrowLeft className="w-4 h-4" /> 뒤로가기
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Icon className="w-8 h-8 text-primary" />
              <span className="text-primary font-bold text-sm tracking-widest uppercase">{campaign.subtitle}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground">{campaign.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Question */}
          {campaign.question && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-l-4 border-primary bg-primary/5 rounded-r-xl px-8 py-6"
            >
              <p className="text-foreground font-semibold text-xl md:text-2xl">"{campaign.question}"</p>
            </motion.div>
          )}

          {/* Description */}
          {campaign.description && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-foreground leading-relaxed text-base md:text-lg">{campaign.description}</p>
            </motion.div>
          )}

          {/* Items */}
          {campaign.items && campaign.items.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-foreground mb-6">주요 활동</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {campaign.items.map((item: string, i: number) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 bg-card border rounded-xl p-4"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tags */}
          {campaign.tags && campaign.tags.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">키워드</h2>
              <div className="flex flex-wrap gap-2">
                {campaign.tags.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-primary/30 text-primary font-semibold text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Connections */}
          {campaign.connections && campaign.connections.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">연결 활동</h2>
              <div className="flex flex-wrap gap-3">
                {campaign.connections.map((conn: string) => (
                  <span key={conn} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm">
                    {conn}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Badge */}
          {campaign.badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-primary/10 border border-primary/30 rounded-2xl p-6 text-center"
            >
              <p className="text-primary font-bold text-lg">👉 {campaign.badge}</p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center pt-8"
          >
            <button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all"
            >
              이 캠페인에 참여하기
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
