import { createContext, useReducer } from "react"

export const AuthContext = createContext()

export const ACTION = {
    LOGIN: 'login',
    LOGOUT: 'logout',
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case ACTION.LOGIN:
            return { user: action.payload }
        case ACTION.LOGOUT:
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}