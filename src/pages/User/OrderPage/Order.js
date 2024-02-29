import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
// import OrderConfirm from "./OrderConfirm";

function Order({ socket, username, room }) {
  const [product, setProduct] = useState();

  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [orderList, setOrderList] = useState();
  const [token, setToken] = useState();
  const [userId, setUerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");

  const createOrder = async () => {
    if (currentCustomerId !== "") {
      const order = {
        id: null,
        user_id: userId,
        customer_id : currentCustomerId,
        customer: {
          firstName: firstName
        },
        quantity: quantity,
        price: price,
        state: false,
        product_id : productId,
        address: address,
        author: username,
        room: room,
        totalPrice: price * quantity,
        createdAt: new Date(Date.now())
        // time:
        //   new Date(Date.now()).getDate() +
        //   " " +
        //   new Date(Date.now()).getHours() +
        //   ":" +
        //   new Date(Date.now()).getMinutes(),
      };

      // console.log(order);

      axios({
        url: "http://localhost:5005/order-add",
        method: "POST",
        data: order,
        headers: {token: `Bearer ${token}`} 
      }).then((res)=>{
          console.log('Gửi thành công!');
          console.log(res.data.id)
      }).catch(function(err)
      {
        console.log(err + ' Lỗi gửi tin nhắn');
      })

      // const order = {
      //   user_id: userId,
      //   customer_id : currentCustomerId,
      //   quantity: quantity,
      //   price: price,
      //   state: false,
      //   product_id : productId,
      //   address: address,
      //   author: username,
      //   room: room,
      //   totalPrice: price * quantity,
      //   createdAt: new Date(Date.now())
      //   // time:
      //   //   new Date(Date.now()).getDate() +
      //   //   " " +
      //   //   new Date(Date.now()).getHours() +
      //   //   ":" +
      //   //   new Date(Date.now()).getMinutes(),
      // };

      await socket.emit("send_order", order);
      // setOrderList((list) => [...list, order]);
      axios({
        url: "http://localhost:5005/user/order-list",
        method: "GET",
      }).then((res)=>{
          console.log('Lấy thành công sau khi send!');
          setOrderList(res.data);

          // window.location.reload(false);
      }).catch(function(err)
      {
        console.log(err + ' Lỗi lấy tin nhắn');
      })
    }
  };

  useEffect(() => {
    getOrders();

    setToken(localStorage.getItem('userToken'));
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

  // const confirmOrder = (id) =>{
  //   axios({
  //     url: `http://localhost:5005/order-confirm/${id}`,
  //     method: "GET"
  //   }).then((res)=>{
  //       console.log('Xác nhận thành công!');
  //   }).catch(function(err)
  //   {
  //     console.log(err + ' Lỗi gửi tin nhắn');
  //   })
  // }

  return (
    <div className="chat-window order-page">
      <h2>DANH SÁCH ĐƠN ĐẶT</h2>
      <div className="chat-body">
        
        <ScrollToBottom className="message-container">
          {orderList?.map((item, index) => {
            return (
              <div
                key={index}
                className="message"
              >
                <div>
                  <div className="message-content rowOrder">
                    <div className="totalPrice">
                      <p>{item.totalPrice} VNĐ</p>
                    </div>
                  
                  <div className="message-meta">

                    {/* { item.state == false ?
                      (
                        // <button className="btn-confirm-gray" onClick={confirmOrder(item.id)}>XÁC NHẬN</button>
                      ): (
                        <button className="btn-confirm-green">XÁC NHẬN</button>
                      )
                    } */}

                    <button className="btn-confirm-green">XÁC NHẬN</button>

                    <p className="firstName" id="author">{item.customer.firstName} </p>
                    <p className="firstTime" id="time">{item.createdAt}</p>
                    {/* <p id="author">USER: {item.customer_id}</p> */} 
                  </div>
                  <button className="btn-confirm-white">CHI TIẾT</button>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="info-input">
        <table className="addOrder-table">
          <tr>
            <td>
              <input
                type="text"
                value={currentCustomerId}
                placeholder="CustomerID..."
                onChange={(event) => {
                  setCurrentCustomerId(event.target.value);
                }}
              />
            </td>

            <td>
              <input
                type="text"
                value={quantity}
                placeholder="Quantity..."
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              />
            </td>

            <td>
              <input
                type="text"
                value={price}
                placeholder="Giá..."
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <input
                type="text"
                value={productId}
                placeholder="ProductId..."
                onChange={(event) => {
                  setProductId(event.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={address}
                placeholder="Địa chỉ..."
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </td>
            <td>
              <button onClick={createOrder}>&#9658;</button>
            </td>
          </tr>
        </table>        
      </div>
    </div>
  );
}

export default Order;