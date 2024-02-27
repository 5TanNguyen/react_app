import React, {useState, useEffect} from 'react';
import './LoginSignup.css'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () =>{
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [token, setToken] = useState();

    useEffect(()=>{
        setToken(localStorage.getItem('token'));
    })

    function handleSubmit(event){
        console.log(action);
        event.preventDefault();

        if(action === "Login"){
            axios.post('http://localhost:5005/login', {email, password})
                .then((res)=>{
                    console.log(res.data)
                    // localStorage
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('customerId', res.data.customer.id);
                    localStorage.setItem('name', res.data.customer.firstName);

                    navigate('/')
                })
                .catch(err => console.log(err));
        }

        if(action === "Sign Up"){
            axios.post('http://localhost:5005/register', 
            {
                firstName,
                lastName,
                email, 
                password,
                phone
            })
            .then((res)=>{
                console.log(res.data)
                console.log("Đăng ký thành công!");
                navigate('/')
            })
            .catch(err => console.log(err + "Há há"));
        }

    }

    return (
        <div>
            {/* <div> */}
                <form className="container" onSubmit={handleSubmit}>
                    <div className="header">
                        <div className="text">{action}</div>
                        <div className="underline"></div>
                    </div>
                    <div className="submit-container">
                        <div className={action === "Login"?"submit gray": "submit"} onClick={() =>{setAction("Sign Up")}}>Sign Up</div>
                        <div className={action === "Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                    </div>
                    <div className="inputs"> 
                        {action==="Login"?<div></div>:
                            <div className='info'>
                                <div className="input">
                                    <img src={user_icon} alt="" />
                                    <input type="text" placeholder='Name' name="" id="" 
                                    onChange={e => setFirstName(e.target.value)} />
                                </div>
                                
                                <div className="input">
                                    <img src="" alt="" />
                                    <input type="text" placeholder='Last Name' name="" id="" 
                                    onChange={e => setLastName(e.target.value)} />
                                </div>
                            </div>
                        }

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

                    {action==="Sign Up"? <div><h2>Phone</h2>
                        <div className="input">
                            <input type="text" placeholder='' name="" id=""
                            onChange={e => setPhone(e.target.value)}/>
                        </div>  </div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>}

                    <button className='btn-submit' type="submit">Login</button>
                </form>
            {/* </div> */}
        </div>
    )
}

export default LoginSignup