import React from "react";
import "./Navbar.css";
import { Link , useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import {toast} from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
function Navbar({ openLogin}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  const handleLogout = () =>{
    localStorage.removeItem("toekn");
    toast.success("Logged out Successfully");
    navigate("/");
  }
  return (
    <nav className="nav">
      <div className="navbar-left">
        <Link to="#" className="navbar-brand">
          <img src={Logo} width="30" height="30" alt="Logo" className="Logo" />
          <span>E-commerce</span>
        </Link>
        <div className="search">
          <input type="search" placeholder="Search for products..." />
        </div>
      </div>

      <ul className="links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Add Products">Add Products</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
          <li>
            <Link  to = "/Login">
          {
            token ? (
              <button onClick={handleLogout} className="logout-btn">
              Logout
              </button>
            ) : (
              <button onClick={openLogin} className="login-btn">
                  Login
              </button>
            )
          }
          </Link>
        </li>
        <div className="navbar-icons">
          <Link to="/Cart" className="cartIcon">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <Link to="/Myprofile" className="cartIcon">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
       
      </ul>
    </nav>
  );
}

export default Navbar;
