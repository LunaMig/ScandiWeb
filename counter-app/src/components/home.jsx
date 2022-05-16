import React, { Component } from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./components.css";
import { constants } from "../constants";

function Home() {
  const [showList, setShowList] = useState([]);
  const [deleteList, setDeleteList] = useState({});

  const deleteProduct = () => {
    Axios.post(`${constants.apiUrl}/delete`, {
      skus: Object.keys(deleteList).filter((val) => deleteList[val]),
    }).then((response) => {
      Axios.get(`${constants.apiUrl}/products`).then((response) => {
        setShowList(response.data);
      });
    });
  };

  useEffect(() => {
    Axios.get(`${constants.apiUrl}/products`).then((response) => {
      setShowList(response.data);
    });
  }, []);

  const listing = [];
  showList.forEach((val) =>
    listing.push(
      <div className="grid">
        <div className="box">
          <input
            id="delete-checkbox"
            className="delete-checkbox"
            type="checkbox"
            value={deleteList[val.sku]}
            onChange={() => {
              deleteList[val.sku] = !deleteList[val.sku];
              setDeleteList(deleteList);
            }}
          ></input>
          <h3>{val.sku}</h3>
          <h3>{val.name}</h3>
          <h3>{val.price} $</h3>
          <h3>{val.productType}</h3>
          <h3>{val.specification}</h3>
        </div>
      </div>
    )
  );

  return (
    <div>
      <h1>Product List</h1>
      <Link className="fakeButton" to="/add">
        ADD
      </Link>
      <button onClick="window.location.reload()" onClick={deleteProduct}>
        MASS DELETE
      </button>
      {listing}
      <footer>
        <hr></hr>
        <p>Scandi Web Test Assignment</p>
      </footer>
    </div>
  );
}

export default Home;
//finalCommit
