import { useContext } from "react";
import SignUpForm from "../organisms/SignUpForm";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import signUpImg from "../../assets/images/signUp.svg";

const SignUpPage = ({
  onResend,
  otpLoading,
  otpErr,
  otpData,
  otpResultCode,
}) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <>
      <img src={signUpImg} className="w-3/5 m-auto max-w-xs" alt="signUp" />
      <SignUpForm
        onResend={onResend}
        otpErr={otpErr}
        otpLoading={otpLoading}
        otpData={otpData}
        otpResultCode={otpResultCode}
      />
    </>
  );
};

export default SignUpPage;
