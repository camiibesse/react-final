/* AsyncMock - servicioMock backend/nube/api */
import { useContext, useEffect, useState } from "react";
import "./itemdetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { getItemData } from "../../services/firebase";


function ItemDetailContainer() {
  const [errors, setErrors] = useState(null);
  const [product, setProduct] = useState(null); 
  const [countInCart, setCountInCart] = useState(0);
  const { addItem, removeItem } = useContext(cartContext);

  function onAddToCart(count) {
    addItem(product, count);
    setCountInCart(count);
    /*sweet alert*/
    console.log(`Agregaste ${count} - ${product.title} al carrito`);
  }

  const id = useParams().id;

  useEffect(() => {
    getItemData(id)
      .then((respuesta) => {
        setProduct(respuesta);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  }, [id]);

  if (errors)
    return (
      <div>
        <h1>Error</h1>
        <p>{errors}</p>
      </div>
    );

  if (product) {
    return (
      <div className="card-detail_main">
        <div className="card-detail_img">
          <img src={product.img} alt={product.title} />
        </div>
        <div className="card-detail_detail">
          <h1>{product.title}</h1>
          <h2 className="priceTag">$ {product.price}</h2>
          <small>Stock disponible: {product.stock}</small>
          

          {countInCart === 0 ? (
            <ItemCount onAddToCart={onAddToCart} stock={product.stock} />
          ) : (
            <Link to="/cart">
              <Button>Ir al carrito</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="card-detail_main">
      <Loader />
    </div>
  );
}

export default ItemDetailContainer;
