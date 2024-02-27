import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignUp/LoginSignup';
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
// pages
import Home from './pages/Home'
import Products from './pages/Product/Products';
import ProductDetails from './pages/ProductDetails'
import NavBar from './Components/NavBar/NavBar';
import LogOut from './Components/Logout/Logout';
import Login from './Components/Login/Login';
import Chat from './pages/Chat/ConnectRoom';
import OrderPage from './pages/OrderPage/ConnectRoom';
import ProductDetail from './pages/ProductDetail/ProductDetails';

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
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/productDetail/:id" element={<ProductDetail/>} />
          <Route path="/order" element={<OrderPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
