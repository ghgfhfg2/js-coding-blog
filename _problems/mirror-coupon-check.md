---
title: 거꾸로 읽어도 같은 쿠폰인지 확인하기
slug: mirror-coupon-check
track: today
difficulty: easy
topic: palindrome-check
tags:
  - daily
  - beginner
  - string
  - palindrome
  - two-pointers
order: 40
function_name: isMirrorCoupon
time_limit_ms: 200
primaryMethod: two-end-character-check
coreIdea: 문자열의 왼쪽과 오른쪽 끝에서 동시에 안쪽으로 좁혀 오며 대응 문자가 모두 같은지 확인해 대칭 문자열 여부를 판별한다
gimmick: 가운데 문자는 따로 처리할 필요 없고 한 번이라도 불일치가 나오면 바로 false를 반환할 수 있다
starter_code: |
  function isMirrorCoupon(code) {
    return false;
  }
test_cases:
  - input: ["LEVEL"]
    output: true
  - input: ["ABCA"]
    output: false
  - input: ["A"]
    output: true
  - input: [""]
    output: true
  - input: ["1221"]
    output: true
---
## 문제 설명
문자열 `code`가 주어질 때, 앞에서 읽은 결과와 뒤에서 읽은 결과가 완전히 같으면 `true`, 아니면 `false`를 반환하는 `isMirrorCoupon` 함수를 작성하세요.

예를 들어 `"LEVEL"`은 거꾸로 읽어도 그대로 `"LEVEL"`이므로 `true`입니다. 반면 `"ABCA"`는 뒤집으면 `"ACBA"`가 되어 다르므로 `false`입니다.

## 제한사항
- `code`의 길이는 `0` 이상 `100,000` 이하입니다.
- `code`는 영문 대문자와 숫자로만 이루어집니다.
- 대소문자를 바꿔 비교하지 않습니다.
- 반환값은 대칭 문자열이면 `true`, 아니면 `false`입니다.

## 예시
- 입력: `"LEVEL"` → 출력: `true`
- 입력: `"ABCA"` → 출력: `false`
- 입력: `"A"` → 출력: `true`
- 입력: `""` → 출력: `true`

## 힌트
- 문자열 전체를 뒤집어서 비교할 수도 있지만, 꼭 새 문자열을 만들 필요는 없습니다.
- 맨 앞 문자와 맨 뒤 문자가 다르면 바로 정답을 알 수 있습니다.
- 왼쪽 인덱스와 오른쪽 인덱스를 안쪽으로 한 칸씩 움직여 보세요.

## 해설
이 문제는 문자열이 **대칭인지 검사하는 기본 투 포인터 문제**입니다.

풀이 방법은 간단합니다.

1. 왼쪽 포인터를 문자열의 시작에 둡니다.
2. 오른쪽 포인터를 문자열의 끝에 둡니다.
3. 두 포인터가 가리키는 문자가 같으면 둘 다 안쪽으로 한 칸 이동합니다.
4. 한 번이라도 문자가 다르면 바로 `false`를 반환합니다.
5. 끝까지 문제없이 통과하면 `true`를 반환합니다.

예를 들어 `"LEVEL"`은 다음처럼 확인합니다.

- `L` 과 `L` 비교, 같음
- `E` 과 `E` 비교, 같음
- 가운데 `V`는 자동으로 통과

반대로 `"ABCA"`는:

- `A` 와 `A` 비교, 같음
- `B` 와 `C` 비교, 다름 → 즉시 `false`

이 방식은 문자열을 한 번의 절반 정도만 확인하므로 시간 복잡도는 `O(n)`이고, 추가 배열 없이 포인터만 쓰면 추가 공간은 `O(1)`입니다.
