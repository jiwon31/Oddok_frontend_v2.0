import { forwardRef } from "react";
import styles from "./Input.module.css";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: () => void;
  textLength?: number;
  isInvalid?: boolean;
};

const Input = forwardRef(function Input(
  { type, placeholder, value, maxLength, onChange, onKeyPress, textLength, isInvalid }: InputProps,
  inputRef: React.LegacyRef<HTMLInputElement>,
) {
  return (
    <div className={`${styles.text_field} ${isInvalid && styles.invalid}`}>
      <input
        className={styles.input}
        ref={inputRef}
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        onKeyPress={onKeyPress}
        spellCheck="false"
      />
      {textLength !== undefined && (
        <span className={styles.text_length}>
          {textLength}/{maxLength}
        </span>
      )}
    </div>
  );
});

export default Input;
