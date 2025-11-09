
import { createContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: Boolean,
    setIsLoggedIn: () => { },
    phone: "",
    setPhone: () => { }
}
);


export default AuthContext