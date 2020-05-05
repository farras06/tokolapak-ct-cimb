import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Table } from "reactstrap"


class Report extends React.Component {

    state = {
        listUser: [],
        listusername: [],
        priceTotalUserTransactionCompleted: []
    }

    componentDidMount() {
        this.getReportData()
    }

    getReportData = () => {
        Axios.get(`${API_URL}/users`)
            .then(res => {
                this.setState({ listUser: res.data })
                res.data.map((val) => {
                    const { username } = val
                    this.setState({ listusername: [...this.state.listusername, username] })
                })
                this.state.listusername.map((val) => {
                    const { id } = val
                    Axios.get(`${API_URL}/transaction`, {
                        params: {
                            userId: id,
                            status: "done",
                            _embed: "transactionDetail"
                        }
                    })
                        .then(res => {
                            let priceTotal = 0
                            res.data.map(val => {
                                const { totalPrice } = val
                                priceTotal += totalPrice
                            })
                            this.setState({ priceTotalUserTransactionCompleted: [...this.state.priceTotalUserTransactionCompleted, priceTotal] })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

            })
            .catch(err => {
                console.log(err)
            })
    }

    renderReportData = () => {
        return this.state.priceTotalUserTransactionCompleted.map((val, idx) => {
            return (
                <tr>
                    <td> {idx + 1} </td>
                    <td> {this.state.listusername[idx]} </td>
                    <td> {val} </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>User Name</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderReportData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Report