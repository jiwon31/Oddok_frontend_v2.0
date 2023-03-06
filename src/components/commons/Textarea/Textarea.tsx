import { forwardRef } from "react";
import styles from "./Textarea.module.css";

type TextareaProps = {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  maxLength?: number;
  textLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isInvalid?: boolean;
  content?: string;
};

const Textarea = forwardRef(function Textarea(
  { placeholder, value, disabled, maxLength, textLength, onChange, isInvalid, content }: TextareaProps,
  ref: React.LegacyRef<HTMLTextAreaElement>,
) {
  return (
    <div className={`${styles.text_field} ${isInvalid && styles.invalid}`}>
      <textarea
        className={styles.textarea}
        ref={ref}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        onChange={onChange}
        spellCheck="false"
      >
        {content}
      </textarea>
      {textLength && (
        <span className={styles.text_length}>
          {textLength ?? 0}/{maxLength}
        </span>
      )}
    </div>
  );
});

export default Textarea;
