import { useContext } from "react";
import LoginForm from "../organisms/LoginForm"
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import truck from '../../assets/images/truck.svg'


const LoginPage = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to={"/dashboard"} replace />;
    }
    return (
        <>
            <img src={truck} className="w-full" alt="truck" />
            <LoginForm/>
        </>
    )
}

export default LoginPage