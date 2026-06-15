---
title: 평균 점수를 가장 가까운 정수로 반올림하기
slug: round-average-score
track: js-basic
difficulty: easy
topic: number-rounding-methods
tags:
  - beginner
  - number
  - js-method
  - Math.round
  - average
order: 1470
function_name: roundAverageScore
time_limit_ms: 200
primaryMethod: Math.round
coreIdea: 점수 배열의 합을 개수로 나눈 평균을 구한 뒤 Math.round로 가장 가까운 정수로 반올림한다
gimmick: 평균의 소수 부분이 정확히 0.5일 때는 더 큰 정수로 반올림하며 모든 점수는 0 이상이다
starter_code: |
  function roundAverageScore(scores) {
    return 0;
  }
test_cases:
  - input: [[80, 90, 95]]
    output: 88
  - input: [[72, 73]]
    output: 73
  - input: [[100]]
    output: 100
  - input: [[0, 1]]
    output: 1
---

점수 배열의 평균을 구하고, 가장 가까운 정수로 반올림해 반환하세요.

## 오늘의 메서드
- 오늘 배울 메서드는 `Math.round()`입니다.
- 소수점이 있는 숫자를 가장 가까운 정수로 반올림할 때 사용합니다.

## 메서드 설명
`Math.round()`는 전달받은 숫자의 소수 부분을 확인해 가장 가까운 정수를 반환합니다.

소수 부분이 `0.5` 이상이면 더 큰 정수로, `0.5` 미만이면 더 작은 정수로 반올림합니다.

## 기본 문법
```js
Math.round(number)
```

- `number`: 반올림할 숫자입니다.
- 반환값은 반올림된 정수입니다.

## 사용 예시
```js
Math.round(4.2); // 4
Math.round(4.5); // 5
Math.round(4.8); // 5
```

## 주의할 점
- `Math.round()`는 소수점 아래를 무조건 버리는 메서드가 아닙니다.
- 소수 부분이 정확히 `0.5`이면 더 큰 정수로 반올림합니다.
- 이 문제의 점수는 모두 0 이상이므로 음수 반올림 규칙은 고려하지 않아도 됩니다.
- `Math.round()`는 원본 숫자나 점수 배열을 변경하지 않습니다.

## 제한사항
- `scores`는 길이가 1 이상 100 이하인 숫자 배열입니다.
- 각 점수는 0 이상 100 이하의 정수입니다.
- 평균은 모든 점수의 합을 `scores.length`로 나누어 구합니다.
- 반환값은 평균을 가장 가까운 정수로 반올림한 숫자입니다.

## 예시
- 입력: `[80, 90, 95]` -> 평균: `88.333...` -> 출력: `88`
- 입력: `[72, 73]` -> 평균: `72.5` -> 출력: `73`
- 입력: `[100]` -> 평균: `100` -> 출력: `100`
- 입력: `[0, 1]` -> 평균: `0.5` -> 출력: `1`

## 힌트
- 먼저 배열의 모든 점수를 더해 합계를 구하세요.
- 합계를 점수 개수로 나눈 값을 `Math.round()`에 전달하면 됩니다.

## 해설
이 문제는 여러 점수의 평균을 구한 뒤 `Math.round()`로 반올림하는 연습입니다.

먼저 반복문으로 모든 점수를 더합니다. 합계를 `scores.length`로 나누면 소수점이 포함될 수 있는 평균을 얻을 수 있습니다. 마지막으로 평균을 `Math.round()`에 전달하면 문제에서 요구하는 가장 가까운 정수가 반환됩니다.

```js
function roundAverageScore(scores) {
  let total = 0;

  for (const score of scores) {
    total += score;
  }

  const average = total / scores.length;
  return Math.round(average);
}
```

직접 소수 부분을 비교해 분기할 수도 있지만, `Math.round()`를 사용하면 반올림하려는 의도가 코드에 분명하게 드러납니다.
