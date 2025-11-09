import { forwardRef, useContext, useEffect, useRef, useState } from "react"
import InputLayout from "../../templates/InputLayout"
import num2persian from "num2persian"
import AuthContext from "../../../context/AuthContext "


const InputGroup = forwardRef(({ label, name, type, placeholder, maxLength, error, onChange, value, isEditable = true, setPersianPrice, mode }, ref) => {
    const [val, selVal] = useState(value ?? "")
    const InputRef = useRef()
    const handleFocus = () => {
        const length = event.target.value.length;
        event.target.setSelectionRange(length, length);
    };

    const convertToEnglishNumbers = (str) => {
        if (!str) return "";

        const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];

        let output = str;
        for (let i = 0; i < 10; i++) {
            output = output.replace(persianNumbers[i], i);
        }
        return output;
    };
    const handleChange = () => {
        selVal(convertToEnglishNumbers(InputRef.current.value))
    }


    useEffect(() => {
        if (setPersianPrice) {
            setPersianPrice(num2persian(val))
        }
        onChange(val)
    }, [val])

    return (
        <InputLayout label={label} error={error}>
            <input type={type} name={name} maxLength={maxLength}
                inputMode={mode ?? (type == "number" ? "numeric" : "")}
                pattern={(type == "number" ? /^[0-9۰-۹٠-٩]$/ : "")}
                onFocus={() => (type !== 'number' ? handleFocus() : () => { })} value={val} readOnly={!isEditable} className="border-none placeholder:text-black/40 text-red focus-visible:outline-0 p-3 text-center w-full" placeholder={placeholder} ref={InputRef} onChange={handleChange} />
        </InputLayout>
    )
}
)
export default InputGroup