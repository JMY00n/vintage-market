# REST API 설계 - 빈티지 의류 중고거래 앱

MVP 범위 기준. 인증은 세션 또는 JWT 둘 다 가능하나 아래는 방식 중립적으로 작성 (헤더에 인증 정보 있다고 가정).

## 1. Auth

| Method | URI | 설명 |
|---|---|---|
| POST | /api/auth/signup | 회원가입 (role: INDIVIDUAL 기본값, STORE는 가입 후 별도 신청) |
| POST | /api/auth/login | 로그인 |
| POST | /api/auth/logout | 로그아웃 |

## 2. User

| Method | URI | 설명 |
|---|---|---|
| GET | /api/users/me | 내 정보 조회 |
| PATCH | /api/users/me | 내 정보 수정 (닉네임, 프로필 이미지 등) |
| GET | /api/users/{id} | 공개 프로필 조회 (판매자 프로필 등에서 사용) |

## 3. Store (인증 상점)

| Method | URI | 설명 |
|---|---|---|
| POST | /api/stores/verification-requests | 상점 인증 신청 (store_name, address, business_registration_number 제출 → verification_status = PENDING) |
| GET | /api/stores/verification-requests/me | 내 인증 신청 상태 조회 |
| GET | /api/stores/{userId} | 상점 프로필 조회 (주소 등 공개 정보) |

> 승인/반려 관리자 API는 이번 범위 제외. 나중에 `PATCH /api/admin/stores/{id}/verification` 형태로 추가 예정.

## 4. Product

| Method | URI | 설명 |
|---|---|---|
| GET | /api/products | 상품 목록 (query: category, keyword, sellerId, status) |
| GET | /api/products/{id} | 상품 상세 |
| POST | /api/products | 상품 등록 (title, price, description, category) |
| PATCH | /api/products/{id} | 상품 수정 |
| DELETE | /api/products/{id} | 상품 삭제 |
| POST | /api/products/{id}/images | 상품 이미지 업로드 (multipart) |

## 5. Order (거래)

| Method | URI | 설명 |
|---|---|---|
| POST | /api/products/{id}/orders | 거래 요청 생성. body에 `orderType: DIRECT \| PAYMENT` 포함 |
| GET | /api/orders/{id} | 거래 상세 |
| GET | /api/orders | 내 거래 목록 (query: role=buyer\|seller, status) |
| PATCH | /api/orders/{id}/status | 상태 전이 (ACCEPTED, COMPLETED, CANCELED 등) |

### 상태 전이 흐름
- DIRECT: `REQUESTED → ACCEPTED → COMPLETED` (또는 `CANCELED`)
- PAYMENT: `REQUESTED → ACCEPTED → PAID → COMPLETED` (또는 `CANCELED`)
  - Order.status는 거래 전체의 큰 흐름만 담당. PAID 이후 배송 진행 상황은 Delivery.status가 별도로 추적.

## 6. Payment

| Method | URI | 설명 |
|---|---|---|
| POST | /api/orders/{id}/payments | 결제 시작 (orderType=PAYMENT인 주문만 가능) |
| GET | /api/orders/{id}/payment | 결제 상세 조회 |
| POST | /api/payments/webhook | PG사 콜백 수신 (추후 실제 PG 연동 시 구현) |

## 7. Delivery

| Method | URI | 설명 |
|---|---|---|
| POST | /api/orders/{id}/delivery | 배송 정보 생성 (결제 완료(PAID) 시점에 주소 등록) |
| GET | /api/orders/{id}/delivery | 배송 상태 조회 |
| PATCH | /api/orders/{id}/delivery | 배송 상태 갱신 (판매자가 운송장 번호 입력 → status=SHIPPED, 구매자가 수령 확인 → status=DELIVERED) |

> DIRECT 타입 주문은 이 API 대상이 아님 (배송 자체가 없음). 실제 택배사 API 연동은 MVP 범위 밖 — 운송장 번호는 판매자가 수동 입력.

## 8. Chat

| Method | URI | 설명 |
|---|---|---|
| POST | /api/products/{id}/chat-rooms | 채팅방 생성 또는 기존 방 반환 (상품 기준 buyer-seller 1쌍당 1방) |
| GET | /api/chat-rooms | 내 채팅방 목록 |
| GET | /api/chat-rooms/{id}/messages | 메시지 내역 조회 (페이징) |
| POST | /api/chat-rooms/{id}/messages | 메시지 전송 |

## 공통 규칙 (초안)
- 응답 포맷: `{ data, error }` 형태 통일 여부는 추후 결정 — 처음엔 `ResponseEntity<T>` 그대로 반환하다가 필요해지면 공통 래퍼 도입 고려.
- 인증 필요 없는 엔드포인트: 상품 목록/상세 조회, 상점 공개 프로필.
- 나머지는 모두 로그인 필요.
- 에러 응답은 spring-board 프로젝트에서 정리했던 401/403 구분 원칙 그대로 적용 (미인증=401, 권한없음=403).

## 공통 원칙: sender/buyer/seller 역할 판단
User 테이블 자체에는 "이 계정은 항상 판매자"같은 고정 역할이 없다. 같은 계정이 어떤 거래에선 판매자, 다른 거래에선 구매자가 될 수 있기 때문. 그래서 역할은 항상 해당 리소스(Order, ChatRoom) 안의 buyer_id/seller_id를 기준으로 판단한다 — User 테이블만 봐서는 알 수 없음.

## 향후 확장 후보
- 채팅 실시간 처리 (WebSocket/STOMP)
- 관리자 상점 인증 승인 API
- 리뷰/평점 API
- 택배사 API 연동을 통한 실시간 배송 조회