# vintage-market

빈티지 중고거래 웹 서비스입니다. 일반 사용자와 인증된 판매자(블루체크) 계정을 구분해 운영하는 구조를 목표로 만들고 있습니다.

>  **개발 진행 중인 개인 실습 프로젝트입니다.** 설계 단계를 마치고 순차적으로 구현하는 중이며, 아래 기능들은 진행 상황에 따라 계속 바뀔 수 있습니다.

## 기술 스택

**Backend**
- Spring Boot
- JPA (Hibernate)
- MySQL

**Frontend**
- React (Vite 기반)
- JavaScript

## 프로젝트 구조

```
vintage-market
├── backend/    # Spring Boot API 서버
├── frontend/   # React 클라이언트
└── docs/       # ERD, API 설계, DBML 등 설계 문서
```

## 주요 설계 포인트

- **User / StoreProfile 통합 구조**: 일반 유저와 판매자 계정을 하나의 User 테이블 기반으로 관리하고, 판매자는 StoreProfile로 확장
- **Order (order_type)**: 주문 유형을 구분해 하나의 Order 엔티티로 다양한 거래 케이스를 처리
- **Payment / Delivery**: Order에 대한 1:1 확장 엔티티로 결제·배송 정보를 분리

자세한 설계는 [`docs/`](./docs) 폴더의 ERD, API 명세, DBML 문서를 참고해주세요.

## 진행 상황

- [x] 요구사항 및 도메인 설계
- [x] ERD / DBML 작성
- [x] API 설계 문서 작성
- [x] 회원가입 / 로그인 (일반 유저, 판매자)
- [?] 상품 등록 및 조회 (현재 API만 구현완료. 포스트맨으로 확인)
- [ ] 주문 / 결제 / 배송 플로우
- [ ] 판매자 인증(블루체크) 프로세스
- [ ] 배포

## UI
 
<table>
  <tr>
    <td align="center"><b>로그인</b></td>
    <td align="center"><b>회원가입</b></td>
  </tr>
  <tr>
    <td><img width="300" alt="로그인" src="https://github.com/user-attachments/assets/c7e44db2-6074-45f3-a5ee-30fd332ed6dd" /></td>
    <td><img width="300" alt="회원가입" src="https://github.com/user-attachments/assets/a4665179-fd21-4da9-a4ad-83651d15e916" /></td>
  </tr>
</table>

#### 메인페이지
 
<img width="500" alt="메인페이지" src="https://github.com/user-attachments/assets/613659d0-b2da-490f-bfd0-32fbdd013719" />

> 상품 목록은 현재 더미데이터로 출력 중입니다.

