import { Controller, useForm } from "react-hook-form"
import BoxLayout from "../templates/BoxLayout"
import InputGroup from "./signUpForm/InputGroup"
import num2persian from "num2persian";
import { useContext, useEffect, useState } from "react";
import StateIcon from "../atoms/ShippingItem/StateIcon";
import { useFetch } from "../../hooks/useFetch";
import AuthContext from "../../context/AuthContext";
import ValidationErrorToast from "../atoms/ValidationErrorToast";

// states:
// 0 => available
// 1 => pending
// 2 => done
// 3 => rejected

const ShipmentItem = ({ state = 0, showToast, data: itemData }) => {
    const { phone, token } = useContext(AuthContext)
    const [persianPrice, setPersianPrice] = useState(num2persian(20000000))
    const [offerPrice, setOfferPrice] = useState(0)
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({});

    const { refetch, data, resultCode, loading, error: reqError } = useFetch(
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
            {/* {(reqError) && <ValidationErrorToast error={reqError} />} */}
            <BoxLayout state={state}>
                <p className="text-xl">{itemData?.StartDate}</p>
                <div className="w-full border-b pb-5">
                    <div className="flex items-center justify-between w-full px-4 mb-1">
                        <div className="w-4.5 h-4.5 rounded-full shrink-0 bg-green"></div>
                        <div className="w-full flex items-center relative justify-center">
                            {state !== 0 && <StateIcon state={state} />}
                            <div className="h-0.5 bg-black w-full"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                                <path d="M9 6.77344C9.55228 6.77344 10 6.32572 10 5.77344C10 5.22115 9.55228 4.77344 9 4.77344V5.77344V6.77344ZM0 5.77344L10 11.5469V-6.51919e-05L0 5.77344Z" fill="black" />
                            </svg>
                        </div>
                        <div className="w-4.5 h-4.5 rounded-full shrink-0 bg-red mr-1"></div>
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col items-center justify-center">
                            <p className='text-center text-red text-lg'>{itemData?.Beginning}</p>
                            <p className='text-center text-sm'>انبار پالاز</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className='text-center text-red text-lg'>{itemData?.Destination}</p>
                            <p className='text-center text-sm'>خانه پالاز</p>
                        </div>
                    </div>
                </div>

                <div className="w-full border-b pb-5 flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <div className={"w-5 h-5 rounded-md " + `${(state == 1) ? "bg-yellow" : (state == 2) ? "bg-green" : (state == 3) ? "bg-red" : "bg-red"}`}></div>
                        <p>10 تن موکت تافتینگ</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={"w-5 h-5 rounded-md " + `${(state == 1) ? "bg-yellow" : (state == 2) ? "bg-green" : (state == 3) ? "bg-red" : "bg-red"}`}></div>
                        <p>4 تن اس پی سی</p>
                    </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center gap-4">
                    {state == 0 && <p className="text-lg">پیشنهاد قیمت (تومان)</p>}
                    {state == 1 && <p className="text-lg">کرایه پیشنهاد شده</p>}
                    {state == 2 && <p className="text-lg">کرایه پرداخت شده</p>}
                    {state == 3 && <p className="text-lg">کرایه پیشنهاد شده</p>}


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

                    {state !== 0 && <div className={"rounded-2xl w-full overflow-hidden text-center py-3 text-white " + `${(state == 1) ? "bg-yellow" : (state == 2) ? "bg-green" : "bg-red"}`}><p>2000000</p></div>}

                    <p className="-mt-3 opacity-60">{persianPrice} تومان</p>

                    {state == 0 && <div className={"w-full m-auto p-4 text-center rounded-2xl text-white bg-red mt-2 " + `${(isValid) ? "" : "pointer-events-none opacity-70"}`} onClick={handleSubmit(submit)}>{loading ? <p>loading</p> : <p>ارسال پیشنهاد قیمت</p>}</div>}
                    {state == 1 && <p className="text-xl text-yellow">در حال بررسی پیشنهاد</p>}
                    {state == 2 && <p className="text-xl text-green">تکمیل شده !</p>}
                    {state == 3 && <><p className="text-xl text-red">پیشنهاد شما رد شد.</p>
                        {/* <p className="w-full m-auto p-4 text-center rounded-2xl text-black border border-red mt-2">پیشنهاد قیمت جدید</p> */}
                    </>}
                </div>
            </BoxLayout>
        </>
    )
}

export default ShipmentItem