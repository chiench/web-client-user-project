import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axios/axiosConfig";

export default function updateProduct() {
  const navigateTo = useNavigate();
  const nameProduct = useRef("");
  const priceProduct = useRef("");
  const params = useParams();
  const [errors, setErrors] = useState(null);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [previewImage, setPreviewImage] = useState([]);

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
  useEffect(() => {
    if (!files) return;
    console.log(files, "file");

    const arrayImagePreview = Array.from(files);
    console.log("arrayImagePreview: ", arrayImagePreview);
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
  function onUpdateProduct(event) {
    event.preventDefault();
    const payload = new FormData();
    payload.append("_method", "put");
    payload.append("name", nameProduct.current.value);
    payload.append("price", priceProduct.current.value);
    if (files) {
      payload.append("files[0]", files[0]);
    }
    axiosClient
      .post(`/product/${params.productId}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("res: ", res);
        navigateTo("/product");
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data.errors);
          setLoading(false);
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
        <h1> Update Product</h1>
        <Link className="btn-add" id="myButton" to="/product">
          List Product
        </Link>{" "}
      </div>

      {loading && (
        <table>
          <thead></thead>

          <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
          </tbody>
        </table>
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
                defaultValue={product.name}
                ref={nameProduct}
                type="text"
                placeholder=" Name Product"
              />
              <input
                ref={priceProduct}
                type="text"
                defaultValue={product.price}
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
                {product.image && previewImage.length == 0 && (
                  <div className="imageContainer">
                    <img
                      src={`${import.meta.env.VITE_END_POINT}/images/${
                        product.image
                      }`}
                      alt="image"
                    />
                    ;
                  </div>
                )}
                {previewImage &&
                  previewImage.map((url) => {
                    return (
                      <div className="imageContainer">
                        <img key={url} src={url} alt="image" />;
                      </div>
                    );
                  })}
              </div>
              <button className="btn btn-block">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
