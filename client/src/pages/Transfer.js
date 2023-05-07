import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from '../components/Card'
import { UserContext } from '../context/UserContext'
import { useTransfer } from '../hooks/useTransfer'
import { useAuthContext } from '../hooks/useAuthContext'


export default function Transfer() {
    const [transfer, setTransfer] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [show, setShow] = useState(true)
    const { user, setUser } = useContext(UserContext)
    const { user: auth } = useAuthContext()
    const { makeTransfer, error, isLoading } = useTransfer()

    const handleSubmit = async () => {
        setStatus('')
        // validate transfer
        if (Number(user.balance) < Number(transfer)) return alert('Insufficient funds for transfer')
        if (Number(transfer) <= 0) return alert('Transfer must be more than zero')
        if (isNaN(Number(transfer))) return alert('Transfer must be a number')

        // validate receiver
        if (!email) return setStatus('Please enter recipient email')
        const url = `https://shea-badbank-api.vercel.app/account/user/${email}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'Application/json' },
        })
        const receiver = await response.json()
        console.log(receiver)

        if (response.ok) {
            makeTransfer(transfer, user, receiver)
        }

        if (receiver.error) {
            setStatus('Invalid recipient')
        }

        // Update user
        if (!error) {
            const email = auth.email
            const url = `https://shea-badbank-api.vercel.app/account/user/${email}`
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'Application/json' },
            })
            const json = await response.json()
            setUser(json)
            setShow(false)
        }

        if (error) {
            setStatus(error)
        }
    }

    // clear for after transfer
    function clearForm() {
        setTransfer('')
        setEmail('')
        setStatus('')
        setShow(true)
    }

    // clearForm()
    function update() {
        clearForm()
    }

    return (
        <div className="app-container" style={{ padding: "30px", maxWidth: "25rem" }}>
            <Card
                header="Transfer"
                bgcolor="info"
                txtcolor="black"
                status={status}
                body={show === true ?
                    <><p><strong>Your account balance is ${user.balance.toFixed(2)}</strong></p>

                        Recipient Email
                        <input type="input"
                            className="form-control"
                            placeholder="Enter receiver email..."
                            value={email}
                            onChange={e => setEmail(e.currentTarget.value)} /><br />

                        Transfer Amount
                        <input type="input"
                            className="form-control"
                            value={transfer}
                            placeholder="Enter transfer amount..."
                            onChange={e => setTransfer(e.currentTarget.value)} /><br />

                        <button type="submit"
                            className="btn btn-light"
                            disabled={isLoading}
                            onClick={handleSubmit}>
                            Transfer
                        </button>
                    </>
                    :
                    <>
                        <h5>Transfer was successful!</h5>
                        <button type="submit"
                            className="btn btn-success"
                            onClick={update}>
                            Continue
                        </button>
                    </>}
            />
        </div>
    )
}
