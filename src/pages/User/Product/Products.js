import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Products.css';
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import ProductCreate from "./ProductCreate";
import ProdcutPrice from './ProductPrice';
// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5005");

export default function Products() {

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('session'));
    getProducts();

    console.log( new Date(Date.now()).getHours())
  }, [])
  const getProducts = () => {
    axios({
      url: "http://localhost:5005/product-list",
      method: "GET",
    }).then((res)=>{
        // console.log("getProduts " + token);
        setProduct(res.data)
    }).catch(function(err)
    {
      console.log(err + ' Lỗi getProducts');
    })
  }
   
  return (
    <div className="content">
      <h2>Danh Sách Cún Con</h2>
      <br/>
      <div>
        <ProductCreate />
      </div>
      <br/>
      <br/>
      <div className="products">
        <table>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Name</th>
            <th>Loài</th>
            <th colSpan={2}>Thao Tác</th>
          </tr>
          { product?.map((item, index)=>{
              return(
                <tbody key={index}>
                  <td>{item.id}</td>
                  <td className="imgpet">
                    <img className="img-Pet" src={item.imgUrl} alt=""></img>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.species}</td>
                  <td className="">
                    <ProdcutPrice productId={item.id} />
                    <ProductEdit productId={item.id} />
                    <ProductDelete productId={item.id} />
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
