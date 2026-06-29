---
title: 예약 코드에서 날짜 구간 꺼내기
slug: extract-reservation-date-segment
track: js-basic
difficulty: easy
topic: string-substring-methods
tags:
  - beginner
  - string
  - js-method
  - substring
  - extraction
order: 1570
function_name: extractReservationDateSegment
time_limit_ms: 200
primaryMethod: String.substring
coreIdea: 고정 형식 예약 코드에서 날짜가 들어 있는 시작 인덱스와 끝 인덱스를 지정해 substring으로 날짜 부분만 잘라낸다
gimmick: substring의 두 번째 인덱스는 결과에 포함되지 않으므로 날짜 끝 바로 다음 위치를 넣어야 한다
starter_code: |
  function extractReservationDateSegment(code) {
    return "";
  }
test_cases:
  - input: ["RSV-2026-06-29-A1"]
    output: "2026-06-29"
  - input: ["RSV-2025-12-03-B7"]
    output: "2025-12-03"
  - input: ["RSV-2030-01-01-Z9"]
    output: "2030-01-01"
  - input: ["RSV-2024-02-29-L2"]
    output: "2024-02-29"
---
## 문제 설명
예약 코드 안에서 날짜가 들어 있는 고정 구간만 잘라 반환하는 문제입니다.

## 오늘의 메서드
- 오늘 배울 메서드는 `String.substring()`입니다.
- 문자열에서 시작 위치와 끝 위치를 정해 필요한 일부 구간만 꺼낼 때 사용합니다.

## 메서드 설명
`substring()`은 문자열의 일부를 잘라 새 문자열로 반환합니다.

첫 번째 인덱스부터 시작하고, 두 번째 인덱스 바로 앞 글자까지 가져옵니다. 원본 문자열은 바뀌지 않습니다.

## 기본 문법
```js
str.substring(startIndex, endIndex)
```

- `startIndex`: 자르기 시작할 인덱스입니다.
- `endIndex`: 자르기를 멈출 인덱스입니다. 이 위치의 글자는 결과에 포함되지 않습니다.
- 반환값은 지정한 구간만 담은 새 문자열입니다.

## 사용 예시
```js
"RSV-2026-06-29-A1".substring(4, 14); // "2026-06-29"
"HELLO".substring(1, 4); // "ELL"
```

## 주의할 점
- 문자열 인덱스는 0부터 시작합니다.
- 두 번째 인덱스 위치의 글자는 포함되지 않습니다.
- `substring()`은 원본 문자열을 직접 수정하지 않습니다.
- `slice()`와 비슷하지만 음수 인덱스를 다루는 방식이 다릅니다. 이 문제에서는 양수 인덱스만 사용합니다.

## 제한사항
- `code`는 항상 `"RSV-YYYY-MM-DD-XX"` 형식의 문자열입니다.
- 날짜 구간은 항상 인덱스 4에서 시작해 인덱스 14 바로 앞에서 끝납니다.
- 날짜는 그대로 문자열로 반환합니다.
- 입력 문자열의 길이는 항상 17입니다.

## 예시
- 입력: `"RSV-2026-06-29-A1"` -> 출력: `"2026-06-29"`
- 입력: `"RSV-2025-12-03-B7"` -> 출력: `"2025-12-03"`
- 입력: `"RSV-2030-01-01-Z9"` -> 출력: `"2030-01-01"`
- 입력: `"RSV-2024-02-29-L2"` -> 출력: `"2024-02-29"`

## 힌트
- `"RSV-"`는 4글자이므로 날짜는 인덱스 4부터 시작합니다.
- 날짜 문자열 `"YYYY-MM-DD"`는 10글자입니다.
- 끝 인덱스는 포함되지 않으므로 `4 + 10`인 `14`를 넣으면 됩니다.

## 해설
이 문제는 문자열에서 위치가 정해진 일부 구간을 꺼내는 연습입니다.

예약 코드는 항상 같은 형식이므로 날짜가 어디서 시작하고 어디서 끝나는지 매번 계산할 필요가 없습니다. 앞의 `"RSV-"` 다음부터 날짜가 시작하므로 시작 인덱스는 `4`입니다. 날짜는 `YYYY-MM-DD` 형식으로 10글자이기 때문에 끝 인덱스는 `14`가 됩니다.

```js
function extractReservationDateSegment(code) {
  return code.substring(4, 14);
}
```

직접 반복문으로 글자를 하나씩 모을 수도 있지만, `substring()`을 쓰면 "문자열의 정해진 구간을 꺼낸다"는 의도가 더 분명하게 드러납니다.
