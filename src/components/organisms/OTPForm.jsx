import { Controller, useForm } from "react-hook-form";
import DigitInput from "../atoms/Inputs/DigitInput"
import BoxLayout from "../templates/BoxLayout"
import { useContext, useRef, useState } from "react";
import ValidationErrorToast from "../atoms/ValidationErrorToast";
import { useNavigate } from "react-router-dom";
import OtpTimer from "./OtpTimer";
import AuthContext from "../../context/AuthContext ";

const validators = {
    otpEquals: (code) => (value) =>
        String(value) !== String(code) ? "invalid code" : true,
};



const OTPForm = ({ setIsVerify }) => {
    const nav = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitted },
    } = useForm({});
    const [finalCode, setFinalCode] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const { setIsLoggedIn } = useContext(AuthContext)

    const refs = useRef([]);
    if (refs.current.length !== 4) {
        refs.current = Array(4)
            .fill(null)
            .map((_, i) => refs.current[i] || { current: null });
    }

    const submit = (data) => {
        setIsLoggedIn(true)
        setIsVerify(true)
    };


    const onResend = () => {
        setIsExpired(true)
        setFinalCode(null)
    }


    return (
        <>

            {(!isValid && isSubmitted) && <ValidationErrorToast error="کد منقضی شده یا اشتباه است" />}
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


                    <div className="flex w-full gap-3" dir="ltr">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Controller
                                key={i}
                                name="digit1"
                                control={control}
                                rules={{
                                    required: "",
                                    validate: validators.otpEquals(1234),
                                }}
                                render={({ field }) => (
                                    <DigitInput
                                        {...field}
                                        ref={refs.current[i]}
                                        idx={i + 1}
                                        digitCount={4}
                                        refs={refs.current}
                                        setFinalCode={setFinalCode}
                                    />
                                )}
                            />
                        ))}
                    </div>

                    <div className="w-full flex items-center justify-between text-blue-500 -mt-3 text-sm">
                        <p onClick={() => nav('/')}>تغییر شماره</p>
                        <OtpTimer onResend={onResend} />
                    </div>

                    <p className="w-full p-4 text-center rounded-2xl text-white bg-red" onClick={handleSubmit(submit)}>ورود</p>
                </form>
            </BoxLayout>
        </>

    )
}

export default OTPForm