import React from "react";
import "./Modal.css";

const Modal = () => {
  return (
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
  );
};

export default Modal;
