import { useContext } from "react"
import AuthContext from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"


const LogOutBtn = () => {
    const { setIsLoggedIn, setPhone } = useContext(AuthContext)
    const nav = useNavigate()

    const handleLogOut = () => {
        setPhone(null)
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_time");
        sessionStorage.removeItem("phone");
        setIsLoggedIn(false)
        nav("/")
    }

    return (
        <div className='flex items-center justify-center gap-1 text-red mt-5 py-5' onClick={handleLogOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="20" viewBox="0 0 29 20" fill="none">
                <rect x="0.5" y="0.5" width="19" height="19" rx="4.5" stroke="#ED1C24" />
                <path d="M28.3536 10.3536C28.5488 10.1583 28.5488 9.84171 28.3536 9.64645L25.1716 6.46447C24.9763 6.2692 24.6597 6.2692 24.4645 6.46447C24.2692 6.65973 24.2692 6.97631 24.4645 7.17157L27.2929 10L24.4645 12.8284C24.2692 13.0237 24.2692 13.3403 24.4645 13.5355C24.6597 13.7308 24.9763 13.7308 25.1716 13.5355L28.3536 10.3536ZM8 10V10.5H28V10V9.5H8V10Z" fill="#ED1C24" />
            </svg>
            <p>خروج از حساب کاربری</p>
        </div>
    )
}

export default LogOutBtn