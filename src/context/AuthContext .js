
import { createContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: Boolean,
    setIsLoggedIn: () => { }
}
);


export default AuthContext