// yyyy-mm-dd 형태의 문자열을 Date 객체로 변환
export default function dateParsing(value: string): Date {
  const date = new Date(value); // 로컬 타임존이 반영된 시간
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
}
