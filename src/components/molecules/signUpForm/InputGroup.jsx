import { forwardRef } from "react"
import InputLayout from "../../templates/InputLayout"
import num2persian from "num2persian"


const InputGroup = forwardRef(({ label, name, type, placeholder, maxLength, error, onChange, value, isEditable = true, setPersianPrice }, ref) => {

    const handleChange = () => {
        if (setPersianPrice) {
            setPersianPrice(num2persian(event.target.value))
        }
        onChange(event.target.value)
    }

    return (
        <InputLayout label={label} error={error}>
            <input type={type} name={name} maxLength={maxLength} value={value ?? ""} readOnly={!isEditable} className="border-none placeholder:text-black/40 text-red focus-visible:outline-0 p-3 text-center w-full" placeholder={placeholder} onChange={handleChange} />
        </InputLayout>
    )
}
)
export default InputGroup