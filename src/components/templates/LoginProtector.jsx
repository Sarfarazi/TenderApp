import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext ";


const LoginProtector = ({ redirectTo, children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    } else return children;
};

export default LoginProtector;
