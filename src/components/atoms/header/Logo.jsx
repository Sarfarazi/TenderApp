
import logo from '../../../assets/images/logo.jpg'

const Logo = ({ onClick }) => {
    return (
        <img src={logo} alt="logo" onClick={onClick} />
    )
}

export default Logo