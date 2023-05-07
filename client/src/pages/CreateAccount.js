import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from '../components/Card'
import { useCreateAccount } from '../hooks/useCreateAccount'
import { useLogin } from '../hooks/useLogin'


const CreateAccount = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { createAccount, error, isLoading } = useCreateAccount()
    const { login } = useLogin()
    const [status, setStatus] = useState('')
    const [show, setShow] = useState(true)

    // VALIDATE FORM FIELDS
    function validate(field, label) {
        if (field === "" || field === null) {
            setStatus(`Error, ${label} is required!`);
            setTimeout(() => setStatus(''), 5000);
            return false;
        }
        return true;
    }

    // HANDLE NEW USER SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault()

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!validate(name, 'name')) return;
        if (!validate(email, 'email')) return;
        if (!regex.test(email)) {
            setStatus("This is not a valid email format!")
            setTimeout(() => setStatus(''), 5000)
            return
        }
        if (!validate(password, 'password')) return;
        if (password.length < 8 || password.length > 15) {
            setStatus("Password must be 8 - 15 characters long!")
            setTimeout(() => setStatus(''), 5000)
            return
        }

        await createAccount(name, email, password)
        if (error) {
            setStatus(error)
            setTimeout(() => setStatus(''), 5000)
        }
        await login(email, password)

    }

    // CLEAR CREATE ACCOUNT FORM
    function clearForm() {
        setName('')
        setEmail('')
        setPassword('')
        setShow(true)
    };


    return (
        <div className="app-container" style={{ padding: "30px", maxWidth: "30rem" }}>
            <Card
                bgcolor="primary"
                txtcolor="white"
                header="Create Account"
                status={status}
                body={show ? (
                    <div>
                        Name<br />
                        <input type="input"
                            className="form-control"
                            placeholder="Enter your name..."
                            value={name}
                            onChange={e => setName(e.currentTarget.value)}
                        /><br />

                        Email Address<br />
                        <input type="input"
                            className="form-control"
                            placeholder="Enter your email..."
                            value={email.toLowerCase()}
                            onChange={e => setEmail(e.currentTarget.value)}
                        /><br />

                        Password<br />
                        <input type="input"
                            className="form-control"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={e => setPassword(e.currentTarget.value)}
                        /><br />

                        <button
                            type="submit"
                            id="subBtn"
                            className="btn btn-light"
                            onClick={handleSubmit}
                            disabled={isLoading}>Create Account
                        </button>
                    </div>
                )
                    :
                    (
                        <div>
                            <h5>Your account was successfully created</h5>

                            <button type="submit"
                                className="btn btn-success"
                                onClick={clearForm}>Continue
                            </button>
                        </div>
                    )
                } />
        </div>
    )
}


export default CreateAccount
