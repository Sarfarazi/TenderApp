import { Controller, useForm } from "react-hook-form";
import InputGroup from "../molecules/signUpForm/InputGroup";
import PelakInput from "../molecules/signUpForm/PelakInput";
import RadioInput from "../molecules/signUpForm/RadioInput";
import ValidationErrorToast from "../atoms/ValidationErrorToast";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import AuthContext from "../../context/AuthContext";
import SubmitBtn from "../atoms/SubmitBtn";
import BaseUrl from "../../BaseUrl";

const SignUpForm = ({
  isAccountPage,
  isEditable,
  userInfo,
  setIsEditable,
  onResend,
  otpLoading,
  otpErr,
  otpData,
  otpResultCode,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = useForm({});
  const nav = useNavigate();
  const [postBody, setPostBody] = useState(null);
  const { phone, setPhone, token, isCompany, setIsCompany } = useContext(AuthContext);

  const {
    refetch,
    data,
    resultCode,
    error: reqError,
    loading,
  } = useFetch(
    `${BaseUrl}/api/Main/${(isAccountPage) ? "CompletingDriverInfor/CompletingDriverInforAsync" : "DriverRegester/DriverRegesterAsync"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...postBody, typeDriver: (isCompany) ? 2 : 1 }),
    }
  )

  const submit = (data) => {
    console.log({...data, typeDriver: (isCompany) ? 2 : 1 })
    setPostBody(data);
  };

  useEffect(() => {
    if (postBody) {
      refetch();
    }
  }, [postBody]);

  useEffect(() => {
    if (resultCode == 200) {
      setPhone(postBody.mobile);
      if (!isAccountPage) {
        onResend(postBody.mobile);
      } else {
        setIsEditable(false);
      }
    }
  }, [resultCode]);

  useEffect(() => {
    if (otpResultCode == 200 && resultCode == 200) {
      localStorage.setItem("canAccessOtp", "true");
      nav("/otpPage");
    }
  }, [otpResultCode]);

  return (
    <>
      {!isAccountPage &&
        <div className="flex items-center bg-neutral-200 inset-shadow-sm p-0.5 rounded-xl mt-8">
          <p className={"flex-1 text-center py-4 rounded-xl cursor-pointer " + `${(isCompany) && "bg-Red text-white shadow-md"}`} onClick={() => { setIsCompany(true) }}>بنگاه باربری</p>
          <p className={"flex-1 text-center py-4 rounded-xl cursor-pointer " + `${(!isCompany) && "bg-Red text-white shadow-md"}`} onClick={() => { setIsCompany(false) }}>راننده</p>
        </div>
      }

      <form className="flex flex-col gap-8 mt-10">
        {(isCompany &&
          <Controller
            name="nameBonga"
            control={control}
            defaultValue={userInfo?.nameBonga}
            rules={{
              required: "نام بنگاه را وارد کنید",
            }}
            render={({ field, fieldState }) => (
              <InputGroup
                {...field}
                label="نام بنگاه باربری"
                type="text"
                placeholder="نام بنگاه باربری"
                error={fieldState.error?.message}
                isEditable={isEditable}
              />
            )}
          />
        )}

        <Controller
          name="name"
          control={control}
          defaultValue={userInfo?.name}
          rules={{
            required: "نام و نام خانوادگی را وارد کنید",
          }}
          render={({ field, fieldState }) => (
            <InputGroup
              {...field}
              label={(isCompany) ? "نام و نام خانوادگی رابط" : "نام و نام خانوادگی"}
              type="text"
              placeholder="علی اکرمی"
              error={fieldState.error?.message}
              isEditable={isEditable}
            />
          )}
        />

        <Controller
          name="mobile"
          control={control}
          defaultValue={userInfo?.mobile ?? phone}
          rules={{
            required: "شماره تماس خود را وارد کنید",
            validate: (value) => {
              const phoneRegex = /^(\+98|0)?9\d{9}$/;
              if (phoneRegex.test(value)) {
                return true;
              }
              return "لطفاً شماره همراه خود را صحیح وارد کنید";
            },
          }}
          render={({ field, fieldState }) => (
            <InputGroup
              {...field}
              label={(isCompany) ? "شماره تماس رابط" : "شماره تماس"}
              type="tel"
              placeholder="09121234567"
              error={fieldState.error?.message}
              isEditable={isAccountPage && false}
            />
          )}
        />

        {!isCompany &&
          <>
            <Controller
              name="carID"
              control={control}
              defaultValue={userInfo?.carID}
              rules={{
                required: "نوع وسیله نقلیه را وارد کنید",
              }}
              render={({ field, fieldState }) => (
                <RadioInput
                  {...field}
                  label="نوع وسیله نقلیه"
                  error={fieldState.error?.message}
                  isEditable={isEditable}
                />
              )}
            />

            <Controller
              name="vehicleBrand"
              control={control}
              defaultValue={userInfo?.vehicleBrand}
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
                  isEditable={isEditable}
                />
              )}
            />

            <Controller
              name="cargoCapacity"
              control={control}
              defaultValue={userInfo?.cargoCapacity}
              rules={{
                required: "ظرفیت حمل بار (تن) را وارد کنید",
              }}
              render={({ field, fieldState }) => (
                <InputGroup
                  {...field}
                  label="ظرفیت حمل بار (تن)"
                  inputMode="numeric"
                  isValInt={true}
                  type="text"
                  placeholder="2"
                  error={fieldState.error?.message}
                  isEditable={isEditable}
                />
              )}
            />

            <Controller
              name="carNo"
              control={control}
              defaultValue={userInfo?.carNo}
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
                  isEditable={isEditable}
                />
              )}
            />
          </>}


        {!isAccountPage && <p className="text-md text-center" onClick={() => nav("/")}>
          قبلا ثبت نام کرده اید؟ <span className="text-Red cursor-pointer">ورود</span>
        </p>}

        {(isEditable || !isAccountPage) && (
          <SubmitBtn
            context={"ثبت اطلاعات"}
            onClick={handleSubmit(submit)}
            color={"Green"}
            loading={loading || otpLoading}
          />
        )}
      </form>
      {!isValid && isSubmitted && !reqError && (
        <ValidationErrorToast error="لطفاً اطلاعات را کامل وارد کنید" />
      )}
      {(reqError || otpErr) && (
        <ValidationErrorToast error={reqError ?? otpErr} />
      )}
    </>
  );
};

export default SignUpForm;
