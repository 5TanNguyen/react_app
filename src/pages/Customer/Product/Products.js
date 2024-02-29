import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Product.css';
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

      <h2>Cún Con</h2>
      <div className="products">
      { product?.map((item, index)=>{
          return(
            <div
              key={index}
              className="box">
              <div className="contant">
                <div className="img-box">
                  <img className="imgPet" src={item.imgUrl} alt=""></img>
                </div>
                <Link to={`/productDetail/${item.id}`}>
                      <button className="btn-view">Xem</button>
                </Link>
                <div className="detail">
                  <div className="info">
                    <h3>{item.name}</h3>
                    <p>Còn: {item.stock}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          )
      })
      }
      </div>

      <h3>Hoodies</h3>
      <div className="products">
        {[0,1,2,3].map(p => (
          <div key={p}>
            <Link to={`/products/${p}`}>
              <img src="https://via.placeholder.com/250x150" alt="product" />
            </Link>
          </div>
        ))}
      </div>
      <h3>Tees</h3>
      <div className="products">
        {[4,5,6,7].map(p => (
          <div key={p}>
            <Link to={`/products/${p}`}>
              <img src="https://via.placeholder.com/250x150" alt="product" />
            </Link>
          </div>
        ))}
      </div>
      <h3>Sneakers</h3>
      <div className="products">
        {[8,9,10,11].map(p => (
          <div key={p}>
            <Link to={`/products/${p}`}>
              <img src="https://via.placeholder.com/250x150" alt="product" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
