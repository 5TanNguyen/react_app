import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

// import "react-datepicker/dist/react-datepicker.css";

export default function ProductPrice({productId}){
    // const product = props.product;
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [token, setToken] = useState();
    const [customerId, setCustomerId] = useState("");
    const [price, setPrice] = useState("");
    const [beginDate, setBeginDate] = useState();
    const [endDate, setEndDate] = useState();
    const [productPrice, setProductPrice] = useState();


    const toggleModal = () =>{
        setModal(!modal);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const productPrice = {
            price: price,
            beginDate: beginDate,
            endDate: endDate,
            product_id: productId
        };

        axios({
            url: `http://localhost:5005/productPrice-create`,
            method: "POST",
            data : productPrice,
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

        getProductPrice(productId);
        console.log(productId);
    }, []);

    const getProductPrice = (id) => {
        axios({
          url: `http://localhost:5005/productPrice-list/${id}`,
          method: "GET",
        }).then((res)=>{
            setProductPrice(res.data);
        }).catch(function(err)
        {
          console.log(err + ' Lỗi getProducts');
        })
    }

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-price"
        >GIÁ</button>
        
        {modal && (<div className="addForm">
            <div className="modal-content">
                <p>{productPrice[0].product.name}</p>
                <table className="priceTable">
                    <tr>
                        <th>ID</th>
                        <th>Giá</th>
                        <th>Ngày BĐ</th>
                        <th>Ngày KT</th>
                    </tr>
                    { productPrice?.map((item, index)=>{
                        return(
                            <tbody key={index}>
                            <td>{item.id}</td>
                            <td>{item.price}</td>
                            <td>{item.beginDate}</td>
                            <td>{item.endDate}</td>
                            {/* <td>{Intl.DateTimeFormat("vi-VN", {dateStyle: "short", timeStyle : "short"}).format( item.endDate.value )}</td> */}
                            </tbody>
                        )
                        })
                    }
                </table>

                <form className="containerAdd" onSubmit={handleSubmit}>
                <div className="inputs">
                    <h5>Giá Bán</h5>
                    <div className="">
                        <input 
                            className="inputPrice"
                            value={price}
                            type="text"
                        onChange={e => setPrice(e.target.value)}/>
                    </div>
                    <table className="tableAdd">
                        <tr>
                        </tr>
                        <tr>                         
                            <td>
                                <h5>Từ Ngày</h5>
                                <div className="">
                                    <DateTimePicker onChange={setBeginDate} value={beginDate} />
                                </div>  
                            </td>
                            <td>
                                <h5>Đến Ngày</h5>
                                <div className="">
                                    <DateTimePicker onChange={setEndDate} value={endDate} />
                                </div>  
                            </td>
                        </tr>
                    </table>
                </div>

                    <div className="inputs">
                    </div>
                    <button className='btn-submit' type="submit">THÊM</button>
                </form>
                <button className="close-modal-price"
                onClick={toggleModal}>Đóng
                </button>
            </div>
        </div>
        )}
        </>
    )
}