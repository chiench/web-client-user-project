import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosClient from "../../axios/axiosConfig";

export default function post() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const search = useRef(null);
  useLayoutEffect(() => {
    search.current.style.setProperty("margin", "0", "important");
    search.current.style.setProperty("padding", "7px", "important");
  }, []);
  useEffect(() => {
    getProduct();
  }, []);
  function getProduct() {
    setLoading(true);
    axiosClient
      .get("/product")
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
        if (errors.response && errors.response.status === 500) {
          alert(`${errors.response.data.message}`);
        }
      });
  }
  function onDeleteClick(event, product) {
    event.preventDefault();
    if (confirm("Bạn có chắc chắn muốn xóa không")) {
      axiosClient
        .post(`/product/${product}`, { _method: "DELETE" })
        .then((res) => {
          console.log(res);
          getProduct();
        })
        .catch((errors) => {
          if (errors.response && errors.response.data.errors) {
            setErrors(errors.response.data.errors);
          }
        });
    }
  }
  function onhnadleSearch(event) {
    setLoading(true);

    console.log("searchParams: ", searchParams);
    axiosClient
      .get("/product", {
        params: {
          name: search.current.value,
          filter: true,
        },
      })
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
        if (errors.response && errors.response.status === 500) {
          alert(`${errors.response.data.message}`);
        }
      });
  }
  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              marginRight: "20px",
            }}
          >
            Product
          </h1>
          <Link className="btn-add" to="/product/create">
            Add new product
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input ref={search} type="text" />
          <button
            style={{
              marginLeft: "20px",
            }}
            className="btn-success"
            onClick={() => onhnadleSearch()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="card animated fadeInDown">
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
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
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && products && (
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    {" "}
                    <img
                      src={`${import.meta.env.VITE_END_POINT}/images/${
                        product.image
                      }`}
                      width={70}
                      height={70}
                      alt="img"
                    />
                  </td>
                  <td>{product.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={"/product/" + product.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(ev, product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
          )}
        </table>
      </div>
    </div>
  );
}
