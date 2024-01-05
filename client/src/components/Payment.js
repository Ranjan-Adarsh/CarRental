import { Card } from "react-bootstrap";
function Payment(props)
{
    return(
        <div>
            <Card>
                <Card.Text>Name: {props.name}</Card.Text>
                <Card.Text>Location: {props.city}</Card.Text>
                <Card.Text>Base Amount: {(props.baseAmount).toFixed(2)}</Card.Text>
                <Card.Text>Discount: {(props.baseAmount*0.2).toFixed(2)}</Card.Text>
                <Card.Text>Final amount: {(props.baseAmount*0.8).toFixed(2)}</Card.Text>
            </Card>
            
            
        </div>
    );
}
export default Payment;