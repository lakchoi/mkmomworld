"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const FAQ_DATA = [
  {
    q: "이 프로젝트는 무엇인가요?",
    a: "2000년대의 따뜻한 마음으로 더 나은 세상을 만드는 시민 참여 프로젝트입니다.",
  },
  {
    q: "참여 목적은 무엇인가요?",
    a: "안전하고 행복한 사회를 만들고, 기본권을 지키기 위한 행동을 촉구합니다.",
  },
  {
    q: "어떤 입장을 가질 수 있나요?",
    a: "치안, 안전 걱정으로부터 아이들의 안전부터 미래, 노년 생활과 같은 삶의 질을 향상시킬 것을 기대합니다.",
  },
  {
    q: "누구나 참여 가능한가요?",
    a: "네, 아이들과 모든 사람의 안전한 세상과 안전한 식탁으로 젊고 건강한 노후 세상을 위하여 참여합니다.",
  },
  {
    q: "활동은 무엇입니까?",
    a: "공감대 형성, 정책 제안, 지역 사회 활동 등 다양한 참여가 있습니다.",
  },
  {
    q: "참여는 어떻게 하는 건가요?",
    a: "아래 참여 양식을 작성하시거나 이메일(mk.momworld@gmail.com)로 연락주세요.",
  },
];

const CTA_ITEMS = [
  {
    title: "캠페인 참여",
    desc: "5대 핵심 캠페인에 직접 참여하세요.",
  },
  {
    title: "홍보단 활동",
    desc: "지역 사회에 맘월드를 알려주세요.",
  },
  {
    title: "후원·협력",
    desc: "기업·단체 협력 문의는 이메일로.",
  },
];

export function CTASection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("이름과 연락처는 필수 입력입니다.");
      return;
    }
    setError("");
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "1px solid #334155",
    backgroundColor: "#1e293b",
    fontSize: "0.875rem",
    color: "#e2e8f0",
    outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <>
      {/* ── MK MOMWORLD CTA 섹션 ── */}
      <section
        className="py-16 md:py-20 border-t"
        style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* 왼쪽: 텍스트 + 버튼 */}
            <div>
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight"
                style={{ color: "#f1f5f9" }}
              >
                MK MOMWORLD
              </h2>
              <p
                className="text-base font-semibold mb-4 gradient-text"
              >
                2000년대 감성, 함께하는 세상
              </p>
              <p
                className="text-sm leading-relaxed mb-8 max-w-sm"
                style={{ color: "#94a3b8" }}
              >
                치안·먹거리·환경·사회경제·병원동행 5대 캠페인을 통해
                배우고, 연결되고, 함께 움직이는 시민 플랫폼입니다.
                지금 참여해 세상을 바꿔보세요.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#2dd4bf",
                  color: "#0f172a",
                  boxShadow: "0 4px 16px rgba(45,212,191,0.35)",
                }}
              >
                참여하기 <ArrowRight size={15} />
              </Link>
            </div>

            {/* 오른쪽: 3개 항목 */}
            <div className="space-y-3">
              {CTA_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl px-5 py-4 border"
                  style={{
                    backgroundColor: "#293548",
                    borderColor: "#334155",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ backgroundColor: "rgba(45,212,191,0.15)", color: "#2dd4bf" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-0.5" style={{ color: "#f1f5f9" }}>
                      {item.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 자주 묻는 질문 ── */}
      <section
        id="faq"
        className="py-14 md:py-18 border-t"
        style={{ backgroundColor: "#253041", borderColor: "#334155" }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div className="mb-8">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#2dd4bf" }}
            >
              [ 궁금한 내용 ]
            </span>
            <h2
              className="text-2xl md:text-3xl font-extrabold mt-2"
              style={{ color: "#f1f5f9" }}
            >
              자주 묻는 질문
            </h2>
          </div>

          <div className="space-y-2">
            {FAQ_DATA.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border cursor-pointer transition-all"
                style={{
                  borderColor: openFaq === i ? "#2dd4bf" : "#334155",
                  backgroundColor: openFaq === i ? "rgba(45,212,191,0.07)" : "#1e293b",
                }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <p className="text-sm font-semibold pr-4" style={{ color: "#e2e8f0" }}>
                    {item.q}
                  </p>
                  <span
                    className="text-lg font-bold flex-shrink-0"
                    style={{ color: "#2dd4bf" }}
                  >
                    {openFaq === i ? "−" : "+"}
                  </span>
                </div>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 참여하기 폼 ── */}
      <section
        id="contact"
        className="py-14 md:py-20 border-t"
        style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* 왼쪽 */}
            <div>
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#2dd4bf" }}
              >
                [ 참여 의사 전달 ]
              </span>
              <h2
                className="text-3xl md:text-4xl font-extrabold mt-2 mb-3 leading-tight"
                style={{ color: "#f1f5f9" }}
              >
                함께 떠나요!
                <br />
                같이 가자기
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "#94a3b8" }}
              >
                맘월드의 캠페인에 관심이 있으시거나
                <br />
                참여를 원하시면 양식을 작성해주세요.
              </p>
              <div className="space-y-2 text-sm" style={{ color: "#64748b" }}>
                <p>📧 mk.momworld@gmail.com</p>
                <p>📍 대한민국 서울시</p>
              </div>
            </div>

            {/* 오른쪽: 폼 */}
            <div>
              {submitted ? (
                <div
                  className="rounded-2xl border p-10 text-center"
                  style={{
                    backgroundColor: "#293548",
                    borderColor: "rgba(45,212,191,0.25)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#2dd4bf" }}
                  >
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                  <p className="font-bold mb-1" style={{ color: "#f1f5f9" }}>
                    참여 신청이 완료되었습니다!
                  </p>
                  <p className="text-sm" style={{ color: "#94a3b8" }}>
                    빠른 시일 내에 연락 드리겠습니다.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  {error && (
                    <p
                      className="text-sm rounded-lg px-4 py-3"
                      style={{
                        color: "#f87171",
                        backgroundColor: "rgba(248,113,113,0.08)",
                        border: "1px solid rgba(248,113,113,0.2)",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <input
                    type="text"
                    placeholder="이름"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#2dd4bf")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                  />
                  <input
                    type="tel"
                    placeholder="연락처"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#2dd4bf")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                  />
                  <input
                    type="email"
                    placeholder="이메일"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#2dd4bf")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                  />
                  <textarea
                    placeholder="메시지"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#2dd4bf")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
                    style={{
                      backgroundColor: "#2dd4bf",
                      color: "#0f172a",
                      boxShadow: "0 4px 16px rgba(45,212,191,0.25)",
                    }}
                  >
                    {submitting ? "접수 중..." : "참여신청"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
