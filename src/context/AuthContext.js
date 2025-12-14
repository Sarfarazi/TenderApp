
import { createContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: Boolean,
    setIsLoggedIn: () => { },
    token: "",
    setToken: () => { },
    phone: "",
    setPhone: () => { },
    isCompany: "",
    setIsCompany: () => { }
}
);


export default AuthContext