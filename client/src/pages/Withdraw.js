import React, { useContext, useState } from 'react'
import Card from '../components/Card'
import { useWithdraw } from '../hooks/useWithdraw'
import { useAuthContext } from '../hooks/useAuthContext'
import { UserContext } from '../context/UserContext'

export default function Deposit() {
    const [show, setShow] = useState(true)
    const [status, setStatus] = useState('')
    const [withdraw, setWithdraw] = useState('')
    const { makeWithdraw, error, isLoading } = useWithdraw()
    const { user: auth } = useAuthContext()
    const { user, setUser } = useContext(UserContext)


    // MAKE DEPOSIT
    const handleSubmit = async (e) => {
        e.preventDefault()

        let balance = Number(user.balance) - Number(withdraw)
        const email = auth.email

        // VALIDATE DEPOSIT
        if (Number(withdraw) <= 0) return (setTimeout(alert("Withdraw cannot be zero or less")), 1500)
        if (isNaN(Number(withdraw))) return (setTimeout(alert("Withdraw must be a number")), 1500)
        if (Number(withdraw) > user.balance) return (setTimeout(alert("Insufficient funds")), 1500)
        // update user account on deposit
        await makeWithdraw(email, balance, withdraw, auth)
        if (error) {
            setStatus(error)
        }
        if (!error) {
            const url = `http://localhost:9000/account/user/${email}`
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
        setWithdraw('')
        setShow(true)
    }

    // call updateUser() and clearForm()
    function update() {
        clearForm()
    }


    return (
        <div className="app-container" style={{ padding: "30px", maxWidth: "25rem" }}>
            <Card
                header="WITHDRAW"
                bgcolor="primary"
                txtcolor="black"
                status={status}
                body={show === true ?
                    <div>
                        <p><strong>Your account balance is ${user.balance}</strong></p>

                        Withdraw Amount
                        <input type="input"
                            className="form-control"
                            placeholder='Enter withdraw amount...'
                            value={withdraw}
                            onChange={e => setWithdraw(e.currentTarget.value)} /><br />

                        <button type="submit"
                            className="btn btn-light"
                            disabled={isLoading}
                            onClick={handleSubmit}>
                            Withdraw
                        </button>
                    </div>
                    :
                    <div>
                        <h5>Your withdraw was successful!</h5>
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
