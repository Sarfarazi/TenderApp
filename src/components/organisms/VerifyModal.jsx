import { useNavigate } from "react-router-dom"
import BoxLayout from "../templates/BoxLayout"
import ValidationErrorToast from "../atoms/ValidationErrorToast"
import verify from '../../assets/images/verify.png'



const VerifyModal = () => {
    const nav = useNavigate()
    return (
        <>
            <ValidationErrorToast success={"با موفقیت وارد شدید"} />

            <img src={verify} className="w-2/4 m-auto mb-28" alt="verify" />
            <BoxLayout>
                <h1 className="text-2xl">ورود شما با موفقیت انجام شد</h1>
                <p className="w-full p-4 text-center rounded-2xl text-white bg-green" onClick={() => nav("/dashboard")}>مشاهده بارها</p>
            </BoxLayout>
        </>
    )
}

export default VerifyModal