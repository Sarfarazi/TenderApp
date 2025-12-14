import { Controller, useForm } from "react-hook-form";
import CustomPriceTitle from "../atoms/ShipmentItem/CustomPriceTitle";
import InputGroup from "./signUpForm/InputGroup";
import SubmitBtn from "../atoms/SubmitBtn";
import ShipmentStateTitle from "../atoms/ShipmentItem/ShipmentStateTitle";
import { useContext, useEffect, useState } from "react";
import num2persian from "num2persian";
import { useFetch } from "../../hooks/useFetch";
import AuthContext from "../../context/AuthContext";

const ShipmentPriceSection = ({ isExpired, state, itemData, showToast }) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({});
  const { phone, token } = useContext(AuthContext);
  const [persianPrice, setPersianPrice] = useState(
    num2persian(itemData.OfferPrice || 20000000)
  );
  const [offerPrice, setOfferPrice] = useState(0);

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
        mobile: phone,
        tenderShippingFormID: itemData?.Id,
        offerPrice: offerPrice,
      }),
    }
  );

  const submit = (data) => {
    setOfferPrice(+data.price);
  };

  useEffect(() => {
    if (offerPrice >= 100000) {
      refetch();
    }
  }, [offerPrice]);

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
    <div className="w-full border-Gray flex flex-col items-center justify-center gap-4">
      {!isExpired && (
        <>
          <CustomPriceTitle state={state} />

          {state == 0 && (
            <Controller
              name="price"
              control={control}
              rules={{
                required: "قیمت پیشنهادی را وارد کنید",
                validate: (value) => {
                  if (value >= 100000) {
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
                `${
                  state == 2 ? "bg-Yellow" : state == 1 ? "bg-Green" : "bg-Red"
                }`
              }
            >
              <p>{itemData.OfferPrice ?? "قیمت یافت نشد"}</p>
            </div>
          )}

          <p className="-mt-3 text-Gray">{persianPrice} تومان</p>
        </>
      )}

      {state == 0 && (
        <div
          className={
            "mt-2 w-full " +
            `${isValid ? "" : "pointer-events-none opacity-70"}`
          }
        >
          <SubmitBtn
            loading={loading}
            context={
              isExpired ? "مهلت ثبت درخواست پایان یافت" : "ارسال پیشنهاد قیمت"
            }
            onClick={isExpired ? () => {} : handleSubmit(submit)}
            color={"Red"}
          />
        </div>
      )}
      <ShipmentStateTitle state={state} />
    </div>
  );
};

export default ShipmentPriceSection;
