import { useNavigate } from "react-router-dom"
import BoxLayout from "../templates/BoxLayout"
import ValidationErrorToast from "../atoms/ValidationErrorToast"
import verify from '../../assets/images/verify.svg'
import SubmitBtn from "../atoms/SubmitBtn"



const VerifyModal = () => {
    const nav = useNavigate()
    return (
        <>
            <ValidationErrorToast success={"با موفقیت وارد شدید"} />

            <img src={verify} className="w-2/4 m-auto mb-28" alt="verify" />
            <BoxLayout>
                <h1 className="text-2xl">ورود شما با موفقیت انجام شد</h1>
                <SubmitBtn context={"مشاهده بارها"} onClick={() => nav("/dashboard")} color={"green"} />
            </BoxLayout>
        </>
    )
}

export default VerifyModal