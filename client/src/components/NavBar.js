import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import bank from '../images/bank.png'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const NavBar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    const style = ({ isActive }) => {
        return isActive ? { background: "green", color: "white" } : { color: "white" }
    }


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
            <div className="container-fluid">
                <div className="navbar-brand">
                    <img src={bank} alt="logo" width="30" />
                </div>
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link"
                                title="Home"
                                to="/"
                                style={style} aria-current="page">
                                Home
                            </NavLink>
                        </li>

                        {!user && <li className="nav-item">
                            <NavLink className="nav-link"
                                title="Create Account"
                                to="createaccount"
                                style={style}>
                                Create Account</NavLink>
                        </li>}

                        {user &&
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    title="Deposit"
                                    to="deposit"
                                    style={style}>
                                    Deposit</NavLink>
                            </li>}

                        {user &&
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    title="Withdraw"
                                    to="withdraw"
                                    style={style}>
                                    Withdraw</NavLink>
                            </li>}

                        {user &&
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    title="Transfer"
                                    to="transfer"
                                    style={style}>
                                    Transfer</NavLink>
                            </li>}

                        {user &&
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    title="All Data"
                                    to="allusers"
                                    style={style}>
                                    All Data</NavLink>
                            </li>}

                        {!user &&
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    title="Login"
                                    to="login"
                                    style={style}>
                                    Login</NavLink>
                            </li>}
                    </ul>

                    {user &&
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>}
                </div>
            </div>
        </nav >
    )
}


export default NavBar