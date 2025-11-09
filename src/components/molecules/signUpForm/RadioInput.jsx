import { useEffect, useState } from "react"
import RadioItem from "../../atoms/Inputs/RadioItem"
import ValidationError from "../../atoms/ValidationError"



const RadioInput = ({ label, onChange, error, value, isEditable = true , data }) => {
    const [selectedItem, setSelectedItem] = useState(value ?? null)

    useEffect(() => {
        if (typeof onChange === "function") {
            onChange(selectedItem);
        }
    }, [selectedItem])
    return (
        <div className="flex flex-col items-center gap-4">
            <p>{label}</p>
            <div className={"flex items-center flex-wrap justify-end gap-5 w-full px-5 " + `${isEditable ? "" : "pointer-events-none"}`} dir="ltr">
                {data?.map(item => {
                    return <RadioItem label={item.Name} id={item.Id} key={item.Id} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
                })}
            </div>
            {error && <ValidationError error={error} />}
        </div>
    )
}

export default RadioInput