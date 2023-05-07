import { Table } from 'react-bootstrap'
import Card from '../components/Card'


const Transactions = ({ transactions }) => {
    return (
        <div>
            <Card
                bgcolor="info"
                header="Transaction History"
                txtcolor="black"
                body={(
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Transaction Type</th>
                                <th>Amount</th>
                                <th>Running Balance</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "black" }}>
                            {transactions.map((item, i) =>
                            (<tr key={i + 1}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.transactionType}</td>
                                <td>{Number(item.amount).toFixed(2)}</td>
                                <td>{Number(item.balance).toFixed(2)}</td>
                            </tr>)
                            )}
                        </tbody>
                    </Table>
                )}
            />
        </div>
    )
}

export default Transactions
