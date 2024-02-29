import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

export default function ProductDelete({productId}){
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
            url: `http://localhost:5005/product-edit/${productId}`,
            method: "POST",
            data : productEdit,
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

        getProductEdit(productId);
        console.log(new Date(Date.now()));
    }, []);

    const getProductEdit = (id) => {
        axios({
          url: `http://localhost:5005/product-detail/${id}`,
          method: "GET",
        }).then((res)=>{
            setProductDetail(res.data.product)            
        }).catch(function(err)
        {
          console.log(err + ' Lỗi getProducts');
        })
      }

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-delete"
        >XÓA</button>
        
        {modal && (<div className="deleteForm">
            <div className="modal-content">
                <div className="overplay-delete">
                    <h2>Xác Nhận Xóa</h2>
                </div>
                <form className="containerDelete" onSubmit={handleSubmit}>
                    <div className="inputs">
                        <h2>Tên Cún</h2>
                        <div className="input">
                            <input 
                                value={productDetail.name}
                                type="text"
                                readOnly={true}
                            />
                        </div> 
                    </div>
                    <button className='btn-submit' type="submit">XÓA</button>
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