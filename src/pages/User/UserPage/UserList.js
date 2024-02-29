import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Products.css';
import UserDelete from "./UserDelete";
import UserCreate from "./UserCreate";

// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5005");

export default function UserList() {

  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [userRevenue, setUserRevenue] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('session'));
    setUserId(localStorage.getItem('userId'));
    getUsers(localStorage.getItem('userId'));
    getUserRevenue(localStorage.getItem('userId'));

    console.log( new Date(Date.now()).getHours())
  }, [])
  const getUsers = (id) => {
    axios({
      url: `http://localhost:5005/user-list/${id}`,
      method: "GET",
    }).then((res)=>{
        // console.log("getProduts " + token);
        setUserList(res.data)

        console.log(res.data)
    }).catch(function(err)
    {
      console.log(err + ' Lỗi setUserList');
    })
  }

  const getUserRevenue = (id) => {
    axios({
      url: `http://localhost:5005/user-revenue/${id}`,
      method: "GET",
    }).then((res)=>{
        console.log("Rev: " + res.data.total);
        setUserRevenue(res.data.total)

        console.log(res.data)
    }).catch(function(err)
    {
      console.log(err + ' Lỗi setUserList');
    })
  }
   
  return (
    <div className="content">
      <div>
        <h2>Danh Thu Cá Nhân: {Intl.NumberFormat({style:"currency", currency: "VND"}).format( userRevenue)} VNĐ</h2>
      </div>
      <h2>Danh Sách Nhân Viên</h2>
      <br/>
      <div>
        <UserCreate />
      </div>
      <br/>
      <br/>
      <div className="products">
        <table>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Danh thu</th>
            <th>Đơn vị</th>
            <th>Trạng Thái</th>
            <th colSpan={2}>Thao Tác</th>
          </tr>
          { userList?.map((item, index)=>{
              return(
                <tbody key={index}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td>{ Intl.NumberFormat({style:"currency", currency: "VND"}).format( item.revenue[0].total)}</td>
                  <td>VNĐ</td>
                  { item.state == true?
                  (
                    <td>ĐI LÀM</td>
                    ):(
                    <td>NGHĨ VIỆC</td>
                    )
                  }
                  <td>
                    <UserDelete userId={item.id} />
                  </td>
                </tbody>
              )
            })
          }
        </table>
      </div>
    </div>
  )
}
