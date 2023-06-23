import Flex from "../Flex/Flex";
import { useState } from "react";
import "./itemcount.css";
import Button from "../Button/Button";
import Swal from "sweetalert2";

function ItemCount(props) {
  let [count, setCount] = useState(0);

  function handleAdd() {
    if (count < props.stock) setCount(count + 1);
  }

  function handleSubstract() {
    if (count > 1) setCount(count - 1);
  }

  return (
    <div className="itemcount_container">
      <small>Agregá la cantidad deseada al carrito</small>
      <div className="itemcount_control">
        <Flex>
          <Button className="btn btn-danger" onClick={handleSubstract}>
            -
          </Button>
          <span className="itemcount_count">{count}</span>
          <Button className="btn btn-success" onClick={handleAdd}>
            +
          </Button>
        </Flex>
      </div>

      <div className="itemcount_btns">
        <Button
          onClick={() => {
            props.onAddToCart(count);
            Swal.fire({
              text: 'Producto agregado al carrito',
              toast: true,
              showConfirmButton: false,
              timer: 1000,
              position: 'top-end'
            })
          }}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

export default ItemCount;
