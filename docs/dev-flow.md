#### 26.8.12
* 로컬스토리지로 로그인 관리 -> 이후 jwt 사용 예정.(최소한의 mvp 구현을 다 하고 jwt로 갈아탈 예정.)
* 이에 염두하여 crud 만들 때, 나중에 jwt를 끼워 넣기 쉬운 구조로 짜기.
* Product 컴포넌트에서 받아야할 props {
    id : 1,
    imageUrl: "...",
    sellerName : "oticoti",
    title: "코듀로이 셋업자켓",
    price: 45000,
    sellerVerified: true, 인증상점이면 true, 개인이면 false
}
* 상품등록 CURD 시작