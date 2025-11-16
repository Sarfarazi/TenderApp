import { Controller, useForm } from "react-hook-form"
import BoxLayout from "../templates/BoxLayout"
import InputGroup from "./signUpForm/InputGroup"
import num2persian from "num2persian";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import AuthContext from "../../context/AuthContext";
import SubmitBtn from "../atoms/SubmitBtn";
import ShipmentDate from "../atoms/ShipmentItem/ShipmentDate";
import DestinationArrow from "../atoms/ShipmentItem/DestinationArrow";
import CustomPriceTitle from "../atoms/ShipmentItem/CustomPriceTitle";
import ShipmentStateTitle from "../atoms/ShipmentItem/ShipmentStateTitle";
import ShipmentDesc from "../atoms/ShipmentItem/ShipmentDesc";

// states:
// 0 => available
// 1 => done
// 2 => pending
// 3 => rejected

const ShipmentItem = ({ state, showToast, data: itemData }) => {
    const { phone, token } = useContext(AuthContext)
    const [persianPrice, setPersianPrice] = useState(num2persian(itemData.OfferPrice ?? 20000000))
    const [offerPrice, setOfferPrice] = useState(0)
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({});

    const { refetch, resultCode, loading, error: reqError } = useFetch(
        `https://localhost:7078/api/Main/SendTenderOffers/SendTenderOffersAsync`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "mobile": phone,
                "tenderShippingFormID": itemData?.Id,
                "offerPrice": offerPrice
            }),
        }
    );

    const submit = (data) => {
        setOfferPrice(+data.price)
    }

    useEffect(() => {
        if (offerPrice >= 100000) {
            refetch()
        }
    }, [offerPrice])

    useEffect(() => {
        if (resultCode == 200) {
            showToast(true, null, "پیشنهاد شما با موفقیت ارسال شد؛ منتظر تأیید اپراتور باشید")
        }

        if (reqError) {
            showToast(true, reqError, null)
        }
    }, [resultCode, reqError])

    return (
        <>
            <BoxLayout state={state}>
                <ShipmentDate content={itemData?.StartDate} />
                <DestinationArrow state={state} from={itemData?.Beginning} to={itemData?.Destination} />
                <ShipmentDesc state={state} desc={itemData?.Description} />

                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <CustomPriceTitle state={state} />


                    {state == 0 && <Controller
                        name="price"
                        control={control}
                        rules={{
                            required: "قیمت پیشنهادی را وارد کنید",
                            validate: (value) => {
                                if (value >= 100000) {
                                    return true;
                                }
                                return "لطفاً قیمت را صحیح وارد کنید";
                            }
                        }}
                        render={({ field, fieldState }) => (
                            <InputGroup {...field} type="text" inputMode="numeric" placeholder="20000000" error={fieldState.error?.message} setPersianPrice={setPersianPrice} />

                        )}
                    />}

                    {state !== 0 && <div className={"rounded-2xl w-full overflow-hidden text-center py-3 text-white " + `${(state == 2) ? "bg-Yellow" : (state == 1) ? "bg-Green" : "bg-Red"}`}><p>{itemData.OfferPrice ?? "قیمت یافت نشد"}</p></div>}

                    <p className="-mt-3 opacity-60">{persianPrice} تومان</p>


                    {state == 0 && <div className={"mt-2 w-full " + `${(isValid) ? "" : "pointer-events-none opacity-70"}`}><SubmitBtn loading={loading} context={"ارسال پیشنهاد قیمت"} onClick={handleSubmit(submit)} color={"Red"} /></div>}
                    <ShipmentStateTitle state={state} />
                </div>
            </BoxLayout>
        </>
    )
}

export default ShipmentItem