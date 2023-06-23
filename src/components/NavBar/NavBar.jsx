import { Link, NavLink} from "react-router-dom";
import "./navbar.css";
import logo from "../NavBar/assets/logo.png";
import { SlBasket } from "react-icons/sl";
import { useContext } from "react";
import { cartContext } from "../../context/cartContext";


export default function NavBar() {

  return (
    <nav>
      <ul className="nav-menu">
        <h2>
          <li>
            <NavLink to="/"><img className="nav-container" src={logo} alt="Gamer Zone" /></NavLink>
          </li>
        </h2>
        <li className="nav-item">
          <NavLink className="nav-link" to="/category/PS4">
            PlayStation 4
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/category/PS5">
            PlayStation 5
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/category/accesorios">
            Accesorios
          </NavLink>
        </li>
        <CartWidget />
      </ul>
    </nav>
  );
}

function CartWidget() {
  const { countItems } = useContext(cartContext);
  const isInCart = countItems();


  return (
    <Link to="/cart">
      <SlBasket className="icono-carrito"/>      
      {isInCart > 0 && ( 
      <span className="cart-count">{countItems()}</span>)}      
    </Link>
  );
}
