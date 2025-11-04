import { useContext } from "react";
import SignUpForm from "../organisms/SignUpForm"
import AuthContext from "../../context/AuthContext ";
import { Navigate } from "react-router-dom";
import signUpImg from '../../assets/images/signUp.jpg'


const SignUpPage = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to={"/dashboard"} replace />;
    }
    return (
        <>
            <img src={signUpImg} className="w-3/5 m-auto" alt="signUp" />
            <SignUpForm />
        </>
    )
}

export default SignUpPage