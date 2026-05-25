---
title: 영업 시간 안의 예약인지 확인하기
slug: check-booking-within-business-hours
track: today
difficulty: easy
topic: time-conversion
tags:
  - daily
  - beginner
  - time
  - validation
  - conversion
order: 1310
function_name: checkBookingWithinBusinessHours
time_limit_ms: 200
primaryMethod: hhmm-to-minutes-range-check
coreIdea: HH:MM 형식의 예약 시작·종료 시각과 영업 시작·종료 시각을 분 단위 숫자로 바꾼 뒤 예약 구간이 영업 구간 안에 완전히 들어오는지 확인한다
gimmick: 시작 시각은 영업 시작과 같아도 되고 종료 시각은 영업 종료와 같아도 되지만, 예약 시작과 종료가 같거나 거꾸로면 유효하지 않다
starter_code: |
  function checkBookingWithinBusinessHours(startTime, endTime, openTime, closeTime) {
    return false;
  }
test_cases:
  - input: ["10:30", "11:20", "09:00", "18:00"]
    output: true
  - input: ["08:50", "09:30", "09:00", "18:00"]
    output: false
  - input: ["17:30", "18:00", "09:00", "18:00"]
    output: true
  - input: ["12:00", "12:00", "09:00", "18:00"]
    output: false
  - input: ["18:00", "18:30", "09:00", "18:00"]
    output: false
---
## 문제 설명
예약 시작 시각 `startTime`, 예약 종료 시각 `endTime`, 영업 시작 시각 `openTime`, 영업 종료 시각 `closeTime`이 `HH:MM` 형식 문자열로 주어집니다.

예약 시간이 영업 시간 안에 완전히 포함되면 `true`, 그렇지 않으면 `false`를 반환하는 `checkBookingWithinBusinessHours` 함수를 작성하세요.

예약은 시작 시각에 시작해서 종료 시각에 끝나는 구간으로 봅니다. 시작 시각이 영업 시작과 같거나, 종료 시각이 영업 종료와 같은 경우는 허용됩니다.

## 제한사항
- 모든 시각은 `00:00`부터 `23:59`까지의 올바른 `HH:MM` 형식 문자열입니다.
- `openTime`은 항상 `closeTime`보다 이릅니다.
- 예약은 같은 날 안에서만 판단합니다.
- `startTime`은 `endTime`보다 반드시 이른 경우에만 유효한 예약입니다.
- 반환값은 불리언 값입니다.

## 예시
- 입력: `"10:30", "11:20", "09:00", "18:00"` → 출력: `true`
- 입력: `"08:50", "09:30", "09:00", "18:00"` → 출력: `false`
- 입력: `"17:30", "18:00", "09:00", "18:00"` → 출력: `true`
- 입력: `"12:00", "12:00", "09:00", "18:00"` → 출력: `false`

## 힌트
- 문자열 상태로 비교하기보다 `시 * 60 + 분` 형태의 숫자로 바꾸면 조건이 단순해집니다.
- 예약 시작은 영업 시작 이상이어야 하고, 예약 종료는 영업 종료 이하이어야 합니다.
- 예약 시작과 종료가 같은 경우는 유효한 예약으로 보지 않습니다.

## 해설
이 문제의 핵심은 `HH:MM` 형식의 시각을 비교하기 쉬운 값으로 바꾸는 것입니다.

예를 들어 `"10:30"`은 `10 * 60 + 30 = 630`분으로 바꿀 수 있습니다. 이렇게 네 개의 시각을 모두 분 단위 숫자로 변환하면 문자열 비교나 시간·분을 따로 나눠 처리할 필요가 없습니다.

판단 조건은 세 가지입니다.

1. 예약 시작 시각이 예약 종료 시각보다 이르다.
2. 예약 시작 시각이 영업 시작 시각보다 같거나 늦다.
3. 예약 종료 시각이 영업 종료 시각보다 같거나 이르다.

세 조건을 모두 만족하면 예약 전체가 영업 시간 안에 들어오므로 `true`를 반환하고, 하나라도 어긋나면 `false`를 반환합니다.

풀이 순서는 다음과 같습니다.

1. `HH:MM` 문자열을 분 단위 숫자로 바꾸는 helper 함수를 만듭니다.
2. `startTime`, `endTime`, `openTime`, `closeTime`을 각각 분으로 변환합니다.
3. `start < end`인지 먼저 확인합니다.
4. `open <= start`이고 `end <= close`인지 확인합니다.
5. 두 조건이 모두 참이면 `true`, 아니면 `false`를 반환합니다.

이 방식은 입력 문자열 네 개만 고정적으로 처리하므로 시간 복잡도는 `O(1)`입니다.
