import { useEffect, useRef, useState } from "react"
import ValidationError from "../../atoms/ValidationError"


const PelakInput = ({ error, onChange, value, isEditable = true }) => {
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const [carPlate, setCarPlate] = useState(value ?? "")

    const handleChange = () => {
        setCarPlate(ref1.current.value + ref2.current.value + ref3.current.value + ref4.current.value)
    }


    useEffect(() => {
        if (typeof onChange === "function") {
            onChange(carPlate);
        }
    }, [carPlate])

    return (
        <div className="flex flex-col items-center gap-4">
            <p>شماره پلاک</p>
            <div className="flex items-center justify-between mt-4 gap-4" dir="ltr">
                <div className="border rounded-2xl flex-1">
                    <input type="text" ref={ref1} maxLength={2} readOnly={!isEditable} defaultValue={value?.slice(0, 2) ?? ""} className="border-none text-red placeholder:text-black/40 focus-visible:outline-0 p-3 text-center w-full" placeholder="12" onChange={handleChange} />
                </div>
                <div className="border rounded-2xl flex-1">
                    <input type="text" ref={ref2} maxLength={1} readOnly={!isEditable} defaultValue={value?.[2] ?? ""} className="border-none placeholder:text-black/40 text-red focus-visible:outline-0 p-3 text-center w-full" placeholder="س" onChange={handleChange} />
                </div>
                <div className="border rounded-2xl" style={{ flex: 1.5 }}>
                    <input type="text" ref={ref3} maxLength={3} readOnly={!isEditable} defaultValue={value?.slice(3, 6) ?? ""} className="border-none placeholder:text-black/40 text-red focus-visible:outline-0 p-3 text-center w-full" placeholder="456" onChange={handleChange} />
                </div>
                <div className="border rounded-2xl flex-1 flex items-center justify-center relative">
                    <p className="absolute -top-8">ایران</p>
                    <input type="text" ref={ref4} maxLength={2} readOnly={!isEditable} defaultValue={value?.slice(6, 8) ?? ""} className="border-none placeholder:text-black/40 text-red focus-visible:outline-0 p-3 text-center w-full" placeholder="11" onChange={handleChange} />
                </div>
            </div>
            {(error) && <ValidationError error={error} />}
        </div>
    )
}

export default PelakInput