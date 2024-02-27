import React, {useState, useEffect} from 'react';
import './Login.css'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const Login = () =>{
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();

    useEffect(()=>{
        setToken(localStorage.getItem('token'));
    })

    function handleSubmit(event){
        console.log(action);
        event.preventDefault();
            axios.post('http://localhost:5005/user/login', {email, password})
                .then((res)=>{
                    console.log(res.data)
                    // localStorage
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.user.id);
                    localStorage.setItem('userName', res.data.user.firstName);
                    localStorage.setItem('role', res.data.user.role.id);

                    if(localStorage.getItem('role') != 1){
                        console.log('No permission!');
                    }
                    navigate('/user/order-list')
                })
                .catch(err => console.log(err));
            }

    return (
        <div>
            {/* <div> */}
                <form className="container" onSubmit={handleSubmit}>
                    <div className="header">
                        <div className="text">{action}</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs"> 
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" placeholder='Email' name="" id="" 
                            onChange={e => setEmail(e.target.value)}/>
                        </div>

                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" placeholder='Password' name="" id=""
                            onChange={e => setPassword(e.target.value)}/>
                        </div>  
                    </div>

                    <button className='btn-submit' type="submit">Login</button>
                </form>
            {/* </div> */}
        </div>
    )
}

export default Login