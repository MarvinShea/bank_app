import React, { useContext, useState } from 'react'
import Card from '../components/Card'
import { useDeposit } from '../hooks/useDeposit'
import { useAuthContext } from '../hooks/useAuthContext'
import { UserContext } from '../context/UserContext'

export default function Deposit() {
    const [show, setShow] = useState(true)
    const [status, setStatus] = useState('')
    const [deposit, setDeposit] = useState('')
    const { makeDeposit, error, isLoading } = useDeposit()
    const { user: auth } = useAuthContext()
    const { user, setUser } = useContext(UserContext)


    // MAKE DEPOSIT
    const handleSubmit = async (e) => {
        e.preventDefault()

        let balance = Number(user.balance) + Number(deposit)
        const email = auth.email

        // VALIDATE DEPOSIT
        if (Number(deposit) <= 0) return (setTimeout(alert("Deposit cannot be zero or less!")), 1500)
        if (isNaN(Number(deposit))) return (setTimeout(alert("Deposit must be a number!")), 1500)

        // update user account on deposit
        await makeDeposit(email, balance, deposit, auth)
        if (error) {
            setStatus(error)
        }
        if (!error) {
            const url = `http://shea-badbank-api.vercel.app/account/user/${email}`
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'Application/json' },
            })
            const json = await response.json()
            setUser(json)
            setShow(false)
        }

    }

    // clear deposit form
    function clearForm() {
        setDeposit('')
        setShow(true)
    }

    // call updateUser() and clearForm()
    function update() {
        clearForm()
    }


    return (
        <div className="app-container" style={{ padding: "30px", maxWidth: "25rem" }}>
            <Card
                header="DEPOSIT"
                bgcolor="primary"
                txtcolor="black"
                status={status}
                body={show === true ?
                    <div>
                        <p><strong>Your account balance is ${user.balance}</strong></p>

                        Deposit Amount
                        <input type="input"
                            className="form-control"
                            placeholder='Enter deposit amount...'
                            value={deposit}
                            onChange={e => setDeposit(e.currentTarget.value)} /><br />

                        <button type="submit"
                            className="btn btn-light"
                            disabled={isLoading}
                            onClick={handleSubmit}>
                            Deposit
                        </button>
                    </div>
                    :
                    <div>
                        <h5>Your deposit was successful!</h5>
                        <button type="submit"
                            className="btn btn-success"
                            onClick={update}>
                            Continue
                        </button>
                    </div>}
            />
        </div>
    )
}
