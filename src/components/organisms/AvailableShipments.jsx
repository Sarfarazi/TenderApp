import { useEffect, useState } from "react"
import ValidationErrorToast from "../atoms/ValidationErrorToast"
import ShipmentItem from "../molecules/ShipmentItem"


const AvailableShipments = () => {
    const [isToastVisible, setIsToastVisible] = useState(false)

    useEffect(() => {
        if (isToastVisible) {
            setTimeout(() => {
                setIsToastVisible(false)
            }, 3000)
        }
        return () => { }
    }, [isToastVisible])
    return (
        <section className="flex flex-col gap-5 my-8">
            {isToastVisible && <ValidationErrorToast success={"پیشنهاد شما با موفقیت ارسال شد؛ منتظر تأیید اپراتور باشید"} />}
            <ShipmentItem setIsToastVisible={setIsToastVisible} />
            <ShipmentItem setIsToastVisible={setIsToastVisible} />
            <ShipmentItem setIsToastVisible={setIsToastVisible} />
            <ShipmentItem setIsToastVisible={setIsToastVisible} />
            <ShipmentItem setIsToastVisible={setIsToastVisible} />
            <ShipmentItem setIsToastVisible={setIsToastVisible} />
        </section>
    )
}

export default AvailableShipments