import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("이름과 연락처는 필수 입력입니다.");
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase
      .from("contact_submissions")
      .insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        message: formData.message || null,
      });
    if (error) {
      toast.error("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } else {
      toast.success("참여 신청이 완료되었습니다! 빠른 시일 내에 연락 드리겠습니다.");
      setFormData({ name: "", phone: "", email: "", message: "" });
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    "w-full px-5 py-4 rounded-xl border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm";

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-bold text-sm tracking-widest mb-3">[ 참여 의사 전달 ]</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              함께해요!<br />참여하기
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              맘월드의 캠페인에 관심이 있으시거나 참여를 원하시면<br />
              아래 양식을 작성해주세요.
            </p>
            <div className="space-y-3 text-muted-foreground text-sm">
              <p>📍 대한민국 서울시</p>
              <p>📧 mk.momworld@gmail.com</p>
              <p>📞 010-8330-6616</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-background border rounded-2xl p-8 space-y-5"
          >
            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름 / 연락처 *"
                className={inputClass}
                maxLength={50}
              />
            </div>
            <div>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="연락처 *"
                className={inputClass}
                maxLength={20}
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                className={inputClass}
                maxLength={100}
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="메시지"
                className={`${inputClass} resize-none`}
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "접수 중..." : "참여신청"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
