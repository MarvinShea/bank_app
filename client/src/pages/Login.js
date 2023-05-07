import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from '../components/Card'
import { useLogin } from '../hooks/useLogin'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }


    return (
        <div className="app-container" style={{ padding: "30px", maxWidth: "25rem" }}>
            <Card
                bgcolor="light"
                txtcolor="black"
                header="Login"
                status={error && <>{error}</>}
                body={(
                    <div>
                        Email Address<br />
                        <input type="input"
                            className="form-control"
                            placeholder="Enter your email..."
                            value={email.toLowerCase()}
                            onChange={e => setEmail(e.currentTarget.value)}
                        /><br />

                        Password<br />
                        <input type="password"
                            className="form-control"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={e => setPassword(e.currentTarget.value)}
                        /><br />

                        <button id="subBtn"
                            type="submit"
                            className="btn btn-secondary"
                            onClick={handleSubmit}
                            disabled={isLoading}>
                            Login
                        </button>
                    </div>
                )}
            />
        </div>
    )
}

export default Login