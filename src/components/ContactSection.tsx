import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("이름과 연락처는 필수 입력입니다.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("상담 신청이 완료되었습니다! 빠른 시일 내에 연락 드리겠습니다.");
      setFormData({ name: "", phone: "", email: "", interest: "", message: "" });
      setIsSubmitting(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-10">
            <span className="text-primary font-semibold text-sm tracking-wide uppercase">Contact</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">상담 신청</h2>
            <p className="text-muted-foreground">
              맘월드에 대해 더 알고 싶으시다면 아래 양식을 작성해주세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">이름 *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="홍길동"
                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                maxLength={50}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">연락처 *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010-0000-0000"
                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                maxLength={20}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">이메일</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">관심 과목</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              >
                <option value="">선택해주세요</option>
                <option value="치안">치안 (Safety)</option>
                <option value="먹거리">먹거리 (Food Safety)</option>
                <option value="환경">환경 (Environment)</option>
                <option value="사회경제">사회경제 (Community)</option>
                <option value="전체">전체 과목</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">문의 내용</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="궁금한 점을 자유롭게 작성해주세요"
                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "접수 중..." : "상담 신청하기"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
