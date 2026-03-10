import { UserRole } from "@prisma/client";

export interface GradeInfo {
  role: UserRole;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  description: string;
  level: number;
  discountRate: number; // %
  pointRate: number;    // %
}

export const GRADE_INFO: Record<UserRole, GradeInfo> = {
  ADMIN: {
    role: UserRole.ADMIN,
    name: "관리자",
    emoji: "👑",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    description: "사이트 관리자",
    level: 99,
    discountRate: 0,
    pointRate: 0,
  },
  GRADE1: {
    role: UserRole.GRADE1,
    name: "씨앗",
    emoji: "🌱",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "함께 시작하는 작은 씨앗",
    level: 1,
    discountRate: 0,
    pointRate: 1,
  },
  GRADE2: {
    role: UserRole.GRADE2,
    name: "새싹",
    emoji: "🌿",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    description: "무럭무럭 자라는 새싹",
    level: 2,
    discountRate: 3,
    pointRate: 2,
  },
  GRADE3: {
    role: UserRole.GRADE3,
    name: "나무",
    emoji: "🌳",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    description: "든든하게 자란 나무",
    level: 3,
    discountRate: 5,
    pointRate: 3,
  },
  GRADE4: {
    role: UserRole.GRADE4,
    name: "열매",
    emoji: "🍎",
    color: "text-[#2dd4bf]",
    bgColor: "bg-[#1e2d3d]",
    description: "풍성한 열매를 맺는 단계",
    level: 4,
    discountRate: 7,
    pointRate: 5,
  },
  GRADE5: {
    role: UserRole.GRADE5,
    name: "숲",
    emoji: "🌲",
    color: "text-[#2dd4bf]",
    bgColor: "bg-[#1e2d3d]",
    description: "아름다운 숲을 이루는 최고 등급",
    level: 5,
    discountRate: 10,
    pointRate: 7,
  },
};

export function getGradeInfo(role: UserRole): GradeInfo {
  return GRADE_INFO[role] || GRADE_INFO.GRADE1;
}

export function getGradeByLevel(level: number): GradeInfo {
  return Object.values(GRADE_INFO).find((g) => g.level === level) || GRADE_INFO.GRADE1;
}

export function calculateDiscountedPrice(
  basePrice: number,
  role: UserRole,
  gradePrices?: Record<string, number>
): number {
  if (gradePrices && gradePrices[role] !== undefined) {
    return gradePrices[role];
  }
  const grade = getGradeInfo(role);
  return Math.floor(basePrice * (1 - grade.discountRate / 100));
}

export function calculatePoints(
  price: number,
  role: UserRole,
  gradePointRates?: Record<string, number>
): number {
  let rate = getGradeInfo(role).pointRate;
  if (gradePointRates && gradePointRates[role] !== undefined) {
    rate = gradePointRates[role];
  }
  return Math.floor(price * (rate / 100));
}
