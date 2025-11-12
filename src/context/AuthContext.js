
import { createContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: Boolean,
    setIsLoggedIn: () => { },
    token: "",
    setToken: () => { },
    phone: "",
    setPhone: () => { }
}
);


export default AuthContext