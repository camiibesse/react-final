import Button from "../Button/Button";
import "./item.css";
import { Link } from "react-router-dom";

function CardDescription({ price }) {

  return (
    <div className="item-card_detail">
      <h4>$ {price}</h4>
    </div>
  );
}

function Item({ title, img, price, color, id, category}) {
  return (
    <div className="item-card">      
        <div className="item-card_header">
          <h2>{title}</h2>          
        </div>
        <div className="item-card_img">
          <img src={img} alt="imagen"></img>
        </div>
        <small>{category}</small>
        <CardDescription price={price} color={color} />
        <Link to={`/product/${id}`}>
        <Button color={color}>
          Ver detalle
        </Button>
      </Link>
    </div>
  );
}
export default Item;
