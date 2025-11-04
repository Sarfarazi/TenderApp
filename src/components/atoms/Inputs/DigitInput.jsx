
import { forwardRef } from "react";

const DigitInput = forwardRef(
  ({ name, refs, setFinalCode, idx, digitCount , onChange }, ref) => {
    const handleKeyDown = (e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
      const isNumber = /^[0-9]$/.test(e.key);

      if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }

      if (e.key == "ArrowRight") {
        if (idx < digitCount) refs[idx].current.focus();
      }
      if (e.key == "ArrowLeft") {
        e.preventDefault();
        if (idx > 1) refs[idx - 2].current.focus();
      }
    };

    const handleChange = (e) => {
      let code = Array.from({ length: digitCount })
        .map((_, i) => {
          return refs[i].current.value;
        })
        .join("");
      setFinalCode(code);
      onChange(code)
      if (refs[idx] && refs[idx].current && e.target.value) {
        refs[idx].current.focus();
      }
    };

    return (
      <input
        type="tel"
        placeholder="0"
        maxLength={1}
        name={name}
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 w-full flex items-center justify-center text-center border aspect-square border-Purple_main rounded-xl font-medium text-body-lg placeholder:text-body-lg placeholder:font-medium placeholder:text-Purple_04/50 focus-visible:outline-0"
      />
    );
  }
);

export default DigitInput;
