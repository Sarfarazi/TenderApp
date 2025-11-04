import { useEffect, useState } from "react"
import RadioItem from "../../atoms/Inputs/RadioItem"
import ValidationError from "../../atoms/ValidationError"



const RadioInput = ({ label, onChange, error, value, isEditable = true }) => {
    const [selectedItem, setSelectedItem] = useState(value ?? null)

    useEffect(() => {
        if (typeof onChange === "function") {
            onChange(selectedItem);
        }
    }, [selectedItem])
    return (
        <div className="flex flex-col items-center gap-4">
            <p>{label}</p>
            <div className={"flex items-center justify-between w-full px-5 " + `${isEditable ? "" : "pointer-events-none"}`} dir="ltr">
                <RadioItem label="کامیون" id="truck" setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
                <RadioItem label="وانت" id="vanet" setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
                <RadioItem label="تریلر" id="trailer" setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
                <RadioItem label="کامیونت" id="comunet" setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
            </div>
            {error && <ValidationError error={error} />}
        </div>
    )
}

export default RadioInput