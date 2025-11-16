import { Controller, useForm } from "react-hook-form"
import InputGroup from "../molecules/signUpForm/InputGroup"
import PelakInput from "../molecules/signUpForm/PelakInput"
import RadioInput from "../molecules/signUpForm/RadioInput"
import ValidationErrorToast from "../atoms/ValidationErrorToast"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import AuthContext from "../../context/AuthContext"
import SubmitBtn from "../atoms/SubmitBtn"




const SignUpForm = ({ isAccountPage, isEditable, userInfo, setIsEditable, onResend }) => {
    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitted },
    } = useForm({});
    const nav = useNavigate()
    const [postBody, setPostBody] = useState(null)
    const { phone, setPhone, token } = useContext(AuthContext)

    const { refetch, data, resultCode, error: reqError , loading} = useFetch(
        `https://tenapi.palaz.com/api/Main/CompletingDriverInfor/CompletingDriverInforAsync`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postBody),
        }
    );

    const submit = (data) => {
        setPhone(data.mobile)
        setPostBody(data)

    }

    useEffect(() => {
        if (postBody) {
            refetch()
        }
    }, [postBody])

    useEffect(() => {
        if (resultCode == 200) {
            if (!isAccountPage) {
                sessionStorage.setItem("canAccessOtp", "true")
                nav("/otpPage")
                onResend()
            } else {
                setIsEditable(false)
            }
        }
    }, [resultCode])

    return (
        <>
            <form className="flex flex-col gap-8 mt-10">

                <Controller
                    name="name"
                    control={control}
                    defaultValue={userInfo?.name}
                    rules={{
                        required: "نام خود را وارد کنید",
                    }}
                    render={({ field, fieldState }) => (
                        <InputGroup {...field} label="نام و نام خانوادگی" type="text" placeholder="علی اکرمی" error={fieldState.error?.message} isEditable={isEditable} />

                    )}
                />

                <Controller
                    name="mobile"
                    control={control}
                    defaultValue={userInfo?.mobile}
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
                        <InputGroup {...field} label="شماره تماس" type="tel" placeholder="09121234567" error={fieldState.error?.message} isEditable={isEditable} />

                    )}
                />


                <Controller
                    name="carID"
                    control={control}
                    defaultValue={userInfo?.carID}
                    rules={{
                        required: "نوع وسیله نقلیه را وارد کنید",
                    }}
                    render={({ field, fieldState }) => (
                        <RadioInput {...field} label="نوع وسیله نقلیه" error={fieldState.error?.message} isEditable={isEditable} />

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
                        <InputGroup {...field} label="نام تجاری وسیله نقلیه" type="text" placeholder="وانت نیسان" error={fieldState.error?.message} isEditable={isEditable} />
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
                        <InputGroup {...field} label="ظرفیت حمل بار (تن)" mode="numeric" type="text" placeholder="2" error={fieldState.error?.message} isEditable={isEditable} />
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
                        <PelakInput {...field} error={fieldState.error?.message} isEditable={isEditable} />
                    )}
                />

                {(isEditable || !isAccountPage) && <SubmitBtn context={"ثبت اطلاعات"} onClick={handleSubmit(submit)} color={'Green'} loading={loading} />}

            </form>
            {(!isValid && isSubmitted && !reqError) && <ValidationErrorToast error="لطفاً اطلاعات را کامل وارد کنید" />}
            {(reqError) && <ValidationErrorToast error={reqError} />}
        </>
    )
}

export default SignUpForm