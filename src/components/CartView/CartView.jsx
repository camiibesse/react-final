import { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import Button from "../Button/Button";
import "./cart.css";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { createOrderWithStockUpdate } from "../../services/firebase";
import { useNavigate } from "react-router-dom";



function CartContainer() {
  const { cart, removeItem, countTotalPrice, clear } = useContext(cartContext);
  const navigateTo = useNavigate();

  async function handleConfirm(userData) {
    const order = {
      items: cart,
      buyer: userData,
      date: new Date(),
      price: countTotalPrice(),
    };

    try {
      const id = await createOrderWithStockUpdate(order);
      console.log("respuesta", id);
      clear();

      navigateTo(`/order-confirmation/${id}`);
    } catch (error) {
      alert(error);
    }
  }
  

  return (
    <>    
      <table className="cartList">
        <thead className="cartList_head">
          <tr className="cartList_row">
            <th>Miniatura</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Remover</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="cartList_row">
              <td>
                <img height={50} src={item.img} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>$ {item.price}</td>
              <td>{item.count}</td>
              <td>
                <Button color="#d95555" onClick={() => removeItem(item.id) }>
                  X
                </Button>
              </td>
              <th>$ {(item.price * item.count)}</th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cartList_detail">
        <CheckoutForm onConfirm={handleConfirm} />
      </div>
    </>
  );
}

export default CartContainer;
