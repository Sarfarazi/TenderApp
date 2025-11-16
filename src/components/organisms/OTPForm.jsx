import { Controller, useForm } from "react-hook-form";
import DigitInput from "../atoms/Inputs/DigitInput"
import BoxLayout from "../templates/BoxLayout"
import { useContext, useEffect, useRef, useState } from "react";
import ValidationErrorToast from "../atoms/ValidationErrorToast";
import { useNavigate } from "react-router-dom";
import OtpTimer from "./OtpTimer";
import AuthContext from "../../context/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import SubmitBtn from "../atoms/SubmitBtn";


const OTPForm = ({ setIsVerify, isExpired, onResend }) => {
    const nav = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitted },
    } = useForm({});
    const [otp, setOtp] = useState(null)
    const { setIsLoggedIn, phone, setPhone, token } = useContext(AuthContext)

    const { error, refetch, resultCode , loading } = useFetch(
        `https://tenapi.palaz.com/api/OTP/ConfirmOTP/ConfirmOTPAsync`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                phone: phone,
                code: otp
            }),
        }
    );

    const refs = useRef([]);
    if (refs.current.length !== 4) {
        refs.current = Array(4)
            .fill(null)
            .map((_, i) => refs.current[i] || { current: null });
    }

    const submit = (data) => {
        setOtp(data.digit1)
    };

    useEffect(() => {
        if (otp && otp.length == 4) {
            refetch()
        }
    }, [otp])

    useEffect(() => {
        if (resultCode == 200) {
            setIsLoggedIn(true)
            setIsVerify(true)
        }
    }, [resultCode])

    return (
        <>
            {(!isValid && isSubmitted && !resultCode) && <ValidationErrorToast error="کد منقضی شده یا اشتباه است" />}
            {(resultCode && resultCode !== 200) && <ValidationErrorToast error={error} />}
            <BoxLayout>
                <form className="w-full flex flex-col gap-5 items-center">
                    {isExpired ?
                        <>
                            <h1 className="text-2xl">کد تأیید جدید را وارد کنید</h1>
                            <p>کد جدید ارسال شده را با دقت وارد کنید.</p></>
                        :
                        <>
                            <h1 className="text-2xl">کد تایید را وارد کنید</h1>
                            <p>کد ارسال شده به تلفن تان را وارد کنید.</p>
                        </>
                    }


                    <div className="flex w-full justify-center gap-3" dir="ltr">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Controller
                                key={i}
                                name="digit1"
                                control={control}
                                rules={{
                                    required: "کد یکبار مصرف را وارد کنید",
                                    validate: (value) =>
                                        value.length !== 4 ? "کد صحیح نیست" : true,
                                }}
                                render={({ field }) => (
                                    <DigitInput
                                        {...field}
                                        ref={refs.current[i]}
                                        idx={i + 1}
                                        digitCount={4}
                                        refs={refs.current}
                                    />
                                )}
                            />
                        ))}
                    </div>

                    <div className="w-full flex items-center justify-between text-blue-500 -mt-3 text-sm">
                        <p onClick={() => { setPhone(null); nav('/') }}>تغییر شماره</p>
                        <OtpTimer onResend={onResend} />
                    </div>

                    <SubmitBtn context={"ورود"} onClick={handleSubmit(submit)} color={"Red"} loading={loading} />
                </form>
            </BoxLayout>
        </>

    )
}

export default OTPForm