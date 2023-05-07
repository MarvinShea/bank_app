import { useState } from "react"

export const useTransfer = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    const makeTransfer = async (transfer, sender, receiver) => {
        setIsLoading(true)
        setError(null)
        const send = 'http://localhost:9000/account/withdraw'
        const receive = 'http://localhost:9000/account/deposit'
        const senderBal = Number(sender.balance) - Number(transfer)
        const recBal = Number(receiver.balance) - Number(transfer)

        const sendRes = await fetch(send, {
            method: 'PATCH',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ email: sender.mail, balance: senderBal })
        })

        const recRes = await fetch(receive, {
            method: 'PATCH',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ email: receiver.email, balance: recBal })
        })

        const url = 'http://localhost:9000/account/transaction'
        const sendTransfer = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({
                name: sender.name,
                email: sender.email,
                transactionType: `ET to ${receiver.email}`,
                amount: transfer,
                balance: senderBal,
            })
        })

        const recTransfer = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({
                name: receiver.name,
                email: receiver.email,
                transactionType: `ET from ${sender.email}`,
                amount: transfer,
                balance: recBal,
            })
        })

        setIsLoading(false)

    }
    return { makeTransfer, error, isLoading }
}