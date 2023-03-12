type Block = {
  top: string;
  left?: string;
  width: string;
};

const calculateTop = (hour: number): string => `${hour * 25}px`; // border: 1px, height: 25px
const calculateLeft = (minute: number): string => `${(minute / 60) * 100}%`;
const calculateWidth = (minute: number): string => `calc(${(minute / 60) * 100}% - 1px)`;

export default function createBlocks(startTime: Date, endTime: Date): Block[] {
  const startHour = startTime.getHours();
  const startMinute = startTime.getMinutes();
  const endHour = endTime.getHours();
  const endMinute = endTime.getMinutes();
  const diff = (endHour - startHour) * 60 + endMinute - startMinute;

  const top = calculateTop(startHour);
  const left = calculateLeft(startMinute);

  const blocks = [];
  if (diff <= 60 - startMinute) {
    blocks.push({ top, left, width: calculateWidth(diff) });
  } else {
    blocks.push({ top, left, width: calculateWidth(60 - startMinute) });
    for (let i = startHour + 1; i < endHour; i += 1) {
      blocks.push({ top: calculateTop(i), width: calculateWidth(60) });
    }
    blocks.push({ top: calculateTop(endHour), width: calculateWidth(endMinute) });
  }
  return blocks;
}
