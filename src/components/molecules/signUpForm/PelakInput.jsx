import { useEffect, useRef, useState } from "react"
import ValidationError from "../../atoms/ValidationError"


const PelakInput = ({ error, onChange, value, isEditable = true }) => {
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const [firstTwoDigit, setFirstTwoDigit] = useState(value?.slice(0, 2) ?? "")
    const [letter, setLetter] = useState(value?.[2] ?? "")
    const [threeDigit, setThreeDigit] = useState(value?.slice(3, 6) ?? "")
    const [cityCode, setCityCode] = useState(value?.slice(6, 8) ?? "")
    const [carPlate, setCarPlate] = useState(value ?? "")

    const convertToEnglishNumbers = (str) => {
        if (!str) return "";

        const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];

        let output = str;
        for (let i = 0; i < 10; i++) {
            output = output.replace(persianNumbers[i], i);
        }
        return output;
    };

    const handleFocus = (e) => {
        const length = e.target.value.length;
        e.target.setSelectionRange(length, length);
    };

    useEffect(() => {
        setCarPlate(firstTwoDigit + letter + threeDigit + cityCode)

    }, [firstTwoDigit, letter, threeDigit, cityCode])


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
                    <input type="text" inputMode="numeric" ref={ref1} maxLength={2} onFocus={handleFocus} readOnly={!isEditable} value={firstTwoDigit} className="border-none text-Red placeholder:text-black/40 focus-visible:outline-0 p-3 text-center w-full" placeholder="12" onChange={() => { setFirstTwoDigit(() => convertToEnglishNumbers(ref1.current.value)) }} />
                </div>
                <div className="border rounded-2xl flex-1">
                    <input type="text" ref={ref2} maxLength={1} readOnly={!isEditable} value={letter} className="border-none placeholder:text-black/40 text-Red focus-visible:outline-0 p-3 text-center w-full" placeholder="س" onChange={() => { setLetter(ref2.current.value) }} />
                </div>
                <div className="border rounded-2xl" style={{ flex: 1.5 }}>
                    <input type="text" inputMode="numeric" ref={ref3} maxLength={3} readOnly={!isEditable} value={threeDigit} className="border-none placeholder:text-black/40 text-Red focus-visible:outline-0 p-3 text-center w-full" placeholder="456" onChange={() => { setThreeDigit(() => convertToEnglishNumbers(ref3.current.value)) }} />
                </div>
                <div className="border rounded-2xl flex-1 flex items-center justify-center relative">
                    <p className="absolute -top-8">ایران</p>
                    <input type="text" inputMode="numeric" ref={ref4} maxLength={2} readOnly={!isEditable} value={cityCode} className="border-none placeholder:text-black/40 text-Red focus-visible:outline-0 p-3 text-center w-full" placeholder="11" onChange={() => { setCityCode( () => convertToEnglishNumbers(ref4.current.value)) }} />
                </div>
            </div>
            {(error) && <ValidationError error={error} />}
        </div>
    )
}

export default PelakInput