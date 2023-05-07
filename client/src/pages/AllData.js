import React, { useContext, useEffect, useState } from 'react'

// COMPONENTS & CONTEXT
import Users from '../components/Users'
import Transactions from '../components/Transactions'
import { UserContext } from '../context/UserContext'


export default function AllData() {
    const { user } = useContext(UserContext)
    const [transactions, setTransactions] = useState(null)
    const email = user.email

    useEffect(() => {

        const getTransaction = async () => {
            const url = `http://localhost:9000/account/gettransaction/${email}`
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'Application/json' },
            })
            const json = await response.json()
            setTransactions(json)
        }
        getTransaction()
    },)

    return (
        <div style={{ padding: "30px", maxWidth: "45rem" }}>
            <div>
                {user &&
                    <div className="user-data">
                        <Users key={user._id} user={user} />
                    </div>}
                {transactions &&
                    <div className='transactions'>
                        <Transactions key={user._id} transactions={transactions} />
                    </div>}
            </div>
        </div>
    )
}
