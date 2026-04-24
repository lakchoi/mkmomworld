import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, RefreshCw, Plus, Trash2, Eye, EyeOff, ChevronDown, ChevronUp, Users, Megaphone, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  created_at: string;
}

interface Campaign {
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
}

interface Member {
  id: string;
  display_name: string | null;
  phone: string | null;
  consent_privacy: boolean | null;
  consent_notification: boolean | null;
  created_at: string | null;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"submissions" | "campaigns" | "members">("submissions");
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const emptyCampaign: Omit<Campaign, "id"> = {
    title: "",
    subtitle: "",
    question: "",
    description: "",
    image_url: "",
    icon: "Shield",
    items: [],
    tags: [],
    connections: [],
    badge: "",
    is_active: true,
    display_order: 0,
  };

  const [formData, setFormData] = useState<Omit<Campaign, "id">>(emptyCampaign);
  const [itemsText, setItemsText] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [connectionsText, setConnectionsText] = useState("");

  const ADMIN_EMAIL = "mk.momworld@gmail.com";

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin-login"); return; }
      if (session.user.email !== ADMIN_EMAIL) {
        toast.error("관리자 권한이 없습니다.");
        await supabase.auth.signOut();
        navigate("/");
        return;
      }
      fetchAll();
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin-login");
      else if (session.user.email !== ADMIN_EMAIL) navigate("/");
    });
    checkAuth();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchAll = async () => {
    setLoading(true);
    const [subRes, campRes, memRes] = await Promise.all([
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("campaigns").select("*").order("display_order", { ascending: true }),
      supabase.from("profiles").select("id, display_name, phone, consent_privacy, consent_notification, created_at").order("created_at", { ascending: false }),
    ]);
    if (subRes.error) toast.error("신청 데이터 로딩에 실패했습니다.");
    else setSubmissions(subRes.data || []);
    if (campRes.error) toast.error("캠페인 데이터 로딩에 실패했습니다.");
    else setCampaigns((campRes.data || []) as Campaign[]);
    if (memRes.error) toast.error("회원 데이터 로딩에 실패했습니다.");
    else setMembers((memRes.data || []) as Member[]);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });

  // Campaign form handlers
  const openNewCampaign = () => {
    setEditingCampaign(null);
    setFormData({ ...emptyCampaign, display_order: campaigns.length });
    setItemsText(""); setTagsText(""); setConnectionsText("");
    setShowForm(true);
  };

  const openEditCampaign = (c: Campaign) => {
    setEditingCampaign(c);
    setFormData({
      title: c.title, subtitle: c.subtitle || "", question: c.question || "",
      description: c.description || "", image_url: c.image_url || "", icon: c.icon || "Shield",
      items: c.items, tags: c.tags, connections: c.connections,
      badge: c.badge || "", is_active: c.is_active, display_order: c.display_order,
    });
    setItemsText((c.items || []).join("\n"));
    setTagsText((c.tags || []).join(", "));
    setConnectionsText((c.connections || []).join(", "));
    setShowForm(true);
  };

  const handleSaveCampaign = async () => {
    if (!formData.title.trim()) { toast.error("제목은 필수입니다."); return; }
    const payload = {
      ...formData,
      items: itemsText.split("\n").map(s => s.trim()).filter(Boolean),
      tags: tagsText.split(",").map(s => s.trim()).filter(Boolean),
      connections: connectionsText.split(",").map(s => s.trim()).filter(Boolean),
      updated_at: new Date().toISOString(),
    };
    if (editingCampaign) {
      const { error } = await supabase.from("campaigns").update(payload).eq("id", editingCampaign.id);
      if (error) toast.error("수정 실패: " + error.message);
      else { toast.success("캠페인 수정 완료"); setShowForm(false); fetchAll(); }
    } else {
      const { error } = await supabase.from("campaigns").insert(payload);
      if (error) toast.error("추가 실패: " + error.message);
      else { toast.success("캠페인 추가 완료"); setShowForm(false); fetchAll(); }
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("campaigns").delete().eq("id", id);
    if (error) toast.error("삭제 실패");
    else { toast.success("삭제 완료"); fetchAll(); }
  };

  const toggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase.from("campaigns").update({ is_active: !current, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error("변경 실패");
    else fetchAll();
  };

  const moveOrder = async (id: string, direction: "up" | "down") => {
    const idx = campaigns.findIndex(c => c.id === id);
    if ((direction === "up" && idx === 0) || (direction === "down" && idx === campaigns.length - 1)) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const a = campaigns[idx], b = campaigns[swapIdx];
    await Promise.all([
      supabase.from("campaigns").update({ display_order: b.display_order }).eq("id", a.id),
      supabase.from("campaigns").update({ display_order: a.display_order }).eq("id", b.id),
    ]);
    fetchAll();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm";

  const tabs = [
    { key: "submissions" as const, label: "참여신청", icon: Users, count: submissions.length },
    { key: "campaigns" as const, label: "캠페인", icon: Megaphone, count: campaigns.length },
    { key: "members" as const, label: "회원관리", icon: UserCheck, count: members.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">관리자 패널</h1>
          <div className="flex gap-2">
            <button onClick={fetchAll} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors">
              <LogOut className="w-4 h-4" /> 로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-6 pt-6">
        <div className="flex gap-2 border-b pb-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-6 py-6">
        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <>
            {loading ? (
              <p className="text-muted-foreground text-center py-12">로딩 중...</p>
            ) : submissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">아직 신청 내역이 없습니다.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-3 px-4 font-medium">이름</th>
                      <th className="py-3 px-4 font-medium">연락처</th>
                      <th className="py-3 px-4 font-medium">이메일</th>
                      <th className="py-3 px-4 font-medium">메시지</th>
                      <th className="py-3 px-4 font-medium">신청일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s) => (
                      <tr key={s.id} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 text-foreground font-medium whitespace-nowrap">{s.name}</td>
                        <td className="py-3 px-4 text-foreground whitespace-nowrap">{s.phone}</td>
                        <td className="py-3 px-4 text-foreground">{s.email || "-"}</td>
                        <td className="py-3 px-4 text-foreground max-w-xs truncate">{s.message || "-"}</td>
                        <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{formatDate(s.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <>
            <div className="flex justify-end mb-4">
              <button onClick={openNewCampaign} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold hover:brightness-110 transition-all">
                <Plus className="w-4 h-4" /> 캠페인 추가
              </button>
            </div>

            {showForm && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                <div className="bg-card border rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4" onClick={e => e.stopPropagation()}>
                  <h2 className="text-lg font-bold text-foreground">{editingCampaign ? "캠페인 수정" : "새 캠페인 추가"}</h2>
                  <input placeholder="제목 *" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} className={inputClass} />
                  <input placeholder="부제목 (영문)" value={formData.subtitle || ""} onChange={e => setFormData(p => ({ ...p, subtitle: e.target.value }))} className={inputClass} />
                  <input placeholder="핵심 질문" value={formData.question || ""} onChange={e => setFormData(p => ({ ...p, question: e.target.value }))} className={inputClass} />
                  <textarea placeholder="설명" rows={3} value={formData.description || ""} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} className={`${inputClass} resize-none`} />
                  <input placeholder="이미지 URL" value={formData.image_url || ""} onChange={e => setFormData(p => ({ ...p, image_url: e.target.value }))} className={inputClass} />
                  <select value={formData.icon || "Shield"} onChange={e => setFormData(p => ({ ...p, icon: e.target.value }))} className={inputClass}>
                    <option value="Shield">Shield (치안)</option>
                    <option value="Apple">Apple (먹거리)</option>
                    <option value="Leaf">Leaf (환경)</option>
                    <option value="Handshake">Handshake (사회경제)</option>
                    <option value="HeartHandshake">HeartHandshake (병원동행)</option>
                    <option value="Heart">Heart</option>
                    <option value="Star">Star</option>
                  </select>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">항목 (줄바꿈으로 구분)</label>
                    <textarea rows={4} value={itemsText} onChange={e => setItemsText(e.target.value)} className={`${inputClass} resize-none`} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">태그 (쉼표로 구분)</label>
                    <input value={tagsText} onChange={e => setTagsText(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">연결 활동 (쉼표로 구분)</label>
                    <input value={connectionsText} onChange={e => setConnectionsText(e.target.value)} className={inputClass} />
                  </div>
                  <input placeholder="배지 텍스트" value={formData.badge || ""} onChange={e => setFormData(p => ({ ...p, badge: e.target.value }))} className={inputClass} />
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={formData.is_active} onChange={e => setFormData(p => ({ ...p, is_active: e.target.checked }))} className="accent-primary" />
                    <span className="text-sm text-foreground">메인페이지에 표시</span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSaveCampaign} className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:brightness-110 transition-all">
                      {editingCampaign ? "수정" : "추가"}
                    </button>
                    <button onClick={() => setShowForm(false)} className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-xl font-bold hover:brightness-90 transition-all">
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <p className="text-muted-foreground text-center py-12">로딩 중...</p>
            ) : campaigns.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">등록된 캠페인이 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {campaigns.map((c, idx) => (
                  <div key={c.id} className={`border rounded-xl p-4 flex items-center gap-4 transition-colors ${c.is_active ? "bg-card" : "bg-secondary/50 opacity-60"}`}>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveOrder(c.id, "up")} disabled={idx === 0} className="p-1 hover:bg-secondary rounded disabled:opacity-30">
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button onClick={() => moveOrder(c.id, "down")} disabled={idx === campaigns.length - 1} className="p-1 hover:bg-secondary rounded disabled:opacity-30">
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground">{c.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">{c.subtitle} · {c.badge}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleActive(c.id, c.is_active)} className="p-2 rounded-lg hover:bg-secondary transition-colors" title={c.is_active ? "비활성화" : "활성화"}>
                        {c.is_active ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                      </button>
                      <button onClick={() => openEditCampaign(c)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-foreground hover:brightness-110 transition-all">
                        편집
                      </button>
                      <button onClick={() => handleDeleteCampaign(c.id)} className="p-2 rounded-lg hover:bg-destructive/20 transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <>
            {loading ? (
              <p className="text-muted-foreground text-center py-12">로딩 중...</p>
            ) : members.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">가입된 회원이 없습니다.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-3 px-4 font-medium">이름</th>
                      <th className="py-3 px-4 font-medium">연락처</th>
                      <th className="py-3 px-4 font-medium">개인정보 동의</th>
                      <th className="py-3 px-4 font-medium">알림 수신</th>
                      <th className="py-3 px-4 font-medium">가입일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m) => (
                      <tr key={m.id} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 text-foreground font-medium whitespace-nowrap">{m.display_name || "-"}</td>
                        <td className="py-3 px-4 text-foreground whitespace-nowrap">{m.phone || "-"}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${m.consent_privacy ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                            {m.consent_privacy ? "동의" : "미동의"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${m.consent_notification ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                            {m.consent_notification ? "동의" : "미동의"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{m.created_at ? formatDate(m.created_at) : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
