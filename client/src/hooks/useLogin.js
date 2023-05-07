import { useContext, useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { ACTION } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../context/UserContext"


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const url = 'http://localhost:9000/account/login'
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)


    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ email, password }),
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // UPDATE AUTHCONTEXT
            dispatch({ type: ACTION.LOGIN, payload: json.user })
            setUser(json.user)
            navigate('/')
            setIsLoading(false)
        }
    }
    return { login, error, isLoading }
}