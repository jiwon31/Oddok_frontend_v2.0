export default function stringifyDate(date: Date): string {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(+date - offset).toISOString();
}
