import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import "./navbar.css";
import Logout from "../Logout/Logout";
const NavBar = () => {
  // const user = useSelector((state)=> state.auth.logi);
  const [customer,setCustomer] = useState(null);
  const [token, setToken] = useState();
  const [cId, setCId] = useState();
  const [cName, setCNamme] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setCNamme(localStorage.getItem('name'));
    setCId(localStorage.getItem('id'));
  }, [])

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      <Link to="/order" className="navbar-home"> Order </Link>
      {cName? (
        <>
        <p className="navbar-user">Hi, <span> {cName}  </span> </p>
        <Link to="/products" className="navbar-login"> Products </Link>
        <Link to="/user" className="navbar-login"> Users </Link>
        <Logout />
        </>
      ) : (    
        <>

      <Link to="/products" className="navbar-login"> Products </Link>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
