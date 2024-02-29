import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

// import "react-datepicker/dist/react-datepicker.css";

export default function ProductCreate({productId}){
    // const product = props.product;
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [token, setToken] = useState();
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [description, setDescription] = useState();
    const [weight, setWeight] = useState();
// birthDay
    const [stock, setStock] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [importPrice, setImportPrice] = useState("");
    const [price, setPrice] = useState("");
    const [beginDate, setBeginDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [birthDate, setBirthtDate] = useState(new Date());

    const toggleModal = () =>{
        setModal(!modal);
        console.log(startDate);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const productCreate = {
            name: name,
            species: species,
            description: description,
            weight: weight,
            birthDate: new Date(Date.now()),
            stock: stock,
            imgUrl: imgUrl,
            importPrice: importPrice,
            price: price,
            beginDate: beginDate,
            endDate: endDate,
        };

        axios({
            url: `http://localhost:5005/product-create`,
            method: "POST",
            data : productCreate,
            headers: {token: `Bearer ${token}`} 
        }).then((res)=>{
            console.log(res.data)
            setModal(!modal);

            window.location.reload(false)
        }).catch(err => console.log(err));
    };

    useEffect(()=>{
        setToken(localStorage.getItem('token'));

        // console.log(new Date(Date.now()));
    }, []);

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-create"
        >THÊM CÚN</button>
        
        {modal && (<div className="addForm">
            <div className="modal-content">
                <form className="containerAdd" onSubmit={handleSubmit}>
                    <table className="tableAdd">
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <h5>Tên Cún</h5>
                                <div className="">
                                    <input 
                                        value={name}
                                        type="text"
                                        onChange={
                                            e => setName(e.target.value)}
                                        />
                                </div>  
                            </td>
                            <td>
                                <h5>Giống</h5>
                                <div className="">
                                    <input 
                                        value={species}
                                        type="text"
                                        onChange={
                                            e => setSpecies(e.target.value)}/>
                                </div>  
                            </td>
                            <td>
                                <h5>Mô tả</h5>
                                <div className="">
                                    <input 
                                        value={description}
                                        type="text"
                                    onChange={e => setDescription(e.target.value)}/>
                                </div>  
                            </td>

                            <td>
                                <h5>Cân nặng</h5>
                                <div className="">
                                    <input 
                                        value={weight}
                                        type="text"
                                    onChange={e => setWeight(e.target.value)}/>
                                </div>  
                            </td>
                        </tr>
                        <tr> 
                            <td>
                                <h5>Số lượng</h5>
                                <div className="">
                                    <input 
                                        value={stock}
                                        type="text"
                                    onChange={e => setStock(e.target.value)}/>
                                </div>  
                            </td>
                            <td>
                                <h5>Giá Nhập</h5>
                                <div className="">
                                    <input 
                                        value={importPrice}
                                        type="text"
                                    onChange={e => setImportPrice(e.target.value)}/>
                                </div> 
                            </td>
                            <td>
                                <h5>Ảnh</h5>
                                <div className="">
                                    <input 
                                        value={imgUrl}
                                        type="text"
                                    onChange={e => setImgUrl(e.target.value)}/>
                                </div>  
                            </td>
                        </tr>
                        <tr>
                            
                        </tr>
                        <tr>
                            <td>
                                <h5>Ngày Sinh</h5>
                                <div className="">
                                    <DateTimePicker onChange={setBirthtDate} value={birthDate} />
                                </div>  
                            </td>
                            <td>
                                <h5>Giá Bán</h5>
                                <div className="">
                                    <input 
                                        value={price}
                                        type="text"
                                    onChange={e => setPrice(e.target.value)}/>
                                </div> 
                            </td>
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

                    <div className="inputs">
                    </div>
                    <button className='btn-submit' type="submit">THÊM</button>
                </form>
                <button className="close-modal-delete"
                onClick={toggleModal}>Đóng
                </button>
            </div>
        </div>
        )}
        </>
    )
}