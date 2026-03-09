import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding database...");

  // 관리자 계정 생성
  const adminPassword = await bcrypt.hash("admin1234!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mkmomworld.com" },
    update: {},
    create: {
      email: "admin@mkmomworld.com",
      password: adminPassword,
      name: "관리자",
      role: UserRole.ADMIN,
      referralCode: "ADMIN001",
      isActive: true,
    },
  });
  console.log("✅ Admin created:", admin.email);

  // 테스트 회원 생성
  const testPassword = await bcrypt.hash("test1234!", 12);
  await prisma.user.upsert({
    where: { email: "test@mkmomworld.com" },
    update: {},
    create: {
      email: "test@mkmomworld.com",
      password: testPassword,
      name: "테스트 회원",
      role: UserRole.GRADE1,
      referralCode: "TEST001",
      isActive: true,
    },
  });
  console.log("✅ Test user created");

  // 캠페인 카테고리 생성
  const categories = [
    { name: "뷰티/스킨케어", slug: "beauty-skincare" },
    { name: "육아/유아동", slug: "baby-kids" },
    { name: "건강/웰니스", slug: "health-wellness" },
    { name: "푸드/다이어트", slug: "food-diet" },
    { name: "생활/홈", slug: "home-living" },
  ];

  for (const cat of categories) {
    await prisma.campaignCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Campaign categories created");

  const beautyCategory = await prisma.campaignCategory.findUnique({ where: { slug: "beauty-skincare" } });
  const babyCategory = await prisma.campaignCategory.findUnique({ where: { slug: "baby-kids" } });
  const healthCategory = await prisma.campaignCategory.findUnique({ where: { slug: "health-wellness" } });
  const foodCategory = await prisma.campaignCategory.findUnique({ where: { slug: "food-diet" } });
  const homeCategory = await prisma.campaignCategory.findUnique({ where: { slug: "home-living" } });

  // 캠페인 생성
  const campaignsData = [
    {
      title: "봄맞이 스킨케어 캠페인",
      slug: "spring-skincare-2024",
      summary: "봄철 건조하고 예민해진 피부를 위한 특별 스킨케어 캠페인입니다. 최고의 성분으로 만들어진 제품을 체험해보세요.",
      description: `## 봄맞이 스킨케어 캠페인

봄은 새로운 시작의 계절입니다. 겨울 동안 지친 피부를 위한 특별한 케어를 시작해보세요.

### 캠페인 혜택
- 프리미엄 스킨케어 제품 체험 기회
- 전문 뷰티 컨설턴트 1:1 상담
- 참여자 전원 포인트 2배 적립

### 신청 자격
- MK Mom World 회원 누구나
- 새싹 등급 이상 우선 선발

### 진행 일정
- 신청 기간: 2024년 3월 ~ 4월
- 체험 기간: 4주간

*지금 바로 신청하세요!*`,
      thumbnailImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
      categoryId: beautyCategory?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 1,
      maxParticipants: 100,
      requiredGrade: UserRole.GRADE1,
      tags: JSON.stringify(["스킨케어", "뷰티", "봄캠페인"]),
    },
    {
      title: "아기 피부 순한 케어 캠페인",
      slug: "baby-skincare-2024",
      summary: "소중한 아기의 민감한 피부를 위한 순한 케어 제품 체험 캠페인. 엄마의 마음으로 만든 제품을 경험해보세요.",
      description: `## 아기 피부 순한 케어 캠페인

아기의 피부는 어른보다 3배 더 얇고 민감합니다.
우리 아기를 위한 특별한 케어를 시작해보세요.

### 캠페인 제품
- 무향 무방부제 베이비 로션
- 민감 피부용 베이비 샴푸
- 오가닉 베이비 오일

### 신청 자격
- 0~36개월 아이를 키우는 부모님
- MK Mom World 회원

### 진행 일정
- 신청 기간: 상시 접수
- 체험 기간: 30일`,
      thumbnailImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=80",
      categoryId: babyCategory?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 2,
      maxParticipants: 50,
      requiredGrade: UserRole.GRADE1,
      tags: JSON.stringify(["베이비", "순한성분", "아기케어"]),
    },
    {
      title: "워킹맘 건강 챌린지",
      slug: "working-mom-health-2024",
      summary: "바쁜 워킹맘을 위한 건강 관리 프로그램. 간편하게 건강을 챙기는 방법을 알려드립니다.",
      description: `## 워킹맘 건강 챌린지

일과 육아를 동시에 하는 워킹맘의 건강을 위한 특별 프로그램입니다.

### 프로그램 구성
- 간편 영양제 세트 제공
- 온라인 건강 코칭 3회
- 식단 가이드 제공

### 참여 혜택
- 건강 체크업 키트 증정
- 전문가 영양 상담
- 커뮤니티 활동 지원

### 진행 기간
- 8주 챌린지 프로그램`,
      thumbnailImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
      categoryId: healthCategory?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 3,
      maxParticipants: 200,
      requiredGrade: UserRole.GRADE2,
      tags: JSON.stringify(["워킹맘", "건강", "챌린지"]),
    },
    {
      title: "엄마의 다이어트 식단 캠페인",
      slug: "mom-diet-food-2024",
      summary: "출산 후 체중 관리에 고민인 엄마들을 위한 건강한 다이어트 식단 캠페인입니다.",
      description: `## 엄마의 다이어트 식단 캠페인

출산 후 변한 몸, 건강하게 관리하는 방법을 알려드립니다.

### 포함 내용
- 4주 맞춤 식단 플랜
- 건강 간식 세트 제공
- 저칼로리 레시피 북

### 전문가 지원
- 영양사 1:1 상담
- 주간 체중 관리 팁
- 온라인 소그룹 모임

### 대상
- 산후 6개월 이상 엄마
- 나무 등급 이상`,
      thumbnailImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
      categoryId: foodCategory?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 4,
      maxParticipants: 150,
      requiredGrade: UserRole.GRADE3,
      tags: JSON.stringify(["다이어트", "식단", "산후관리"]),
    },
    {
      title: "집안일이 즐거워지는 홈케어 캠페인",
      slug: "home-care-2024",
      summary: "친환경 홈케어 제품으로 가족 모두가 안전한 집을 만들어보세요. 아이가 있는 가정을 위한 안전 인증 제품들입니다.",
      description: `## 집안일이 즐거워지는 홈케어 캠페인

가족의 안전을 생각한 친환경 홈케어 제품을 경험해보세요.

### 체험 제품
- 친환경 세탁 세제
- 천연 주방 세제
- 베이킹소다 기반 클리너

### 캠페인 혜택
- 친환경 인증 제품 체험
- 홈케어 전문가 강의 제공
- 리뷰 작성 시 추가 포인트

### 기간
- 상시 운영`,
      thumbnailImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
      categoryId: homeCategory?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 5,
      maxParticipants: 300,
      requiredGrade: UserRole.GRADE1,
      tags: JSON.stringify(["홈케어", "친환경", "생활용품"]),
    },
  ];

  for (const campaignData of campaignsData) {
    await prisma.campaign.upsert({
      where: { slug: campaignData.slug },
      update: {},
      create: campaignData,
    });
  }
  console.log("✅ Campaigns created");

  // 상품 카테고리
  await prisma.productCategory.upsert({
    where: { slug: "skincare" },
    update: {},
    create: { name: "스킨케어", slug: "skincare" },
  });

  const skincare = await prisma.productCategory.findUnique({ where: { slug: "skincare" } });
  const springCampaign = await prisma.campaign.findUnique({ where: { slug: "spring-skincare-2024" } });

  if (skincare && springCampaign) {
    await prisma.product.upsert({
      where: { slug: "premium-moisturizer" },
      update: {},
      create: {
        name: "프리미엄 수분크림",
        slug: "premium-moisturizer",
        description: "봄철 건조한 피부를 위한 깊은 수분 공급 크림",
        images: JSON.stringify(["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80"]),
        categoryId: skincare.id,
        campaignId: springCampaign.id,
        basePrice: 35000,
        stock: 100,
        gradePrices: JSON.stringify({
          GRADE1: 35000, GRADE2: 33950, GRADE3: 33250, GRADE4: 32550, GRADE5: 31500,
        }),
        gradePointRates: JSON.stringify({
          GRADE1: 1, GRADE2: 2, GRADE3: 3, GRADE4: 5, GRADE5: 7,
        }),
      },
    });
  }
  console.log("✅ Products created");

  // 배너
  await prisma.banner.upsert({
    where: { id: "main-banner-1" },
    update: {},
    create: {
      id: "main-banner-1",
      title: "엄마들의 특별한 세상",
      subtitle: "MK Mom World에서 다양한 캠페인과 혜택을 누려보세요",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1400&q=80",
      link: "/campaigns",
      isActive: true,
      displayOrder: 1,
    },
  });
  console.log("✅ Banners created");

  console.log("🎉 Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
