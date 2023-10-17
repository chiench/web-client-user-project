import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios/axiosConfig";

export default function updateProduct() {
  const nameProduct = useRef("");
  const priceProduct = useRef("");
  const params = useParams();
  const [errors, setErrors] = useState(null);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);
  function getProduct() {
    setLoading(true);
    axiosClient
      .get(`/product/${params.productId}`)
      .then((res) => {
        console.log("res: ", res);
        setProduct(res.data.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data.errors);
          setLoading(false);
        }
      });
  }
  function onUpdateProduct(event) {
    event.preventDefault();
    const payload = {
      name: nameProduct.current.value,
      price: priceProduct.current.value,
    };
    console.log(payload);
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
      {loading && (
        <tbody>
          <tr>
            <td colSpan="5" class="text-center">
              Loading...
            </td>
          </tr>
        </tbody>
      )}
      {!loading && (
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
              onSubmit={onUpdateProduct}
              style={{
                width: "50%",
                margin: "10px auto",
              }}
            >
              <input
                value={product.name}
                ref={nameProduct}
                type="text"
                placeholder=" Name Product"
              />
              <input
                ref={priceProduct}
                type="text"
                value={product.price}
                onChange={(event) => {
                  setProduct({ price: event.target.value });

                  console.log(event.target.value);
                }}
                placeholder=" Price Product"
              />
              <button className="btn btn-block">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
