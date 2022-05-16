import React, { Component } from "react";
import { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./components.css";
import { constants } from "../constants";

function Add() {
  let navigate = useHistory();
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [productType, setProductType] = useState("dvd");

  const [specification, setSpecification] = useState("");

  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");

  const add = async () => {
    const res = await Axios.post(`${constants.apiUrl}/create`, {
      sku: sku,
      name: name,
      price: price,
      productType: productType,
      specification: specification,
    });
    setTimeout(() => navigate.push("/"), 300);
    console.log(res);
  };

  const dvd = () => {
    //form dvd specifications
    return (
      <div className="specificForm">
        <h2>Please, provide size</h2>
        <div>
          <label>DVD Size (MB) </label>
          <input
            id="size"
            type="number"
            onChange={(e) => setSpecification(e.target.value + "MB")}
          ></input>
        </div>
      </div>
    );
  };
  const book = () => {
    //form book specification
    return (
      <div className="specificForm">
        <h2>Please, provide weight</h2>
        <div>
          <label>Book Weight (KG): </label>
          <input
            id="weight"
            type="number"
            onChange={(e) => setSpecification(e.target.value + " KG")}
          ></input>
        </div>
      </div>
    );
  };
  const furniture = () => {
    //form furniture specification
    return (
      <div className="specificForm">
        <h2>Please, provide furniture dimensions</h2>

        <div>
          <label>Height (CM): </label>
          <input
            id="height"
            type="number"
            onChange={(e) => setHeight(e.target.value)}
          ></input>
          <br />

          <label>Width (CM): </label>
          <input
            id="width"
            type="number"
            onChange={(e) => setWidth(height + " X " + e.target.value)}
          ></input>
          <br />

          <label>Length (CM): </label>
          <input
            id="length"
            type="number"
            onChange={(e) => setSpecification(width + " X " + e.target.value)}
          ></input>
          <br />
        </div>
      </div>
    );
  };

  const forms = {
    dvd,
    book,
    furniture,
  };

  //const concat = () => {
  //  if (productType == furniture)
  //    (concat = height + "X" + width + "X" + length).then(
  //      (setSpecification = concat)
  //    )
  //}

  //header and product form
  //the buttons are actually disguised links
  return (
    <div className="App">
      <span>
        <div className="header">
          <h1>Product Add</h1>
          <button className="fakeButton" onClick={add}>
            Save
          </button>
          <Link className="fakeButton" to="/">
            Cancel
          </Link>
        </div>
        <br />

        <div id="product_form">
          <label>SKU: </label>
          <input id="sku" onChange={(e) => setSku(e.target.value)}></input>
          <br />

          <label>Name: </label>
          <input id="name" onChange={(e) => setName(e.target.value)}></input>
          <br />

          <label>Price: </label>
          <input
            id="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <br />
        </div>
        <br />

        <div className="select">
          <label>Product Type: &nbsp; </label>
          <select
            id="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="dvd">DVD</option>
            <option value="book">Book</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>
      </span>
      {forms[productType]()}
      <footer>
      <hr>
</hr>
        <p>Scandi Web Test Assignment</p>
      </footer>
    </div>
  );
}

export default Add;
