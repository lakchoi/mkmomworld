import { motion } from "framer-motion";

// ✅ 관리자 설정: 아래 URL을 본인의 Google Form 임베드 URL로 변경하세요
// Google Forms → 보내기 → <> 아이콘 → iframe src URL 복사
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-bold text-sm tracking-widest mb-3">
              [ 참여 의사 전달 ]
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              함께해요!
              <br />
              참여하기
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              맘월드의 캠페인에 관심이 있으시거나 참여를 원하시면
              <br />
              오른쪽 양식을 작성해주세요.
            </p>
            <div className="space-y-3 text-muted-foreground text-sm">
              <p>📍 대한민국 서울시</p>
              <p>📧 mk.momworld@gmail.com</p>
              <p>📞 010-8330-6616</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background border rounded-2xl overflow-hidden"
          >
            <iframe
              src={GOOGLE_FORM_URL}
              width="100%"
              height="700"
              className="border-0"
              title="참여신청 폼"
            >
              로딩 중…
            </iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
