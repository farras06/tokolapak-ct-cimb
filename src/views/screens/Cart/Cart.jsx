import React from "react";
import { connect } from "react-redux";
import "./Cart.css";

import { Table, Alert } from "reactstrap";

import Axios from "axios";
import { API_URL } from "../../../constants/API";
<<<<<<< HEAD
import ButtonUI from "../../components/Button/Button"
import { Table } from "reactstrap"

class Cart extends React.Component {

  state = {
    itemCart: []
  }

  componentDidMount() {

    console.log(this.props.user.id)

=======
import ButtonUI from "../../components/Button/Button";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  state = {
    cartData: [],
  };

  getCartData = () => {
>>>>>>> 9e6c221ae238649c42f75a7c99e99a98e6a2adf8
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",

      },

    })
      .then((res) => {
<<<<<<< HEAD
        console.log(res)
        this.setState({ itemCart: res.data });
=======
        console.log(res.data);
        this.setState({ cartData: res.data });
>>>>>>> 9e6c221ae238649c42f75a7c99e99a98e6a2adf8
      })
      .catch((err) => {
        console.log(err);
      });
<<<<<<< HEAD
  }

  renderCarts = () => {
    return this.state.itemCart.map((val, idx) => {
      const { quantity, product, id } = val
      const { productName, image, price } = product

      return (
        <tbody>
          <tr>
            <th scope="row">{idx + 1}</th>
            <td>{productName}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td><img src={image} alt="" style={{ height: "50px" }} /></td>
            <td> <ButtonUI type="outlined"> Delete</ButtonUI></td>
          </tr>
        </tbody>
      )
    })
=======
  };

  renderCartData = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price } = product;
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>
            {" "}
            <img
              src={image}
              alt=""
              style={{ width: "100px", height: "200px", objectFit: "contain" }}
            />{" "}
          </td>
          <td>
            <ButtonUI
              type="outlined"
              onClick={() => this.deleteCartHandler(id)}
            >
              Delete Item
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  deleteCartHandler = (id) => {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then((res) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCartData();
>>>>>>> 9e6c221ae238649c42f75a7c99e99a98e6a2adf8
  }

  render() {
    return (
<<<<<<< HEAD
      <div className="container">
        <div className="text-center"></div>
        <Table hover size="sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {this.renderCarts()}
        </Table>
=======
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderCartData()}</tbody>
          </Table>
        ) : (
          <Alert>
            Your cart is empty! <Link to="/">Go shopping</Link>
          </Alert>
        )}
>>>>>>> 9e6c221ae238649c42f75a7c99e99a98e6a2adf8
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Cart);
