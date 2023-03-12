import React from "react";
import createBlocks from "./TimeRecord.helpers";
import styles from "./TimeRecordBlock.module.css";

type TimeRecordBlockProps = {
  startTime: Date;
  endTime: Date;
  color: string;
};

function TimeRecordBlock({ startTime, endTime, color }: TimeRecordBlockProps) {
  const blocks = createBlocks(startTime, endTime);

  return (
    <div>
      {blocks.map((block, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className={styles.block} style={{ ...block, backgroundColor: color }} />
      ))}
    </div>
  );
}

export default React.memo(TimeRecordBlock);
