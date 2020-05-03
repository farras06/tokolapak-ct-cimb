import React from "react";
import { connect } from "react-redux";
import "./Cart.css";

import { Table, Alert } from "reactstrap";

import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Link } from "react-router-dom";
import swal from 'sweetalert'

class Cart extends React.Component {

  state = {
    cartData: [],
    checkOutData: [],
    isCheckOut: false,
    totalPrice: 0,
  };

  getCartData = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ cartData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCartData = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price } = product;
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</td>
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
  }

  checkOutHandler = () => {
    let itemPrice = 0
    this.setState({ isCheckOut: true })
    this.state.cartData.map(val => {
      itemPrice += val.product.price * val.quantity
    })
    this.setState({ totalPrice: itemPrice })
    console.log(this.state.totalPrice)
  }

  checkOutDisplay = () => {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <td>NO</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>sub Total</td>
            </tr>
          </thead>
          {this.state.cartData.map((val, idx) => {
            return (
              <tbody>
                <tr>
                  <td> {idx + 1} </td>
                  <td> {val.product.productName} </td>
                  <td> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val.product.price)} </td>
                  <td> {val.quantity} </td>
                  <td> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val.quantity * val.product.price)} </td>
                </tr>
              </tbody>
            )
          })}
          <tfoot>
            <tr>
              <td> Total Price   </td>
              <td className="ml-4"> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(this.state.totalPrice)} </td>
            </tr>
          </tfoot>
        </Table>
        <ButtonUI type="outlined" onClick={() => { this.confirmHandler() }}> Confirm </ButtonUI>
      </div>
    )
  }

  confirmHandler = () => {

    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })

      .then(res => {
        console.log(res.data)
        res.data.map((val) => {
          this.setState({ checkOutData: [...this.state.checkOutData, val.product] })
          Axios.delete(`${API_URL}/carts/${val.id}`)
            .then(res => {
              console.log(res)
            })

            .catch(err => {
              console.log(err)
            })
        })

        Axios.post(`${API_URL}/transaction`, {
          userId: this.props.user.id,
          totalPrice: this.state.totalPrice,
          status: "pending",
          items: this.state.checkOutData,
        })

          .then(res => {
            console.log(res.data)
            swal("Success!", "Silahkan ke menu payment untuk membayar", "success")
            this.setState({ cartData: '' })
          })
      })

      .catch(err => {
        console.log(err)
      })
  }

  render() {

    return (
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <>
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
            <ButtonUI type="outlined" onClick={this.checkOutHandler}> Check Out </ButtonUI>

            {
              this.state.isCheckOut ? (this.checkOutDisplay()) : null
            }
          </>
        ) : (
            <Alert>
              Your cart is empty! <Link to="/">Go shopping</Link>
            </Alert>
          )}
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
