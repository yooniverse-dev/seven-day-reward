# 🎯 Seven-Day-Reward (출석 보상 시스템)

NestJS 기반의 MSA 구조 출석 보상 시스템입니다.  
서비스는 Gateway / Auth / Event 3개 마이크로서비스로 구성되며, Docker로 컨테이너화되어 실행됩니다.

---

## 🚀 실행 방법

1. Docker 실행

docker-compose up --build
서비스는 다음 포트에서 실행됩니다:

Gateway: http://localhost:3000

Auth: http://localhost:3001

Event: http://localhost:3002

🗂 프로젝트 구조
bash
복사
편집
seven-day-reward/
├── apps/
│   ├── auth/      # 사용자 인증 (회원가입, 로그인, JWT 발급)
│   ├── event/     # 출석 체크 및 보상 수령
│   └── gateway/   # API Gateway + 인증 토큰 검증
├── libs/          # 공통 모듈 (필요 시)
├── docker-compose.yml
├── .env
├── .gitignore
├── README.md

📌 API 흐름 요약
단계	API	설명
1	POST /auth/register	회원가입
2	POST /auth/login	로그인 후 JWT 획득
3	POST /event/checkin	하루 1회 출석 체크
4	GET /event/checkin/rewards	보상 목록 미리 보기
5	POST /event/claim	7일 출석 시 보상 수령

🧠 설계 포인트
MSA 구조: 기능별 독립 서비스로 분리하여 확장성 고려

JWT 인증 + Gateway 프록시: 인증 일원화

.env 기반 환경 설정: 포트와 URL을 외부에서 관리 가능

Docker로 실행 환경 표준화: 로컬 및 배포 환경 통일
