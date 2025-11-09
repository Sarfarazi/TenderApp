import { forwardRef } from "react";

const convertToEnglishNumbers = (str) => {
  if (!str) return "";
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  let output = str;
  for (let i = 0; i < 10; i++) {
    output = output.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
  }
  return output;
};

const DigitInput = forwardRef(
  ({ name, refs, setFinalCode, idx, digitCount, onChange }, ref) => {
    const handleKeyDown = (e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
      const isNumber = /^[0-9۰-۹٠-٩]$/.test(e.key); // ← شامل فارسی و عربی

      if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === "ArrowRight" && idx < digitCount) {
        refs[idx].current.focus();
      }
      if (e.key === "ArrowLeft" && idx > 1) {
        e.preventDefault();
        refs[idx - 2].current.focus();
      }
    };

    const handleChange = (e) => {
      let value = e.target.value;
      // تبدیل اعداد فارسی/عربی به انگلیسی
      value = convertToEnglishNumbers(value);
      e.target.value = value; // ← در input نمایش انگلیسی

      // تشکیل کد نهایی
      const code = Array.from({ length: digitCount })
        .map((_, i) => refs[i].current.value)
        .join("");

      setFinalCode(code);
      onChange(code);

      // رفتن به input بعدی در صورت پر شدن
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
        inputMode="numeric"
        className="flex-1 w-full flex items-center justify-center text-center border aspect-square border-Purple_main rounded-xl font-medium text-body-lg placeholder:text-body-lg placeholder:font-medium placeholder:text-Purple_04/50 focus-visible:outline-0"
      />
    );
  }
);

export default DigitInput;
