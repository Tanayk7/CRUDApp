import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userLogout } from "../../Redux";

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const email = useSelector((state) => state.login.email);
  const authenticated = useSelector((state) => state.login.authenticated);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");

  useEffect(() => {
    fetchProducts(email);
  }, []);

  const fetchProducts = (email) => {
    let data = {
      email: email,
    };
    axios
      .post("http://localhost:5000/getProducts", data)
      .then((resp) => {
        setProducts([...resp.data]);
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let form = e.target;
    let data = {
      email: email,
      name: form.elements["name"].value,
      category: form.elements["category"].value,
      price: form.elements["price"].value,
      size: form.elements["size"].value,
      stock: form.elements["stock"].value,
      description: form.elements["description"].value,
    };
    console.log("data is : ", data);
    axios
      .post("http://localhost:5000/addProduct", data)
      .then((resp) => {
        console.log(resp.data);
        form.reset();
        fetchProducts(email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = () => {
    let selectors = document.querySelectorAll(".product-selector");
    let delete_list = [];
    for (let selector of selectors) {
      if (selector.checked) {
        console.log(selector);
        delete_list.push(selector.getAttribute("data-delete"));
      }
    }
    let data = {
      delete_list: delete_list,
    };
    axios
      .post("http://localhost:5000/deleteProduct", data)
      .then((resp) => {
        console.log(resp.data);
        fetchProducts(email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  const updateHandler = (e) => {
    e.preventDefault();
    let form = e.target;
    let data = {
      id: update,
      email: email,
      name: form.elements["name"].value,
      category: form.elements["category"].value,
      price: form.elements["price"].value,
      size: form.elements["size"].value,
      stock: form.elements["stock"].value,
      description: form.elements["description"].value,
    };
    console.log("data is : ", data);
    axios
      .post("http://localhost:5000/updateProduct", data)
      .then((resp) => {
        console.log(resp.data);
        form.reset();
        modalClose();
        fetchProducts(email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalClose = () => {
    document.querySelector(".modal-container").style.display = "none";
  };

  const modalOpen = (e) => {
    document.querySelector(".modal-container").style.display = "flex";
    let id = e.target.parentNode.parentNode.children[0].children[0].getAttribute(
      "data-delete"
    );
    setUpdate(id);

    let update_form = document.getElementById("update-form");
    update_form.elements["name"].value =
      e.target.parentNode.parentNode.children[1].innerHTML;
    update_form.elements["category"].value =
      e.target.parentNode.parentNode.children[2].innerHTML;
    update_form.elements["price"].value =
      e.target.parentNode.parentNode.children[3].innerHTML;
    update_form.elements["size"].value =
      e.target.parentNode.parentNode.children[4].innerHTML;
    update_form.elements["stock"].value =
      e.target.parentNode.parentNode.children[5].innerHTML;
    update_form.elements["description"].value =
      e.target.parentNode.parentNode.children[6].innerHTML;

    console.log(id);
  };

  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="app-title">CRUD APP</div>
        <button onClick={logoutHandler} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="controls">
        <form id="product-form" onSubmit={(e) => submitHandler(e)}>
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            className="styled-input"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Enter Product Category"
            className="styled-input"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Enter Product Price"
            className="styled-input"
            required
          />
          <input
            type="text"
            name="size"
            placeholder="Enter Product Size"
            className="styled-input"
            required
          />
          <input
            type="text"
            name="stock"
            placeholder="Enter Product Stock"
            className="styled-input"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Enter Product Description"
            className="styled-input"
            required
          />
          <button className="submit-btn" type="submit">
            Add Product
          </button>
        </form>
      </div>

      <div className="table-controls">
        <button className="delete-button" onClick={deleteHandler}>
          Delete selected
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Product Price</th>
            <th>Product Size</th>
            <th>Product Stock</th>
            <th>Product Decsription</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  className="product-selector"
                  data-delete={product._id}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price} </td>
              <td>{product.size} </td>
              <td>{product.stock}</td>
              <td>{product.description} </td>
              <td>
                <button className="edit-button" onClick={modalOpen}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal-container">
        <div className="edit-modal">
          <form id="update-form" onSubmit={(e) => updateHandler(e)}>
            <input
              type="text"
              name="name"
              placeholder="Enter Product Name"
              className="styled-input"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Enter Product Category"
              className="styled-input"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Enter Product Price"
              className="styled-input"
              required
            />
            <input
              type="text"
              name="size"
              placeholder="Enter Product Size"
              className="styled-input"
              required
            />
            <input
              type="text"
              name="stock"
              placeholder="Enter Product Stock"
              className="styled-input"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Enter Product Description"
              className="styled-input"
              required
            />
            <button className="submit-btn" type="submit">
              Update
            </button>
          </form>
          <button className="close-btn delete-button" onClick={modalClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
