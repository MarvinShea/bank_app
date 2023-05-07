import { useState } from "react"

export const useTransfer = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    const makeTransfer = async (transfer, user, receiver) => {
        setIsLoading(true)
        setError(null)
        const send = 'https://shea-badbank-api.vercel.app/account/withdraw'
        const receive = 'https://shea-badbank-api.vercel.app/account/deposit'
        const userBal = Number(user.balance) - Number(transfer)
        const recBal = Number(receiver.balance) + Number(transfer)

        const sendRes = await fetch(send, {
            method: 'PATCH',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ email: user.email, balance: userBal })
        })

        const recRes = await fetch(receive, {
            method: 'PATCH',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ email: receiver.email, balance: recBal })
        })

        const url = 'https://shea-badbank-api.vercel.app/account/transaction'
        const sendTransfer = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                transactionType: `ET to ${receiver.email}`,
                amount: transfer,
                balance: userBal,
            })
        })

        const recTransfer = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({
                name: receiver.name,
                email: receiver.email,
                transactionType: `ET from ${user.email}`,
                amount: transfer,
                balance: recBal,
            })
        })

        setIsLoading(false)

    }
    return { makeTransfer, error, isLoading }
}