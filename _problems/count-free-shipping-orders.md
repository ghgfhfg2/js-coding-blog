---
title: 무료 배송 기준을 넘긴 주문 수
slug: count-free-shipping-orders
track: today
difficulty: easy
topic: threshold-count
tags:
  - daily
  - beginner
  - array
  - counting
  - threshold
order: 1390
function_name: countFreeShippingOrders
time_limit_ms: 200
primaryMethod: linear-threshold-count
coreIdea: 주문 금액 배열을 한 번 순회하며 각 금액이 무료 배송 기준 이상인지 확인해 조건을 만족하는 주문 수를 센다
gimmick: 기준 금액과 정확히 같은 주문도 포함하고 주문 목록이 비어 있으면 0을 반환해야 한다
starter_code: |
  function countFreeShippingOrders(orders, minimumAmount) {
    return 0;
  }
test_cases:
  - input: [[12000, 30000, 29900, 45000], 30000]
    output: 2
  - input: [[5000, 8000, 9999], 10000]
    output: 0
  - input: [[10000], 10000]
    output: 1
  - input: [[], 15000]
    output: 0
  - input: [[15000, 15001, 14999, 0], 15000]
    output: 2
---

무료 배송 기준 금액을 넘긴 주문이 몇 개인지 세어 보세요.

## 문제 설명
주문 금액 목록 `orders`와 무료 배송 기준 금액 `minimumAmount`가 주어집니다.

주문 금액이 `minimumAmount` 이상인 주문은 무료 배송 대상입니다. 무료 배송 대상 주문이 모두 몇 개인지 반환하는 `countFreeShippingOrders` 함수를 작성하세요.

## 제한사항
- `orders`는 정수 배열입니다.
- `0 <= orders.length <= 1,000`
- 각 주문 금액은 `0` 이상 `1,000,000` 이하입니다.
- `minimumAmount`는 `0` 이상 `1,000,000` 이하의 정수입니다.
- 주문 금액이 기준 금액과 정확히 같아도 무료 배송 대상입니다.
- 반환값은 무료 배송 대상 주문의 개수입니다.

## 예시
- 입력: `[12000, 30000, 29900, 45000], 30000` -> 출력: `2`
- 입력: `[5000, 8000, 9999], 10000` -> 출력: `0`
- 입력: `[10000], 10000` -> 출력: `1`
- 입력: `[], 15000` -> 출력: `0`

## 힌트
- 배열을 왼쪽부터 한 번만 확인해도 충분합니다.
- `>`가 아니라 `>=` 조건을 사용해야 기준 금액과 같은 주문도 포함됩니다.
- 빈 배열은 셀 주문이 없으므로 자연스럽게 `0`을 반환합니다.

## 해설
이 문제는 각 주문 금액이 기준 금액 이상인지 확인하는 단순한 카운팅 문제입니다.

먼저 무료 배송 대상 주문 수를 저장할 변수를 `0`으로 둡니다. 그 다음 `orders`를 순회하면서 현재 주문 금액이 `minimumAmount` 이상이면 카운트를 1 늘립니다.

모든 주문을 확인한 뒤 누적한 카운트를 반환하면 됩니다. 기준 금액과 정확히 같은 주문도 조건을 만족하므로 비교식은 `amount >= minimumAmount`가 되어야 합니다.

풀이 흐름은 다음과 같습니다.

1. 카운트 변수를 `0`으로 시작합니다.
2. `orders`의 각 주문 금액을 확인합니다.
3. 주문 금액이 `minimumAmount` 이상이면 카운트를 증가시킵니다.
4. 순회가 끝나면 카운트를 반환합니다.

배열을 한 번만 순회하므로 시간 복잡도는 `O(n)`이고, 추가로 큰 자료구조를 만들지 않으므로 공간 복잡도는 `O(1)`입니다.
