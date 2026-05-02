## 캠페인 상세 페이지 제거

캠페인 카드/이미지/버튼 클릭 시 이동하던 `/campaign/:id` 상세 페이지를 완전히 삭제하고, 메인페이지(`SubjectsSection`)의 모든 클릭 동선을 제거합니다.

## 변경 사항

### 1. `src/pages/CampaignDetail.tsx` — 파일 삭제
상세 페이지 컴포넌트 자체를 제거합니다.

### 2. `src/App.tsx` — 라우트 제거
- `import CampaignDetail` 라인 삭제
- `<Route path="/campaign/:id" element={<CampaignDetail />} />` 라인 삭제

### 3. `src/components/SubjectsSection.tsx` — 클릭 동선 제거
- 캠페인 이미지 영역의 `onClick={() => navigate(...)}` 및 `cursor-pointer`, `group` 호버 효과 제거 (단순 시각 표시로 변경)
- 하단 "자세히 보기 →" 버튼 완전 삭제
- 더 이상 사용되지 않는 `useNavigate` import 제거

## 결과
- 메인페이지 4대 캠페인 카드는 **정보 표시 전용**이 됩니다 (클릭/이동 없음)
- `/campaign/:id` URL 직접 접근 시 NotFound 페이지로 처리됩니다
- 관리자 페이지의 캠페인 CRUD 기능은 영향 없음

진행해도 될까요?
