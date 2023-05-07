import { Table } from 'react-bootstrap'
import Card from '../components/Card'


const Users = ({ user }) => {
    return (
        <div className="user">
            <Card
                bgcolor="light"
                header="User Accounts"
                txtcolor="black"
                body={(

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "black" }}>
                            {
                                (<tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{Number(user.balance).toFixed(2)}</td>
                                </tr>)
                            }
                        </tbody>
                    </Table>

                )
                }
            />
        </div>
    )
}

export default Users