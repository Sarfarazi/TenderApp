import { useNavigate } from "react-router-dom"
import BoxLayout from "../templates/BoxLayout"
import InputGroup from "../molecules/signUpForm/InputGroup"
import { Controller, useForm } from "react-hook-form"
import { useFetch } from "../../hooks/useFetch"
import { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthContext "


const LoginForm = () => {
    const nav = useNavigate()
    const {phone, setPhone } = useContext(AuthContext);
    const {
        control,
        handleSubmit,
    } = useForm();

    const { refetch } = useFetch(
        `https://localhost:7078/api/OTP/OTP/OTPAsync`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone: phone
            }),
        }
    );

    const submit = (data) => {
        setPhone(data.phone)
        sessionStorage.setItem("canAccessOtp", "true");
        nav("/otpPage")

    }

    useEffect(() => {
        if (phone) {
            refetch()
        }
    }, [phone])

    return (
        <BoxLayout>
            <form className="w-full flex flex-col gap-5 items-center">
                <h1 className="text-2xl">ورود یا ثبت نام</h1>
                <Controller
                    control={control}
                    name="phone"
                    defaultValue={phone}
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
                    render={({ field, fieldState }) => <InputGroup {...field} name="phone" label="شماره همراه خود را وارد کنید." error={fieldState.error?.message} type="tel" />}
                />
                <p className="w-full p-4 text-center rounded-2xl text-white bg-red" onClick={handleSubmit(submit)}>ورود</p>
                <p className="text-sm" onClick={() => nav("/signUp")}>قبلا ثبت نام نکرده اید؟ <span className="text-red">ثبت نام</span></p>
            </form>
        </BoxLayout>
    )
}

export default LoginForm