import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function OrderConfirm() {
  const { orderid } = useParams();
  return (
    
    Swal.fire({
      title: "Gracias por tu compra",
      text: `Numero de comprobante:  ${orderid}`,
      icon: "success",
      confirmButtonText: "Aceptar",
    })
  )
}

export default OrderConfirm;
