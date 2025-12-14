
import logo from '/images/logo.svg'

const Logo = ({ onClick }) => {
    return (
        <img src={logo} alt="logo" onClick={onClick} />
    )
}

export default Logo