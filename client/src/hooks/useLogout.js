import { useAuthContext } from "./useAuthContext"
import { useNavigate } from 'react-router-dom'
import { ACTION } from "../context/AuthContext"

export const useLogout = () => {
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()

    const logout = () => {
        const alert = window.confirm('Are you sure you want to log out?')
        if (alert === true) {
            dispatch({ type: ACTION.LOGOUT })
            navigate('/')
        }
    }

    return { logout }
}