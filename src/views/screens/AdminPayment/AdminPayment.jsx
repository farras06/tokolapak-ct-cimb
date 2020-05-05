import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Table } from "reactstrap"
import ButtonUI from "../../components/Button/Button"
import swal from "sweetalert"


class AdminPayment extends React.Component {

    state = {
        transactionData: [],
        transactionCompletedDate: new Date,
        viewOption: "",

    }

    inputHandler = (e, field) => {
        this.setState({ [field]: e.target.value })
    }

    componentDidMount() {
        this.getTransactionData()
    }

    getTransactionData = (select) => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                status: select
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ transactionData: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getTransactionDataAll = () => {
        Axios.get(`${API_URL}/transaction`)
            .then(res => {
                console.log(res.data)
                this.setState({ transactionData: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }


    renderTransactionData = () => {
        return this.state.transactionData.map((val, idx) => {
            const { userId, totalPrice, transactionCompleted, transactionStarted, status, id, userName } = val
            return (
                <tr>
                    <td> {idx + 1} </td>
                    <td> {userName} </td>
                    <td> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice)} </td>
                    <td> {transactionStarted} </td>
                    <td> {transactionCompleted} </td>
                    <td> {status} </td>
                    <td>
                        <ButtonUI
                            onClick={() => this.transactionCompletedHandler(id)}
                            type="outlined"

                        > Confirm
                        </ButtonUI>
                    </td>

                </tr>
            )
        })
    }

    transactionCompletedHandler = (id) => {
        Axios.patch(`${API_URL}/transaction/${id}`, {
            status: "done",
            transactionCompleted: this.state.transactionCompletedDate.toLocaleDateString()

        })
            .then(res => {
                console.log(res)
                swal("Success!", "Transaction Confirm", "success")
                this.getTransactionData()
            })
            .catch(err => {
                // swal("Error", "Transaction Already Confirm", "error")
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center flex-row align-items-center my-3">
                    <ButtonUI
                        type="outlined"
                        onClick={() => this.getTransactionData("done")}
                    >DONE
                    </ButtonUI>

                    <ButtonUI
                        type="outlined"
                        className="ml-4"
                        onClick={() => this.getTransactionData("pending")}
                    >PENDING
                    </ButtonUI>

                    <ButtonUI
                        type="outlined"
                        className="ml-4"
                        onClick={() => this.getTransactionDataAll()}
                    >All
                    </ButtonUI>


                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>User Name</th>
                            <th>Total Price</th>
                            <th>Transaction Started Date</th>
                            <th>Transaction Completed Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransactionData()}
                    </tbody>

                </Table>
            </div>
        )
    }
}

export default AdminPayment