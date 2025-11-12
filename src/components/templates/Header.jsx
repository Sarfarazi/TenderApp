import { useContext } from "react"
import Logo from "../atoms/header/Logo"
import AuthContext from "../../context/AuthContext"
import userSvg from '../../assets/icons/user.svg'
import { useNavigate } from "react-router-dom"


const Header = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const nav = useNavigate()
    return (
        <header className="flex justify-between items-center">
            <Logo onClick={(isLoggedIn) ? () => nav("/dashboard") : () => { }} />
            {isLoggedIn && <img src={userSvg} alt="user" onClick={() => nav("/Account")} />}
        </header>
    )
}

export default Header