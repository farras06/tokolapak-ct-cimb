import React from "react"
import Axios from "axios"
import { API_URL } from "../../constants/API"
import { connect } from "react-redux"
import { Table } from "reactstrap"

class History extends React.Component {

    state = {
        historyList: []
    }

    componentDidMount() {
        this.getUserHistory()
    }

    getUserHistory = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                userId: this.props.user.id,
            }
        })
            .then(res => {
                this.setState({ historyList: res.data })
                console.log(this.state.historyList)
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderUserHistory = () => {
        return this.state.historyList.map((val, idx) => {
            const { totalPrice, transactionCompleted, transactionStarted, status } = val
            return (
                <tr>
                    <td> {idx + 1} </td>
                    <td> {transactionStarted} </td>
                    <td> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice)} </td>
                    <td> {transactionCompleted} </td>
                    <td> {status} </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>Transaction Date</th>
                            <th>Total Price</th>
                            <th>Transaction Completed</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUserHistory()}
                    </tbody>
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

export default connect(mapStateToProps)(History)