import { useNavigate } from "react-router-dom";
import OTPForm from "../organisms/OTPForm"
import { useEffect, useState } from "react";
import VerifyModal from "../organisms/VerifyModal";
import otpImg from '../../assets/images/otp.svg'



const OTPPage = ({isExpired , onResend }) => {
    const navigate = useNavigate();
    const [isVerify, setIsVerify] = useState(false);


    useEffect(() => {
        const allowed = sessionStorage.getItem("canAccessOtp") === "true";
        if (!allowed) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            {isVerify ?
                <VerifyModal state="ورود" />
                :
                <>
                    <img src={otpImg} className="w-3/5 m-auto mb-10 max-w-xs" alt="login" />
                    <OTPForm setIsVerify={setIsVerify} isExpired={isExpired} onResend={onResend} />
                </>}
        </>
    )
}

export default OTPPage