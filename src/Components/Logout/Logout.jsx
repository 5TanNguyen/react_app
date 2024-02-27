import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const LogOut = () =>{
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        navigate('/');
    })
    return (
        <div>
        </div>
    )
}

export default LogOut;