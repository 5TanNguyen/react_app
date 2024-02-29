import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

export default function ProductDelete({userId}){
    // const product = props.product;
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [proId, setProId] = useState();
    const [token, setToken] = useState();
    const [customerId, setCustomerId] = useState("");
    const [state, setState] = useState("");
    const [productDetail, setProductDetail] = useState();


    const toggleModal = () =>{
        setModal(!modal);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const productEdit = {
            state: false,
            updatedAt: new Date(Date.now())
        };

        axios({
            url: `http://localhost:5005/user-delete/${userId}`,
            method: "GET",
            headers: {token: `Bearer ${token}`} 
        }).then((res)=>{
            console.log(res.data)
            setModal(!modal);

            window.location.reload(false)
        }).catch(err => console.log(err));
    };

    useEffect(()=>{
        setToken(localStorage.getItem('token'));
        setCustomerId(localStorage.getItem('customerId'));
    }, []);

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-user-delete"
        >XÓA</button>
        
        {modal && (<div className="deleteForm">
            <div className="modal-user-content">
                <div className="overplay-user-delete">
                    <h2>Xác Nhận Xóa</h2>
                </div>
                <form className="containerUserDelete" onSubmit={handleSubmit}>
                    <button className='btn-user-submit' type="submit">XÓA</button>
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