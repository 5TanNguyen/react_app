import React, {useState, useEffect} from "react";
import "./Modal.css";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

export default function Modal({product, socket, username, room}){
    // const product = props.product;

    const [modal, setModal] = useState(false);
    const [token, setToken] = useState();
    const [customerId, setCustomerId] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);

    const toggleModal = () =>{
        setModal(!modal);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const order = {
            user_id: null,
            customer_id : customerId,
            quantity: quantity,
            price: price,
            product_id : product.id,
            address: address,
            totalPrice: price * quantity,
            author: username,
            room: room,
            time:
              new Date(Date.now()).getDate() +
              " " +
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
        };

        axios({
            url: "http://localhost:5005/order-add",
            method: "POST",
            data : order,
            headers: {token: `Bearer ${token}`} 
        }).then((res)=>{
            console.log(res.data)
            setModal(!modal);
        }).catch(err => console.log(err));




        await socket.emit("send_order", order);
        // setOrderList((list) => [...list, order]);
        axios({
            url: "http://localhost:5005/user/order-list",
            method: "GET",
        }).then((res)=>{
            console.log('Lấy thành công sau khi send Modal!');
            setOrderList(res.data);
        }).catch(function(err)
        {
            console.log(err + ' Lỗi lấy tin nhắn');
        })
    };

    useEffect(()=>{
        setToken(localStorage.getItem('token'));
        setCustomerId(localStorage.getItem('customerId'));

        socket.on("receive_order", (data) => {
            setOrderList((list) => [...list, data]);
            console.log('receive_order')
        });
    }, [socket]);

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-modal"
        >Tạo đơn đặt</button>
        
        {modal && (<div className="modal">
            <div className="overplay"></div>
            <div className="modal-content">
                
                <h2>Số lượng</h2>
                
                <form className="containerr" onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <input type="number" placeholder="1" name="" id=""
                            onChange={e => setQuantity(e.target.value)}/>
                        </div>  
                        <h2>Giá</h2>

                        <div className="input">
                            <input type="text" placeholder="Cần Thơ...." name="" id=""
                            onChange={e => setPrice(e.target.value)}/>
                        </div>  

                        <h2>Địa chỉ</h2>

                        <div className="input">
                            <input type="text" placeholder="Cần Thơ...." name="" id=""
                            onChange={e => setAddress(e.target.value)}/>
                        </div>  
                    </div>
                    <button className='btn-submit' type="submit">Đặt</button>
                </form>
                <button className="close-modal"
                onClick={toggleModal}>Đóng
                </button>
            </div>
        </div>
        )}
        </>
    )
}