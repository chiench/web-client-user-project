import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../../axios/axiosConfig";

export default function createProduct() {
  const nameProduct = useRef("");
  const priceProduct = useRef("");
  const [errors, setErrors] = useState(null);
  function onCreateProduct(event) {
    event.preventDefault();
    const payload = {
      name: nameProduct.current.value,
      price: priceProduct.current.value,
    };

    function goList() {
      console.log(2222);
      return <Navigate to="/product" />;
    }

    axiosClient
      .post("/product", payload)
      .then((res) => {
        alert(
          `Tạo mới sản phẩm thành công : ${res.data.data.name} lúc ${res.data.data.created_at}`
        );
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data.errors);
        }
      });
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1> CreateProduct</h1>
        <Link className="btn-add" id="myButton" to="/product">
          List Product
        </Link>{" "}
      </div>
      <div className="card animated fadeInDown">
        <div className="form">
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <form
            onSubmit={onCreateProduct}
            style={{
              width: "50%",
              margin: "10px auto",
            }}
          >
            <input ref={nameProduct} type="text" placeholder=" Name Product" />
            <input
              ref={priceProduct}
              type="text"
              placeholder=" Price Product"
            />
            <button className="btn btn-block">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
