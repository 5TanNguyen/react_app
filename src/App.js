import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/Customer/LoginSignUp/LoginSignup';
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
// pages
import Home from './pages/Customer/Home'
import Products from './pages/Customer/Product/Products';
import NavBar from './Components/NavBar/NavBar';
import LogOut from './Components/Logout/Logout';
import Login from './Components/User/Login/Login';
import Chat from './pages/Customer/Chat/ConnectRoom';
import OrderPage from './pages/User/OrderPage/ConnectRoom';
import ProductDetail from './pages/Customer/ProductDetail/ProductDetails';
import ProductUser from './pages/User/Product/Products';
import UserPage from './pages/User/UserPage/UserList';

function App() {

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/products" element={<Products />} />
          <Route path="/user/products" element={<ProductUser />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/productDetail/:id" element={<ProductDetail/>} />
          <Route path="/order" element={<OrderPage/>} />
          <Route path="/user" element={<UserPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
