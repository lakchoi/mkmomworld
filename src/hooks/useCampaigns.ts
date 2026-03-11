import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Campaign {
  id: string;
  title: string;
  subtitle: string | null;
  question: string | null;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  items: string[];
  tags: string[];
  connections: string[];
  badge: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useCampaigns = (includeInactive = false) => {
  return useQuery({
    queryKey: ["campaigns", includeInactive],
    queryFn: async () => {
      let query = supabase
        .from("campaigns")
        .select("*")
        .order("display_order", { ascending: true });

      if (!includeInactive) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as Campaign[];
    },
  });
};
