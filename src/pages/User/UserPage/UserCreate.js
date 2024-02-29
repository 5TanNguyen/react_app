import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';

// import "react-datepicker/dist/react-datepicker.css";

export default function UserCreate(){
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [token, setToken] = useState();
    const [userId, setUserID] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [inviter, setInviter] = useState();


    const toggleModal = () =>{
        setModal(!modal);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const userCreate = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            inviter: userId,
            manager: userId,
            state: true,
            role_id: 2
        };

        //console.log(userCreate)

        axios({
            url: `http://localhost:5005/user-create`,
            method: "POST",
            data : userCreate,
            headers: {token: `Bearer ${token}`} 
        }).then((res)=>{
            //console.log(res.data)
            setModal(!modal);

            window.location.reload(false)
        }).catch(err => console.log(err));
    };

    useEffect(()=>{
        setToken(localStorage.getItem('token'));
        setUserID(localStorage.getItem('userId'));
    }, []);

    return(
        <>
        <button
            onClick={toggleModal}
            className="btn-create"
        >THÊM NHÂN VIÊN</button>
        
        {modal && (<div className="addForm">
            <div className="modal-user-create-content">
                <form className="containerAdd" onSubmit={handleSubmit}>
                    <table className="tableAdd">
                        <tr>
                            <td>
                                <h5>Tên</h5>
                                <div className="">
                                    <input 
                                        className="user-create-input"
                                        value={firstName}
                                        type="text"
                                        onChange={
                                            e => setFirstName(e.target.value)}
                                        />
                                </div>  
                            </td>
                            <td>
                                <h5>Họ</h5>
                                <div className="">
                                    <input 
                                        className="user-create-input"
                                        value={lastName}
                                        type="text"
                                        onChange={
                                            e => setLastName(e.target.value)}/>
                                </div>  
                            </td>
                            <td>
                                <h5>Email</h5>
                                <div className="">
                                    <input 
                                        className="user-create-input"
                                        value={email}
                                        type="text"
                                    onChange={e => setEmail(e.target.value)}/>
                                </div>  
                            </td>

                            <td>
                                <h5>Mật khẩu</h5>
                                <div className="">
                                    <input 
                                        className="user-create-input"
                                        value={password}
                                        type="text"
                                    onChange={e => setPassword(e.target.value)}/>
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