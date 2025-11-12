import { useContext, useEffect, useState } from "react"
import ValidationErrorToast from "../atoms/ValidationErrorToast"
import ShipmentItem from "../molecules/ShipmentItem"
import AuthContext from "../../context/AuthContext"
import { useFetch } from "../../hooks/useFetch"


const AvailableShipments = () => {
    const [isToastVisible, setIsToastVisible] = useState({ isVisible: false, error: null, success: null })
    const { token } = useContext(AuthContext)

    const { refetch, data, loading } = useFetch(
        `https://localhost:7078/api/Main/GetBarInfoTender/GetBarInfoTenderAsync`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );


    useEffect(() => {
        refetch()
    }, [])

    const showToast = (isVisible, error, success) => {
        setIsToastVisible({ isVisible, error, success })
    }

    useEffect(() => {
        if (isToastVisible.isVisible) {
            setTimeout(() => {
                setIsToastVisible(false)
            }, 3000)
        }
        return () => { }
    }, [isToastVisible])
    return (
        <section className="flex flex-col gap-5 my-8">
            {isToastVisible.isVisible && <ValidationErrorToast error={isToastVisible.error} success={isToastVisible.success} />}
            {data ?
                <>
                    {data.map(item => {
                        return <ShipmentItem key={item.Id} data={item} showToast={showToast} />
                    })}
                </>
                :
                <><p>loading</p></>}
        </section>
    )
}

export default AvailableShipments