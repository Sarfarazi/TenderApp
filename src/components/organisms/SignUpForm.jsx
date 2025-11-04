import { Controller, set, useForm } from "react-hook-form"
import InputGroup from "../molecules/signUpForm/InputGroup"
import PelakInput from "../molecules/signUpForm/PelakInput"
import RadioInput from "../molecules/signUpForm/RadioInput"
import ValidationErrorToast from "../atoms/ValidationErrorToast"
import { useNavigate } from "react-router-dom"




const SignUpForm = ({ isAccountPage, isEditable, userInfo, setIsEditable }) => {
    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitted },
    } = useForm({});
    const nav = useNavigate()

    const submit = (data) => {
        console.log(data)

        if (!isAccountPage) {
            sessionStorage.setItem("canAccessOtp", "true")
            nav("/otpPage")
        } else {
            setIsEditable(false)
        }


    }

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
                    name="phoneNumber"
                    control={control}
                    defaultValue={userInfo?.phoneNumber}
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
                    name="typeOfVehicle"
                    control={control}
                    defaultValue={userInfo?.typeOfVehicle}
                    rules={{
                        required: "نوع وسیله نقلیه را وارد کنید",
                    }}
                    render={({ field, fieldState }) => (
                        <RadioInput {...field} label="نوع وسیله نقلیه" error={fieldState.error?.message} isEditable={isEditable} />

                    )}
                />

                <Controller
                    name="vehicleName"
                    control={control}
                    defaultValue={userInfo?.vehicleName}
                    rules={{
                        required: "نام تجاری وسیله نقلیه را وارد کنید",
                    }}
                    render={({ field, fieldState }) => (
                        <InputGroup {...field} label="نام تجاری وسیله نقلیه" type="text" placeholder="وانت نیسان" error={fieldState.error?.message} isEditable={isEditable} />
                    )}
                />

                <Controller
                    name="maxWeight"
                    control={control}
                    defaultValue={userInfo?.maxWeight}
                    rules={{
                        required: "ظرفیت حمل بار (تن) را وارد کنید",
                    }}
                    render={({ field, fieldState }) => (
                        <InputGroup {...field} label="ظرفیت حمل بار (تن)" type="number" placeholder="2" error={fieldState.error?.message} isEditable={isEditable} />
                    )}
                />


                <Controller
                    name="carPlate"
                    control={control}
                    defaultValue={userInfo?.carPlate}
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


                {(isEditable || !isAccountPage) && <p className="w-full p-4 text-center rounded-2xl text-white bg-green" onClick={handleSubmit(submit)}>ثبت اطلاعات</p>}

            </form>
            {(!isValid && isSubmitted) && <ValidationErrorToast error="لطفاً اطلاعات را کامل وارد کنید" />}
        </>
    )
}

export default SignUpForm