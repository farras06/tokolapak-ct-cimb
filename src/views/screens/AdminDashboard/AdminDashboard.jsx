import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"

class AdminDashboard extends React.Component {

    state = {
        productList: []
    }

    getProductList = () => {
        Axios.get(`${API_URL}/products`)

            .then(res => {
                this.setState({ productList: res.data })
            })

            .catch(err => {
                console.log(err)
            })

    }

    renderProductList = () => {
        return this.state.productList.map((val, idx) => {
            const { productName, price, category, desc, image } = val
            return (
                <tr>
                    <td> {productName} </td>
                    <td> {price} </td>
                    <td> {category} </td>
                    <td> {desc} </td>
                    <td> <img src={image} alt="" /> </td>

                </tr>
            )
        })
    }
    render() {
        return (
            <div>
                <p>Admin Dashboard</p>
            </div>
        )
    }
}

export default AdminDashboard