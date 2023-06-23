import { Link, useParams } from "react-router-dom";
import "./ordenconfirm.css";
import Button from "../Button/Button";

function OrderConfirm() {
  const { orderid } = useParams();
  return (
    <>
      <div className="confirmacion-compra">
        <h1>Gracias por tu compra</h1>
        <small>Numero de comprobante de compra: {orderid}</small>
        <Link to={`/`}>
          <Button style={{backgroundColor: "blue"}}>Volver al inicio</Button>
        </Link>
      </div>
    </>
  );
}

export default OrderConfirm;
