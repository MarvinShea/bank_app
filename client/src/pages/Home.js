import Card from '../components/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import bank from '../images/bank.png'

export default function Home() {
    return (
        <div className="home" style={{ padding: "30px", maxWidth: "25rem" }}>
            <Card
                bgcolor="light"
                txtcolor="black"
                header="Ace Banking"
                title="Welcome to the our bank."
                text="We secure your money so you don't have to!"
                body={(<img src={bank} className="img-fluid" alt="Ace Banking logo" />)}
            />
        </div>
    )
}
