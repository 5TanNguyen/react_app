import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

function Order({ socket, username, room }) {
  const [product, setProduct] = useState();

  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [token, setToken] = useState();
  const [userId, setUerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [address, setAddress] = useState("");

  const createOrder = async () => {
    if (currentCustomerId !== "") {
      const order = {
        user_id: userId,
        customer_id : currentCustomerId,
        quantity: quantity,
        price: price,
        product_id : productId,
        address: address,
        author: username,
        room: room,
        totalPrice: price * quantity,
        time:
          new Date(Date.now()).getDate() +
          " " +
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // console.log(order);

      axios({
        url: "http://localhost:5005/order-add",
        method: "POST",
        data: order
      }).then((res)=>{
          console.log('Gửi thành công!');
      }).catch(function(err)
      {
        console.log(err + ' Lỗi gửi tin nhắn');
      })




      await socket.emit("send_order", order);
      // setOrderList((list) => [...list, order]);
      axios({
        url: "http://localhost:5005/user/order-list",
        method: "GET",
      }).then((res)=>{
          console.log('Lấy thành công sau khi send!');
          setOrderList(res.data);
      }).catch(function(err)
      {
        console.log(err + ' Lỗi lấy tin nhắn');
      })
    }
  };

  useEffect(() => {
    getOrders();

    setToken(localStorage.getItem('token'));
    setUerId(localStorage.getItem('userId'));
    
    socket.on("receive_order", (data) => {
      setOrderList((list) => [...list, data]);
      console.log('receive_order')
    });
  }, [socket]);

  const getOrders = () => {
    axios({
      url: "http://localhost:5005/user/order-list",
      method: "GET",
    }).then((res)=>{
        // console.log(res.data);
        setOrderList(res.data);
    }).catch(function(err)
    {
      console.log(err + ' Lỗi lấy tin nhắn');
    })
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Order's List</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {orderList.map((item, index) => {
            return (
              <div
                key={index}
                className="message"
              >
                <div>
                  <div className="message-content">
                    <p>{item.totalPrice}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{item.time}</p>
                    <p id="author">{item.user_id}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="">
        <input
          type="text"
          value={currentCustomerId}
          placeholder="CustomerID..."
          onChange={(event) => {
            setCurrentCustomerId(event.target.value);
          }}
        />
        <input
          type="text"
          value={quantity}
          placeholder="Quantity..."
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <input
          type="text"
          value={price}
          placeholder="Giá..."
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input
          type="text"
          value={productId}
          placeholder="ProductId..."
          onChange={(event) => {
            setProductId(event.target.value);
          }}
        />
        <input
          type="text"
          value={address}
          placeholder="Địa chỉ..."
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <button onClick={createOrder}>&#9658;</button>
      </div>
    </div>
  );
}

export default Order;