import React, {useState, useEffect} from "react";
import "./Modal.css";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

export default function Modal(props){
    const [modal, setModal] = useState(false);
    const [token, setToken] = useState();
    const [customerId, setCustomerId] = useState();
    const [userId, setUserId] = useState();
    const [quantity, setQuantity] = useState();
    const [address, setAddress] = useState();
    const navigate = useNavigate();
    const [proId, setProId] = useState();

    useEffect(()=>{
        setToken(localStorage.getItem('token'));
        setUserId(localStorage.getItem('id'));
    })

    const toggleModal = () =>{
        setModal(!modal);
    }

    function handleSubmit(event){
        event.preventDefault();
            axios({
                url: "http://localhost:5005/order-add",
                method: "POST",
                data : {
                    customer_id : customerId,
                    user_id: userId,
                    quantity: quantity,
                    price: 25000,  // Tùy chỉnh theo giá
                    product_id: proId,
                    address: address 
                },
                headers: {token: `Bearer ${token}`} 
            })
            .then((res)=>{
                console.log(res.data)

                navigate('/user/order-list')
            })
            .catch(err => console.log(err));

    }

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-modal"
        >Tạo đơn đặt</button>
        
        {modal && (<div className="modal">
            <div className="overplay"></div>
            <div className="modal-content">
                <form className="containerr" onSubmit={handleSubmit}>
                    <div className="inputs">
                        <h2>Người nhận</h2>
                        <div className="input">
                            <input type="number" placeholder="1" name="" id=""
                            onChange={e => setCustomerId(e.target.value)}/>
                        </div>

                        <h2>ID Thú Cưng</h2>
                        <div className="input">
                            <input type="number" placeholder="1" name="" id=""
                            onChange={e => setProId(e.target.value)}/>
                        </div>
                        
                        <h2>Số lượng</h2>
                        <div className="input">
                            <input type="number" placeholder="1" name="" id=""
                            onChange={e => setQuantity(e.target.value)}/>
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