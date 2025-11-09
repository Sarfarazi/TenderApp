import { forwardRef } from "react"
import InputLayout from "../../templates/InputLayout"
import num2persian from "num2persian"


const InputGroup = forwardRef(({ label, name, type, placeholder, maxLength, error, onChange, value, isEditable = true, setPersianPrice }, ref) => {
    const handleFocus = () => {
        const length = event.target.value.length;
        event.target.setSelectionRange(length, length);
    };

    const convertToEnglishNumbers = (str) => {
        if (!str) return "";

        // اعداد فارسی (۰۱۲۳۴۵۶۷۸۹)
        const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
        // اعداد عربی (٠١٢٣٤٥٦٧٨٩)
        const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

        let output = str;
        for (let i = 0; i < 10; i++) {
            output = output.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
        return output;
    };
    const handleChange = () => {
        if (setPersianPrice) {
            setPersianPrice(num2persian(event.target.value))
        }
        onChange(convertToEnglishNumbers(event.target.value))
    }

    return (
        <InputLayout label={label} error={error}>
            <input type={type} name={name} maxLength={maxLength} onFocus={() => (type !== 'number' ? handleFocus() : () => { })} value={value ?? ""} readOnly={!isEditable} className="border-none placeholder:text-black/40 text-red focus-visible:outline-0 p-3 text-center w-full" placeholder={placeholder} onChange={handleChange} />
        </InputLayout>
    )
}
)
export default InputGroup