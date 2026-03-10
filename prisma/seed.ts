import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding database with real MKmomworld content...");

  // 관리자 계정
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
  console.log("✅ Admin created");

  // 테스트 회원
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

  // 캠페인 카테고리
  const categoryData = [
    { name: "치안·안전", slug: "safety-security" },
    { name: "먹거리·건강", slug: "food-health" },
    { name: "환경·미래", slug: "environment-future" },
    { name: "사회경제", slug: "social-economy" },
    { name: "안전동행", slug: "safe-companion" },
  ];
  for (const cat of categoryData) {
    await prisma.campaignCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const catSafety   = await prisma.campaignCategory.findUnique({ where: { slug: "safety-security" } });
  const catFood     = await prisma.campaignCategory.findUnique({ where: { slug: "food-health" } });
  const catEnv      = await prisma.campaignCategory.findUnique({ where: { slug: "environment-future" } });
  const catEcon     = await prisma.campaignCategory.findUnique({ where: { slug: "social-economy" } });
  const catCompan   = await prisma.campaignCategory.findUnique({ where: { slug: "safe-companion" } });
  console.log("✅ Categories created");

  // 기존 캠페인 삭제 후 재생성
  await prisma.campaign.deleteMany({});

  // 5대 캠페인 실제 내용
  const campaigns = [
    {
      title: "치안 캠페인 — 맘편한 거리",
      slug: "safety-campaign",
      summary: "밤에도 걱정 없이 걸을 수 있는 거리를 만들기 위해 함께 노력합니다. 범죄 제로 사회, 꿈이 현실로!",
      description: `## 치안 캠페인 — 맘편한 거리

**"안전한 길, 걱정 없는 밤!"**

우리 아이들이 안전하게 귀가하고, 부모님들이 걱정 없이 밤길을 걸을 수 있는 사회를 만듭니다.

### 캠페인 배경
위험한 순간, 우리는 어떻게 서로를 돕는가? 맘월드는 치안 문제를 시민 모두의 문제로 인식하고 함께 해결책을 찾습니다.

### 교육 내용
- 터치소리 이해와 활용
- 위급 상황 대응 방법
- 범죄·유괴 예방 시민 행동 요령
- 보호자·아이 시나리오 교육

### 활동 내용
- 홍보단 활동
- 체험 캠페인
- 지역 연결 네트워크

### 참여 대상
누구나 참여 가능! 특히 자녀를 키우는 부모님들께 강력 추천합니다.

> 맘월드의 핵심 뿌리 캠페인`,
      thumbnailImage: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80",
      categoryId: catSafety?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 1,
      maxParticipants: 500,
      requiredGrade: UserRole.GRADE1,
      tags: JSON.stringify(["치안", "안전", "밤길", "귀가", "걱정제로"]),
    },
    {
      title: "먹거리 캠페인 — 건강한 식탁",
      slug: "food-campaign",
      summary: "생산자와 소비자를 연결하여 믿고 먹는 먹거리를 만듭니다. 가족이 먹는 건, 우리가 함께 지킵니다.",
      description: `## 먹거리 캠페인 — 건강한 식탁

**"건강한 먹거리, 믿을 수 있는 식탁!"**

가족이 먹는 건, 누가 어떻게 지키는가? 생산자와 소비자를 직접 연결하여 투명하고 안전한 먹거리 문화를 만들어갑니다.

### 캠페인 배경
아이에게 먹이는 음식 하나하나가 미래를 만듭니다. 맘월드는 믿을 수 있는 먹거리 환경을 위해 시민이 직접 나섭니다.

### 교육 내용
- 안심 먹거리 기준 알기
- 생산자 이야기 듣기
- 소비자 선택 교육
- 아이 먹거리 시민 감시단

### 활동 내용
- 신뢰 생산자 캠페인
- 체험형 콘텐츠 제작
- 캐릭터 스토리 공유

### 참여 대상
엄마·아빠 공감도 최고! 자녀를 키우는 모든 부모님

> 엄마·아빠 공감도 최고로 강한 캠페인`,
      thumbnailImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
      categoryId: catFood?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 2,
      maxParticipants: 500,
      requiredGrade: UserRole.GRADE1,
      tags: JSON.stringify(["먹거리", "안심", "건강", "신뢰", "안전"]),
    },
    {
      title: "환경 캠페인 — 밝은 미래",
      slug: "environment-campaign",
      summary: "아이의 미래 환경은 지금의 선택으로 만들어집니다. 미래를 향해 응원하는 희망찬 메시지를 전달합니다.",
      description: `## 환경 캠페인 — 밝은 미래

**"아이들의 밝은 미래!"**

아이의 미래 환경은 지금의 선택으로 만들어진다. 오늘 우리의 작은 실천이 내일의 깨끗한 세상을 만듭니다.

### 캠페인 배경
아이들이 살아갈 미래는 지금 우리가 만들어가고 있습니다. 환경 문제는 더 이상 먼 미래의 이야기가 아닙니다.

### 교육 내용
- 생활 속 환경 보호 방법
- 아이 눈높이 환경 교육
- 지역 환경 캠페인 참여
- 일회용·유해환경 인식 개선

### 활동 내용
- 가족 참여 캠페인
- 학교·지역 연계 프로그램
- 캐릭터 미션형 활동

### 참여 대상
아이 교육 및 가족 참여에 아주 좋은 캠페인

> 아이 교육, 가족 참여에 아주 좋음`,
      thumbnailImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
      categoryId: catEnv?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 3,
      maxParticipants: 500,
      requiredGrade: UserRole.GRADE1,
      tags: JSON.stringify(["환경", "미래", "보호", "실천", "교육"]),
    },
    {
      title: "사회경제 캠페인 — 함께 만드는 공정한 사회",
      slug: "social-economy-campaign",
      summary: "착한 소비와 공정한 관계는 어떻게 연결되는가? 지속 가능한 공동체를 함께 만들어갑니다.",
      description: `## 사회경제 캠페인 — 함께 만드는 공정한 사회

**"함께 만드는 공정한 사회!"**

착한 소비와 공정한 관계는 어떻게 연결되는가? 시민 모두가 함께 만드는 지속 가능한 공동체를 꿈꿉니다.

### 캠페인 배경
우리의 소비 하나하나가 사회를 바꿉니다. 협동조합, 비영리 단체, 사회적 기업과 연결되어 공정한 경제를 실현합니다.

### 교육 내용
- 사회적 경제 이해
- 협동조합·비영리 구조 알기
- 시민 소비자 역할
- 지속 가능한 공동체 만들기

### 활동 내용
- 지역 상생 프로젝트
- 기업 협력 프로그램
- 후원·참여 구조 이해

### 참여 대상
어른용 사고 확장 캠페인 — 청년, 학부모, 지역 시민

> 청년과 미래를 향한 희망의 캠페인`,
      thumbnailImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
      categoryId: catEcon?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 4,
      maxParticipants: 300,
      requiredGrade: UserRole.GRADE1,
      tags: JSON.stringify(["청년", "미래", "희망", "꿈", "응원"]),
    },
    {
      title: "병원동행 캠페인 — 안전동행",
      slug: "hospital-companion-campaign",
      summary: "혼자 병원에 갈 수 없는 이웃과 함께 걸어드립니다. 독거노인·장애인·1인 가구의 의료 접근성을 높입니다.",
      description: `## 병원동행 캠페인 — 안전동행

**"혼자가 아닌, 함께!"**

혼자 병원에 갈 수 없는 이웃, 누가 함께 걸어줄 것인가?

### 캠페인 배경
우리 사회에는 거동이 불편하거나 혼자 병원을 가기 어려운 독거노인, 장애인, 1인 가구가 급증하고 있습니다. 경기도·인천 등 여러 지자체에서 '병원동행 서비스'를 시행하며, 요양보호사·자원봉사자가 집에서 출발해 진료 접수, 대기, 수납, 약국, 귀가까지 함께합니다. 하지만 아직 전국적으로 확대되지 못한 상황입니다. 맘월드는 시민 참여를 통해 병원동행 문화를 확산하고, 돌봄 공백을 채우는 데 앞장섭니다.

### 지원 내용
- 독거노인·장애인·1인 가구 병원 동행 지원
- 집에서 출발 → 귀가까지 원스톱 동행
- 자원봉사자·동행매니저 연계 시스템
- 의료 접근성 사각지대 해소

### 연계 기관
- 지역 자원봉사센터
- 지자체 동행서비스 협력
- 시니어케어 네트워크

### 참여 대상
고령화 시대, 가장 절실한 돌봄 캠페인 — 자원봉사자, 동행매니저 모집 중

> 고령화 시대, 가장 절실한 돌봄 캠페인`,
      thumbnailImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
      bannerImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80",
      categoryId: catCompan?.id,
      isActive: true,
      isDisplayed: true,
      displayOrder: 5,
      maxParticipants: 200,
      requiredGrade: UserRole.GRADE1,
      tags: JSON.stringify(["병원동행", "돌봄", "독거노인", "자원봉사", "동행매니저"]),
    },
  ];

  for (const c of campaigns) {
    await prisma.campaign.create({ data: c });
  }
  console.log("✅ 5대 캠페인 생성 완료");

  // 배너
  await prisma.banner.upsert({
    where: { id: "main-banner-1" },
    update: {
      title: "배우고 연결되고 함께 움직이는 실행 플랫폼",
      subtitle: "맘월드는 치안·먹거리·환경·사회경제·안전동행 5대 캠페인을 통해 시민이 배우고 함께 움직이는 실행 플랫폼입니다.",
    },
    create: {
      id: "main-banner-1",
      title: "배우고 연결되고 함께 움직이는 실행 플랫폼",
      subtitle: "맘월드는 치안·먹거리·환경·사회경제·안전동행 5대 캠페인을 통해 시민이 배우고 함께 움직이는 실행 플랫폼입니다.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1400&q=80",
      link: "/campaigns",
      isActive: true,
      displayOrder: 1,
    },
  });
  console.log("✅ 배너 업데이트 완료");

  console.log("🎉 시딩 완료!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
