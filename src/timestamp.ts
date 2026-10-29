/**
 * @description 초 단위 Unix timestamp 문자열을 UTC 날짜와 시간으로 변환
 * @param input 앞뒤 공백을 허용하는 십진수 정수 문자열
 * @returns UTC 기준 YYYY-MM-DD HH:mm:ss 형식의 문자열
 * @throws 입력이 비어 있거나 십진수 정수 형식이 아닌 경우 오류 발생
 * @throws JavaScript Date 지원 범위를 벗어난 경우 RangeError 발생
 */
export function timestampToUtc(input: string): string {
  const trimmedInput = input.trim();

  if (trimmedInput === '') {
    throw new Error('Unix timestamp를 입력해 주세요.');
  }

  if (!/^-?\d+$/.test(trimmedInput)) {
    throw new Error('Unix timestamp는 정수로 입력해 주세요.');
  }

  const seconds = Number(trimmedInput);
  const date = new Date(seconds * 1000);

  return date.toISOString().slice(0, 19).replace('T', ' ');
}
