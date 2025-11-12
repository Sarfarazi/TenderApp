import { useContext, useEffect, useState } from "react"
import ValidationErrorToast from "../atoms/ValidationErrorToast"
import ShipmentItem from "../molecules/ShipmentItem"
import AuthContext from "../../context/AuthContext"
import { useFetch } from "../../hooks/useFetch"
import ShipmentItemLoading from "../molecules/loading/ShipmentItemLoading"


const AvailableShipments = () => {
    const [isToastVisible, setIsToastVisible] = useState({ isVisible: false, error: null, success: null })
    const { token } = useContext(AuthContext)

    const { refetch, data, error } = useFetch(
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


    return (
        <section className="flex flex-col gap-5 my-8">
            {isToastVisible.isVisible && <ValidationErrorToast error={isToastVisible.error} success={isToastVisible.success} />}
            {data ?
                <>
                    {data?.map(item => {
                        return <ShipmentItem key={item.Id} data={item} showToast={showToast} state={0} />
                    })}
                </>
                :
                <>
                    <ShipmentItemLoading key={1} />
                    <ShipmentItemLoading key={2} />
                </>
            }
            {error && <p>{error}</p>}
        </section>
    )
}

export default AvailableShipments