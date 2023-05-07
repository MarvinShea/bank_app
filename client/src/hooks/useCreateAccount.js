import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { ACTION } from '../context/AuthContext'


export const useCreateAccount = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const url = 'http://localhost:9000/account/create'

    const createAccount = async (name, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ name, email, password }),
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {

            // UPDATE AUTHCONTEXT
            dispatch({ type: ACTION.LOGIN, payload: json })
            setIsLoading(false)
        }
    }
    return { createAccount, error, isLoading }
}