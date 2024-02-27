import { Route, useParams } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import axios from "axios";
// useRouteMatch
// nested routes
import Offers from "./Offers"
import Modal from "../Components/Modal/Modal";
import Order from './Order';

import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");


export default function ProductDetails() {
  const { id } = useParams();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [token, setToken] = useState();
  const [customerId, setCustomerId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const [showOrderButton, setShowOrderButton] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);

      setShowOrderButton(true);
    }
  };  

  const [product, setProduct] = useState({
    id: '',
    name: '',
    code: '',
    description: '',
    brand: ''
  }); 

  useEffect(() => {
    setRoom(1);
    setUsername(localStorage.getItem('userName'));
    setToken(localStorage.getItem('token'));
    setCustomerId(localStorage.getItem('customerId'));

    getProductDetail();
  }, [])
  const getProductDetail = () => {
    axios({
      url: `http://localhost:5005/product-detail/${id}`,
      method: "GET" 
    }).then((res)=>{
        console.log(res.data)
        setProduct(res.data)
    }).catch(function(err)
    {
      console.log(err + ' Lỗi getProductDetail');
    })
  }

  return (
    <div className="content">
      
      <div className="product">
        <div className="image">
          <img src={product.imgUrl} alt="" />
        </div>
        <div className="details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>

          {!showChat ? (
          <div>
            <button onClick={joinRoom}>MUA</button>
          </div>
          ) : (
            <Order socket={socket} username={username} room={room} />
            // <Modal product={product} socket={socket} username={username} room={room}/>
          )}
        </div>
      </div>
      
    </div>
  )
}
