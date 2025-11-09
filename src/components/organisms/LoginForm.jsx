import { useNavigate } from "react-router-dom"
import BoxLayout from "../templates/BoxLayout"
import InputGroup from "../molecules/signUpForm/InputGroup"
import { Controller, useForm } from "react-hook-form"


const LoginForm = () => {
    const nav = useNavigate()
    const {
        control,
        handleSubmit,
    } = useForm();

    const submit = (data) => {
        sessionStorage.setItem("canAccessOtp", "true");
        nav("/otpPage")
    }
    return (
        <BoxLayout>
            <form className="w-full flex flex-col gap-5 items-center">
                <h1 className="text-2xl">ورود یا ثبت نام</h1>
                <Controller
                    control={control}
                    name="emailOrNumber"
                    rules={{
                        required: "وارد کردن شماره موبایل الزامی است.",
                        validate: (value) => {
                            const phoneRegex = /^(\+98|0)?9\d{9}$/;
                            if ( phoneRegex.test(value)) {
                                return true;
                            }
                            return "لطفاً شماره همراه خود را صحیح وارد کنید";
                        },
                    }}
                    render={({ field, fieldState }) => <InputGroup {...field} name="emailOrNumber" label="شماره همراه خود را وارد کنید." error={fieldState.error?.message} type="tel" />}
                />
                <p className="w-full p-4 text-center rounded-2xl text-white bg-red" onClick={handleSubmit(submit)}>ورود</p>
                <p className="text-sm" onClick={() => nav("/signUp")}>قبلا ثبت نام نکرده اید؟ <span className="text-red">ثبت نام</span></p>
            </form>
        </BoxLayout>
    )
}

export default LoginForm