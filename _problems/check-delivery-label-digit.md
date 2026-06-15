---
title: 배송 라벨 체크 숫자 확인하기
slug: check-delivery-label-digit
track: today
difficulty: easy
topic: checksum-validation
tags:
  - daily
  - beginner
  - string
  - digits
  - checksum
order: 1430
function_name: checkDeliveryLabelDigit
time_limit_ms: 200
primaryMethod: prefix-digit-sum-modulo-check
coreIdea: 숫자 문자열의 마지막 자리를 체크 숫자로 분리하고 앞자리 숫자 합의 일의 자리와 같은지 비교해 라벨의 유효성을 판별한다
gimmick: 체크 숫자는 합산에서 제외해야 하며 앞자리 합이 10 이상이면 합 전체가 아니라 일의 자리만 비교해야 한다
starter_code: |
  function checkDeliveryLabelDigit(label) {
    return false;
  }
test_cases:
  - input: ["3148"]
    output: true
  - input: ["9997"]
    output: true
  - input: ["1230"]
    output: false
  - input: ["00"]
    output: true
  - input: ["10"]
    output: false
---

배송 라벨의 마지막 체크 숫자가 올바른지 확인하세요.

## 문제 설명

숫자로만 이루어진 배송 라벨 문자열 `label`이 주어집니다.

라벨의 마지막 숫자는 체크 숫자입니다. 마지막 숫자를 제외한 모든 숫자의 합에서 일의 자리를 구했을 때, 그 값이 체크 숫자와 같으면 올바른 라벨입니다.

배송 라벨이 올바르면 `true`, 아니면 `false`를 반환하는 `checkDeliveryLabelDigit` 함수를 작성하세요.

예를 들어 `"3148"`에서 앞자리 숫자의 합은 `3 + 1 + 4 = 8`이고, 체크 숫자도 `8`이므로 올바른 라벨입니다.

## 제한사항

- `label`은 숫자로만 이루어진 문자열입니다.
- `2 <= label.length <= 1,000`
- 마지막 문자는 체크 숫자이며 앞자리 숫자의 합에는 포함하지 않습니다.
- 앞자리 숫자의 합에서 일의 자리만 체크 숫자와 비교합니다.

## 예시

- 입력: `"3148"` -> 출력: `true`
- 입력: `"9997"` -> 출력: `true`
- 입력: `"1230"` -> 출력: `false`
- 입력: `"00"` -> 출력: `true`

## 힌트

- 마지막 문자를 제외한 범위만 순회해 숫자 합을 구해 보세요.
- 합을 `10`으로 나눈 나머지가 체크 숫자와 같은지 확인하면 됩니다.

## 해설

마지막 문자는 검증에 사용할 체크 숫자이므로 합산 대상에서 제외합니다. 문자열의 처음부터 마지막 문자 직전까지 순회하며 각 문자를 숫자로 바꿔 합을 누적합니다.

누적한 합을 `10`으로 나눈 나머지는 합의 일의 자리입니다. 이 값과 마지막 체크 숫자를 비교하면 라벨이 올바른지 판별할 수 있습니다.

문자열을 한 번 순회하므로 시간 복잡도는 `O(n)`이고, 합계 변수만 사용하므로 공간 복잡도는 `O(1)`입니다.
