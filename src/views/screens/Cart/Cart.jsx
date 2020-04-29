import React from "react";
import { connect } from "react-redux";
import "./Cart.css";

import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { ButtonUI } from "../../components/Button/Button"
import { Table } from "reactstrap"

class Cart extends React.Component {

  state = {
    itemCart: []
  }

  componentDidMount() {

    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderCarts = () => {
    const { itemCart } = this.state;

    return itemCart.map((val, idx) => {
      return (
        <tbody>
          <tr>
            <th scope="row">{idx + 1}</th>
            <td>{val.product.productName}</td>
            <td>{val.product.price}</td>
            <td>{val.product.category}</td>
            <td><img src={val.product.image} alt="" style={{ height: "50px" }} /></td>
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
              <th>Category</th>
              <th>Image</th>
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
