import { GRADE_INFO } from "@/lib/grades";
import { UserRole } from "@prisma/client";

export function GradeSection() {
  const grades = [
    GRADE_INFO[UserRole.GRADE1],
    GRADE_INFO[UserRole.GRADE2],
    GRADE_INFO[UserRole.GRADE3],
    GRADE_INFO[UserRole.GRADE4],
    GRADE_INFO[UserRole.GRADE5],
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-orange-400 font-semibold text-sm mb-2">🌱 성장하는 멤버십</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
            회원 등급 시스템
          </h2>
          <p className="text-stone-500 mt-3 max-w-lg mx-auto">
            활동할수록 등급이 올라가고, 더 많은 혜택을 누릴 수 있어요.
            씨앗에서 숲이 될 때까지 함께해요!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {grades.map((grade, i) => (
            <div
              key={grade.role}
              className={`relative p-5 rounded-3xl border-2 transition-all hover:-translate-y-1 ${
                i === 4
                  ? "border-rose-300 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg shadow-rose-100/50"
                  : "border-orange-100 bg-white hover:border-orange-200 hover:shadow-md hover:shadow-orange-50"
              }`}
            >
              {i === 4 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  최고 등급
                </div>
              )}
              <div className="text-center">
                <div className={`w-14 h-14 mx-auto rounded-2xl ${grade.bgColor} flex items-center justify-center text-3xl mb-3`}>
                  {grade.emoji}
                </div>
                <h3 className={`font-bold text-base mb-1 ${grade.color}`}>{grade.name}</h3>
                <p className="text-xs text-stone-400 mb-4 leading-relaxed">{grade.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">할인율</span>
                    <span className={`font-bold ${grade.discountRate > 0 ? grade.color : "text-stone-400"}`}>
                      {grade.discountRate > 0 ? `-${grade.discountRate}%` : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">포인트</span>
                    <span className={`font-bold ${grade.color}`}>{grade.pointRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-stone-400 mt-6">
          * 등급별 혜택은 운영 정책에 따라 변경될 수 있습니다.
        </p>
      </div>
    </section>
  );
}
