import React from "react";
import { connect } from "react-redux";
import "./Cart.css";

import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button"
import { Table } from "reactstrap"

class Cart extends React.Component {

  state = {
    itemCart: []
  }

  componentDidMount() {

    console.log(this.props.user.id)

    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",

      },

    })
      .then((res) => {
        console.log(res)
        this.setState({ itemCart: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
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
  }

  render() {
    return (
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
