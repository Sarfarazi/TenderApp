import { Controller, useForm } from "react-hook-form";
import CustomPriceTitle from "../atoms/ShipmentItem/CustomPriceTitle";
import InputGroup from "./signUpForm/InputGroup";
import SubmitBtn from "../atoms/SubmitBtn";
import ShipmentStateTitle from "../atoms/ShipmentItem/ShipmentStateTitle";
import { useContext, useEffect, useState } from "react";
import num2persian from "num2persian";
import { useFetch } from "../../hooks/useFetch";
import AuthContext from "../../context/AuthContext";
import PelakInput from "./signUpForm/PelakInput";
import RadioInput from "./signUpForm/RadioInput";

const ShipmentPriceSection = ({ isExpired, state, itemData, showToast }) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({});
  const { phone, token, isCompany } = useContext(AuthContext);
  const [persianPrice, setPersianPrice] = useState(
    num2persian(itemData.OfferPrice || 20000000)
  );
  const [postBody, setPostBody] = useState(null)
  const [isDriverFormOpen, setIsDriverFormOpen] = useState(false)



  const {
    refetch,
    resultCode,
    loading,
    error: reqError,
  } = useFetch(
    `https://tenapi.palaz.com/api/Main/SendTenderOffers/SendTenderOffersAsync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "mobile": phone,
        "tenderShippingFormID": itemData?.Id,
        "offerPrice": postBody?.price,
        "typeDriver": (isCompany) ? 2 : 1,
        "descriptionDriverBonga": (isCompany) ? JSON.stringify(postBody) : ""

      }),
    }
  );

  const submit = (data) => {
    setPostBody(data)
    console.log(JSON.stringify(data))
  }


  useEffect(() => {
    if (postBody?.price >= itemData?.BasePrice / 10) {
      refetch()
    }

  }, [postBody])

  useEffect(() => {
    if (resultCode == 200) {
      showToast(
        true,
        null,
        "پیشنهاد شما با موفقیت ارسال شد؛ منتظر تأیید اپراتور باشید"
      );
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }

    if (reqError) {
      showToast(true, reqError, null);
    }
  }, [resultCode, reqError]);

  return (
    <>

      <div className="w-full border-Gray flex flex-col items-center justify-center gap-4">
        {!isExpired.state && (
          <>
            <CustomPriceTitle state={state} />

            {state == 0 && (
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "قیمت پیشنهادی را وارد کنید",
                  validate: (value) => {
                    if (((itemData?.BasePrice / 10) < 100000) ? value >= 100000 : value >= (itemData?.BasePrice / 10)) {
                      return true;
                    }
                    return "لطفاً قیمت را صحیح وارد کنید";
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputGroup
                    {...field}
                    type="text"
                    inputMode="numeric"
                    placeholder="20000000"
                    error={fieldState.error?.message}
                    setPersianPrice={setPersianPrice}
                  />
                )}
              />
            )}

            {state !== 0 && (
              <div
                className={
                  "rounded-2xl w-full overflow-hidden text-center py-3 text-white " +
                  `${state == 2 ? "bg-Yellow" : state == 1 ? "bg-Green" : "bg-Red"
                  }`
                }
              >
                <p>{itemData.OfferPrice ?? "قیمت یافت نشد"}</p>
              </div>
            )}

            <p className="-mt-3 text-Gray">{persianPrice} تومان</p>
          </>
        )}

        {(!isDriverFormOpen) && state == 0 && <div className={"mt-2 w-full cursor-pointer " + `${(isValid) ? "" : "pointer-events-none opacity-70"}`}><SubmitBtn loading={loading} context={isExpired.state ? "مهلت ثبت درخواست پایان یافت" : (isValid && isCompany) ? "ثبت اطلاعات راننده" : "ارسال پیشنهاد"} onClick={(isCompany) ? () => { setIsDriverFormOpen(true) } : handleSubmit(submit)} color={"Red"} /></div>}

        <ShipmentStateTitle state={state} />
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

        </>}</>
  );
};

export default ShipmentPriceSection;
