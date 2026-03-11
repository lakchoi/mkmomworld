import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, ArrowLeft, Save, Trash2 } from "lucide-react";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentNotification, setConsentNotification] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }

      setEmail(session.user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setDisplayName(profile.display_name || "");
        setPhone((profile as any).phone || "");
        setConsentPrivacy((profile as any).consent_privacy || false);
        setConsentNotification((profile as any).consent_notification || false);
      }
      setLoading(false);
    };
    load();
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/auth"); return; }

    const { error } = await supabase.from("profiles").update({
      display_name: displayName,
      phone,
      consent_privacy: consentPrivacy,
      consent_notification: consentNotification,
      updated_at: new Date().toISOString(),
    } as any).eq("id", session.user.id);

    if (error) toast.error("저장 실패: " + error.message);
    else toast.success("프로필이 업데이트되었습니다.");
    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Delete profile first, then sign out
    await supabase.from("profiles").delete().eq("id", session.user.id);
    await supabase.auth.signOut();
    toast.success("회원 탈퇴가 완료되었습니다.");
    navigate("/");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-7 h-7 text-destructive" />
            <span className="text-lg font-bold text-foreground">내 정보</span>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">이메일</label>
            <input value={email} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">이름</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={inputClass} maxLength={50} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">연락처</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" className={inputClass} maxLength={20} />
          </div>

          <div className="space-y-3 text-sm pt-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={consentPrivacy}
                onChange={(e) => setConsentPrivacy(e.target.checked)}
                className="accent-primary mt-0.5"
              />
              <span className="text-muted-foreground">개인정보 수집 및 이용 동의</span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={consentNotification}
                onChange={(e) => setConsentNotification(e.target.checked)}
                className="accent-primary mt-0.5"
              />
              <span className="text-muted-foreground">알림 수신 동의</span>
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-card border border-destructive/30 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-destructive">회원 탈퇴</h3>
          <p className="text-xs text-muted-foreground">탈퇴 시 모든 개인정보가 삭제되며 복구할 수 없습니다.</p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full border border-destructive text-destructive py-2.5 rounded-xl text-sm font-medium hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> 회원 탈퇴
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-destructive font-medium">정말 탈퇴하시겠습니까?</p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 bg-destructive text-destructive-foreground py-2.5 rounded-xl text-sm font-bold"
                >
                  확인
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-secondary text-secondary-foreground py-2.5 rounded-xl text-sm font-medium"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>

        <button onClick={() => navigate("/")} className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1">
          <ArrowLeft className="w-3 h-3" /> 홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default Profile;
