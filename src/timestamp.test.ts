import { expect, test } from '@jest/globals';
import { timestampToUtc } from './timestamp';

test('timestamp 0을 UTC 기준 날짜와 시간으로 변환', () => {
  expect(timestampToUtc('0')).toBe('1970-01-01 00:00:00');
});

test('빈 입력은 오류로 처리한다', () => {
  expect(() => timestampToUtc('')).toThrow('Unix timestamp를 입력해 주세요.');
});

test.each(['abc', '1.5', '1e3', '0x10'])('십진수 정수 형식이 아닌 입력 "%s"는 거절', (input) => {
  expect(() => timestampToUtc(input)).toThrow('Unix timestamp는 정수로 입력해 주세요.');
});

test.each([
  ['1', '1970-01-01 00:00:01'],
  ['-1', '1969-12-31 23:59:59'],
  [' 0 ', '1970-01-01 00:00:00']
])('입력 "%s"를 UTC 결과 "%s"으로 변환', (input, expected) => {
  expect(timestampToUtc(input)).toBe(expected);
});

test('공백만 입력하면 오류 처리', () => {
  expect(() => timestampToUtc('   ')).toThrow('Unix timestamp를 입력해 주세요.');
});

test('날짜 지원 범위를 벗어난 timestamp는 오류로 처리', () => {
  expect(() => timestampToUtc('999999999999999')).toThrow('변환 가능한 날짜 범위를 벗어났습니다.');
});

test.each(['253402300800', '-62167219201'])('네 자리 연도 범위를 벗어난 입력 "%s"는 오류로 처리', (input) => {
  expect(() => timestampToUtc(input)).toThrow('변환 가능한 날짜 범위를 벗어났습니다.');
});