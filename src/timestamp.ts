import { TIMESTAMP_ERROR_MESSAGES } from './errorMessages.ts';

/**
 * @description 초 단위 Unix timestamp 문자열을 UTC 날짜와 시간으로 변환
 * @param input 앞뒤 공백을 허용하는 십진수 정수 문자열
 * @returns UTC 기준 YYYY-MM-DD HH:mm:ss 형식의 문자열
 * @throws 입력이 비어 있거나 십진수 정수 형식이 아닌 경우 오류 발생
 * @throws UTC 기준 연도가 0000부터 9999 범위를 벗어나거나 유효하지 않은 날짜인 경우 오류 발생
 */
export function timestampToUtc(input: string): string {
  const trimmedInput = input.trim();

  if (trimmedInput === '') {
    throw new Error(TIMESTAMP_ERROR_MESSAGES.REQUIRED);
  }

  if (!/^-?\d+$/.test(trimmedInput)) {
    throw new Error(TIMESTAMP_ERROR_MESSAGES.INTEGER_REQUIRED);
  }

  const seconds = Number(trimmedInput);
  const date = new Date(seconds * 1000);
  const utcYear = date.getUTCFullYear();

  if (Number.isNaN(date.getTime()) || utcYear < 0 || utcYear > 9999) {
    throw new Error(TIMESTAMP_ERROR_MESSAGES.OUT_OF_RANGE);
  }

  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// 값을려고 사용한 임시 코드 추후 정리
const getSupportedTimestampRange = () => {
  return {
    minSeconds: Date.parse('0000-01-01T00:00:00Z') / 1000,
    maxSeconds: Date.parse('9999-12-31T23:59:59Z') / 1000
  };
};
console.log(getSupportedTimestampRange());
