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