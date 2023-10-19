import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../../axios/axiosConfig";

export default function createProduct() {
  const navigateTo = useNavigate();
  const nameProduct = useRef("");
  const priceProduct = useRef("");
  const [errors, setErrors] = useState(null);
  const [files, setFiles] = useState(null);
  const [previewImage, setPreviewImage] = useState([]);
  function onCreateProduct(event) {
    event.preventDefault();
    const payload = new FormData();
    payload.append("name", nameProduct.current.value);
    payload.append("price", priceProduct.current.value);
    payload.append("files[0]", files[0]);
    axiosClient
      .post("/product", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert(
          `Tạo mới sản phẩm thành công : ${res.data.data.name} lúc ${res.data.data.created_at}`
        );
        navigateTo("/product");
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data.errors);
        }
      });
  }
  useEffect(() => {
    if (!files) return;
    const arrayImagePreview = Array.from(files);
    const urlTempImage = arrayImagePreview.map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviewImage(urlTempImage);
    return () => {
      for (let i = 0; i < urlTempImage.length; i++) {
        URL.revokeObjectURL(urlTempImage[i]);
      }
    };
  }, [files]);
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
            <div>
              <input
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setFiles(event.target.files);
                  }
                }}
                multiple
                type="file"
                accept="image/*"
              />
              {previewImage &&
                previewImage.map((url) => {
                  return (
                    <div className="imageContainer">
                      <img key={url} src={url} alt="image" />;
                    </div>
                  );
                })}
            </div>
            <button className="btn btn-block">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
