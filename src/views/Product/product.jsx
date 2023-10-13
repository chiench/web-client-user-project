import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../axios/axiosConfig';

export default function post() {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect((() => {
    getProduct()
  }),[]);
  function getProduct() {
    axiosClient.get('/product')
    .then((res) => {
      setLoading(true)
      setProducts(res.data.data)
      setLoading(false)
      console.log(res)
    }).catch ((err) => {
      setLoading(false)
      console.log(err)
    }) 
  }

  console.log(products,"pádsadsads")
  return (
    <div> <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
    <h1>Product</h1>
    <Link className="btn-add" to="/users/new">Add new product</Link>
  </div>
  <div className="card animated fadeInDown">
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Image</th>
        <th>Create Date</th>
        <th>Actions</th>
      </tr>
      </thead>
      {loading &&
        <tbody>
        <tr>
          <td colSpan="5" className="text-center">
            Loading...
          </td>
        </tr>
        </tbody>
      }
      {!loading && products &&
        <tbody>
          {
            products.map( (product) => (
              
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td> <img src={`${import.meta.env.VITE_END_POINT}/product${product.image}`} width={70} height={70} alt="img" /></td>
                  <td>{product.created_at}</td>
                  <td>
              <Link className="btn-edit" to={'/users/' + product.id}>Edit</Link>
              &nbsp;
              <button className="btn-delete" onClick={ev => onDeleteClick(product)}>Delete</button>
            </td>
                </tr>
              
            ))
          }
        {/* {users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.created_at}</td>
            <td>
              <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
              &nbsp;
              <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
            </td>
          </tr>
        ))} */}
        </tbody>
      }
    </table>
  </div></div>
  )
}
