import { useContext, useEffect, useState } from "react"
import RadioItem from "../../atoms/Inputs/RadioItem"
import ValidationError from "../../atoms/ValidationError"
import { useFetch } from "../../../hooks/useFetch"
import AuthContext from "../../../context/AuthContext"



const RadioInput = ({ label, onChange, error, value, isEditable = true }) => {
    const [selectedItem, setSelectedItem] = useState(value ?? null)
    const { token } = useContext(AuthContext)

    const { refetch, data, loading, error: reqErr } = useFetch(
        `https://tenapi.palaz.com/api/Main/GetTypeTenderCar/GetTypeTenderCarAsync`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    useEffect(() => {
        if (typeof onChange === "function") {
            onChange(selectedItem);
        }
    }, [selectedItem])

    useEffect(() => {
        refetch()
    }, [])

    return (
        <div className="flex flex-col items-center gap-4">
            <p>{label}</p>
            <div className={"flex items-center flex-wrap justify-end gap-5 w-full px-5 " + `${isEditable ? "" : "pointer-events-none"}`} dir="ltr">
                {loading && <><p className="h-4 w-full loader bg-black/10 rounded-full"></p><p className="h-4 w-full loader bg-black/10 rounded-full"></p></>}

                {reqErr && <p className="text-center font-bold text-Red">{reqErr}</p>}

                {!loading && !error && data && (
                    data.map(item => {
                        return <RadioItem label={item.Name} id={item.Id} key={item.Id} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
                    })
                )}
            </div>
            {error && <ValidationError error={error} />}


        </div>
    )
}

export default RadioInput