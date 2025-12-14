import BoxLayout from "../templates/BoxLayout";
import ShipmentDate from "../atoms/ShipmentItem/ShipmentDate";
import DestinationArrow from "../atoms/ShipmentItem/DestinationArrow";
import ShipmentDesc from "../atoms/ShipmentItem/ShipmentDesc";
import ShipmentTimer from "./ShipmentTimer";
<<<<<<< HEAD
import BaseUrl from "../../BaseUrl";
import RadioInput from "./signUpForm/RadioInput";
import PelakInput from "./signUpForm/PelakInput";
=======
import ShipmentDetail from "../atoms/ShipmentItem/ShipmentDetail";
import ShipmentPriceSection from "./ShipmentPriceSection";
import { useState } from "react";
>>>>>>> d0dca31e23e78dacf17b3e8f561441bbcf966007

// states:
// 0 => available
// 1 => done
// 2 => pending
// 3 => rejected

const ShipmentItem = ({ state, showToast, data: itemData }) => {
<<<<<<< HEAD
    const { phone, token, isCompany } = useContext(AuthContext)
    const [persianPrice, setPersianPrice] = useState(num2persian(itemData.OfferPrice || 20000000))
    const [isExpired, setIsExpired] = useState({ state: false, time: 0 })
    const [isDriverFormOpen, setIsDriverFormOpen] = useState(false)
    const [postBody, setPostBody] = useState(null)
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({});

    const { refetch, resultCode, loading, error: reqError } = useFetch(
        `${BaseUrl}/api/Main/SendTenderOffers/SendTenderOffersAsync`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "mobile": phone,
                "tenderShippingFormID": itemData?.Id,
                "offerPrice": postBody?.price,
                
            }),
        }
    );

    const submit = (data) => {
        setPostBody(data)
        console.log(data)
    }


    useEffect(() => {
        if (postBody?.price >= 100000) {
            if (!isCompany)
                refetch()
        }

    }, [postBody])
=======
  const [isExpired, setIsExpired] = useState(false);

  return (
    <>
      <BoxLayout state={state}>
        <div className={"flex flex-col gap-5 items-center w-full "}>
          {state == 0 && itemData?.SaveDate && itemData?.TenderDuration && (
            <ShipmentTimer
              setIsExpired={setIsExpired}
              startTime={itemData?.SaveDate}
              duration={itemData?.TenderDuration}
            />
          )}

          <ShipmentDate content={itemData?.StartDate} />
          <DestinationArrow
            state={state}
            from={itemData?.Beginning}
            to={itemData?.Destination}
          />

          <div className="self-start flex flex-col gap-2 w-full border-b pb-5">
            {itemData?.WeightApprox && (
              <ShipmentDetail
                title={"وزن بار"}
                value={itemData?.WeightApprox}
                isWeight={true}
              />
            )}
            {itemData?.LoadTypeName && (
              <ShipmentDetail
                title={"نوع بار"}
                value={itemData?.LoadTypeName}
              />
            )}
          </div>
>>>>>>> d0dca31e23e78dacf17b3e8f561441bbcf966007

          {itemData?.Description && (
            <ShipmentDesc state={state} desc={itemData?.Description} />
          )}

          <ShipmentPriceSection
            isExpired={isExpired}
            state={state}
            itemData={itemData}
            showToast={showToast}
          />
        </div>
      </BoxLayout>
    </>
  );
};

<<<<<<< HEAD
    return (
        <>
            {(isExpired.time > -(86400000 * 2)) &&
                <BoxLayout state={state}>
                    <div className={"flex flex-col gap-5 items-center w-full " + `${isExpired.state && "pointer-events-none opacity-50"}`}>
                        {(state == 0 && itemData?.SaveDate && itemData?.TenderDuration) && <ShipmentTimer setIsExpired={setIsExpired} startTime={itemData?.SaveDate} duration={itemData?.TenderDuration} />}

                        <ShipmentDate content={itemData?.StartDate} />
                        <DestinationArrow state={state} from={itemData?.Beginning} to={itemData?.Destination} />
                        {itemData?.Description && <ShipmentDesc state={state} desc={itemData?.Description} />}

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


                            {(!isDriverFormOpen) && state == 0 && <div className={"mt-2 w-full cursor-pointer " + `${(isValid) ? "" : "pointer-events-none opacity-70"}`}><SubmitBtn loading={loading} context={isExpired.state ? "مهلت ثبت درخواست پایان یافت" : (isValid && isCompany) ? "ثبت اطلاعات راننده" : "ارسال پیشنهاد"} onClick={(isCompany) ? () => { setIsDriverFormOpen(true) } : handleSubmit(submit)} color={"Red"} /></div>}

                            <ShipmentStateTitle state={state} />
                        </div>
                    </div>

                    {isDriverFormOpen &&
                        <>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "نام راننده را وارد کنید",
                                }}
                                render={({ field, fieldState }) => (
                                    <InputGroup
                                        {...field}
                                        label="نام و نام خانوادگی راننده"
                                        type="text"
                                        placeholder="علی اکرمی"
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="mobile"
                                control={control}
                                rules={{
                                    required: "شماره تماس راننده را وارد کنید",
                                    validate: (value) => {
                                        const phoneRegex = /^(\+98|0)?9\d{9}$/;
                                        if (phoneRegex.test(value)) {
                                            return true;
                                        }
                                        return "لطفاً شماره همراه را صحیح وارد کنید";
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <InputGroup
                                        {...field}
                                        label="شماره تماس راننده"
                                        type="tel"
                                        placeholder="09121234567"
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />


                            <Controller
                                name="carID"
                                control={control}
                                rules={{
                                    required: "نوع وسیله نقلیه را وارد کنید",
                                }}
                                render={({ field, fieldState }) => (
                                    <RadioInput
                                        {...field}
                                        label="نوع وسیله نقلیه"
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="vehicleBrand"
                                control={control}
                                rules={{
                                    required: "نام تجاری وسیله نقلیه را وارد کنید",
                                }}
                                render={({ field, fieldState }) => (
                                    <InputGroup
                                        {...field}
                                        label="نام تجاری وسیله نقلیه"
                                        type="text"
                                        placeholder="وانت نیسان"
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="cargoCapacity"
                                control={control}
                                rules={{
                                    required: "ظرفیت حمل بار (تن) را وارد کنید",
                                }}
                                render={({ field, fieldState }) => (
                                    <InputGroup
                                        {...field}
                                        label="ظرفیت حمل بار (تن)"
                                        mode="numeric"
                                        type="text"
                                        placeholder="2"
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="carNo"
                                control={control}
                                rules={{
                                    required: "شماره پلاک را وارد کنید",
                                    validate: (value) => {
                                        const plateRegex = /^[0-9۰-۹]{2}[آ-ی][0-9۰-۹]{5}$/;
                                        if (plateRegex.test(value)) {
                                            return true;
                                        }
                                        return "لطفاً شماره پلاک را صحیح وارد کنید";
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <PelakInput
                                        {...field}
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />
                            {state == 0 && <div className={"mt-2 w-full cursor-pointer " + `${(isValid) ? "" : "pointer-events-none opacity-70"}`}> <SubmitBtn loading={loading} context={"ثبت درخواست"} onClick={handleSubmit(submit)} color={"Green"} /></div>}

                        </>}
                </BoxLayout>
            }

        </>
    )
}

export default ShipmentItem
=======
export default ShipmentItem;
>>>>>>> d0dca31e23e78dacf17b3e8f561441bbcf966007
