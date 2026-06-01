---
title: 가장 크게 나눌 수 있는 공통 묶음 크기
slug: largest-common-bundle-size
track: algorithm
difficulty: easy
topic: gcd
tags:
  - beginner
  - math
  - gcd
  - euclidean-algorithm
order: 1390
function_name: largestCommonBundleSize
time_limit_ms: 200
primaryMethod: euclidean-gcd-fold
coreIdea: 여러 창고의 상품 개수를 모두 같은 크기의 묶음으로 남김없이 나누기 위해 배열 전체의 최대공약수를 유클리드 호제법으로 누적 계산한다
gimmick: 상품 개수가 0인 창고는 최대공약수 누적에서 자연스럽게 건너뛰어지고, 모든 값이 서로소이면 1을 반환한다
starter_code: |
  function largestCommonBundleSize(bundles) {
    return 0;
  }
test_cases:
  - input: [[12, 18, 30]]
    output: 6
  - input: [[7, 13, 29]]
    output: 1
  - input: [[24, 24, 24]]
    output: 24
  - input: [[0, 10, 20]]
    output: 10
---

여러 창고의 상품 개수를 모두 같은 크기 묶음으로 나누려고 할 때, 가능한 가장 큰 묶음 크기를 구하세요.

## 문제 설명

정수 배열 `bundles`가 주어집니다. `bundles[i]`는 `i`번째 창고에 있는 상품 개수입니다.

모든 창고의 상품을 같은 크기의 묶음으로 나누되, 각 창고에 남는 상품이 없어야 합니다. 이때 사용할 수 있는 묶음 크기 중 가장 큰 값을 반환하는 함수 `largestCommonBundleSize`를 작성하세요.

예를 들어 상품 개수가 `[12, 18, 30]`이라면 6개씩 묶을 수 있고, 7개씩은 모든 창고를 남김없이 나눌 수 없습니다. 따라서 정답은 `6`입니다.

## 제한사항

- `1 <= bundles.length <= 10,000`
- `0 <= bundles[i] <= 1,000,000,000`
- `bundles`에는 적어도 하나 이상의 양수가 들어 있습니다.
- 반환값은 모든 상품 개수를 남김없이 나눌 수 있는 가장 큰 양의 정수입니다.

## 예시

- 입력: `[12, 18, 30]` -> 출력: `6`
- 입력: `[7, 13, 29]` -> 출력: `1`
- 입력: `[24, 24, 24]` -> 출력: `24`
- 입력: `[0, 10, 20]` -> 출력: `10`

## 힌트

- 두 수를 모두 나눌 수 있는 가장 큰 수는 최대공약수입니다.
- 배열 전체의 답은 앞에서부터 최대공약수를 계속 누적하면 구할 수 있습니다.
- `gcd(0, x)`는 `x`로 처리할 수 있습니다.

## 해설

이 문제는 배열 전체의 최대공약수를 구하는 문제입니다. 어떤 묶음 크기 `k`가 모든 창고의 상품 개수를 남김없이 나누려면, `k`는 배열의 모든 값의 공약수여야 합니다. 가능한 묶음 크기 중 가장 큰 값은 결국 전체 배열의 최대공약수입니다.

최대공약수는 유클리드 호제법으로 빠르게 구할 수 있습니다. 두 수 `a`, `b`에 대해 `gcd(a, b)`는 `b`가 0이 될 때까지 `gcd(b, a % b)`로 바꾸어 계산합니다.

배열에서는 첫 값을 답 후보로 두고, 다음 값과의 최대공약수로 후보를 계속 갱신합니다. 중간에 0이 있어도 `gcd(0, x) = x`로 처리되므로 별도 예외 분기 없이 누적할 수 있습니다.

```js
function largestCommonBundleSize(bundles) {
  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const next = a % b;
      a = b;
      b = next;
    }

    return a;
  }

  let answer = 0;

  for (const count of bundles) {
    answer = gcd(answer, count);
  }

  return answer;
}
```

시간 복잡도는 `O(n log M)`입니다. 여기서 `n`은 배열 길이, `M`은 배열에서 가장 큰 값입니다. 추가 공간은 상수만 사용하므로 `O(1)`입니다.
