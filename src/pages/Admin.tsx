import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  created_at: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
        return;
      }
      fetchSubmissions();
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin-login");
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("데이터 로딩 실패");
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">참여신청 관리</h1>
          <div className="flex gap-2">
            <button onClick={fetchSubmissions} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors">
              <LogOut className="w-4 h-4" /> 로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <p className="text-sm text-muted-foreground mb-4">총 {submissions.length}건</p>

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
      </main>
    </div>
  );
};

export default Admin;
