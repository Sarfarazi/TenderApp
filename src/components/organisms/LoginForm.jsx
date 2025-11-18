import { data, useNavigate } from "react-router-dom";
import BoxLayout from "../templates/BoxLayout";
import InputGroup from "../molecules/signUpForm/InputGroup";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import SubmitBtn from "../atoms/SubmitBtn";
import ValidationErrorToast from "../atoms/ValidationErrorToast";

const LoginForm = () => {
  const nav = useNavigate();
  const { phone, setPhone, token } = useContext(AuthContext);
  const { control, handleSubmit } = useForm();

  const { refetch, resultCode, error, loading, data } = useFetch(
    `https://localhost:7078/api/OTP/OTP/OTPAsync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone: phone,
      }),
    }
  );

  const submit = (data) => {
    setPhone(data.phone);
    if (data.phone) {
      refetch({
        body: JSON.stringify({
          phone: phone || data.phone,
        }),
      });
    }
  };

  useEffect(() => {
    if (resultCode == 200) {
      if (data.iSRegister) {
        localStorage.setItem("canAccessOtp", "true");
        nav("/otpPage");
      } else {
        nav("/signUp");
      }
    }
  }, [resultCode]);

  return (
    <BoxLayout>
      <form className="w-full flex flex-col gap-5 items-center">
        <h1 className="text-2xl">ورود یا ثبت نام</h1>
        <Controller
          control={control}
          defaultValue={phone ?? ""}
          name="phone"
          rules={{
            required: "وارد کردن شماره موبایل الزامی است.",
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
              name="phone"
              label="شماره همراه خود را وارد کنید."
              error={fieldState.error?.message}
              type="tel"
            />
          )}
        />
        <SubmitBtn
          context={"ورود"}
          onClick={handleSubmit(submit)}
          color={"Red"}
          loading={loading}
        />
        <p className="text-sm" onClick={() => nav("/signUp")}>
          قبلا ثبت نام نکرده اید؟ <span className="text-Red">ثبت نام</span>
        </p>
      </form>
      {error && <ValidationErrorToast error={error} />}
    </BoxLayout>
  );
};

export default LoginForm;
