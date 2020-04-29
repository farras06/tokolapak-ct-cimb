import React from "react"
import "../ProductDetails/ProductDetails.css"
import ButtonUI from "../../components/Button/Button"
import Axios from "axios"
import { API_URL } from "../../../constants/API"

class ProductDetails extends React.Component {

    state = {
        productData: {
            image: "",
            productName: "",
            price: 0,
            desc: "",
            category: "",
            id: 0

        }
    }

    componentDidMount() {
        Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
            .then(res => {
                this.setState({ productData: res.data })
            })

            .catch(err => {
                console.log(err)
            })
    }

    render() {

        const { image, productName, price, desc, category } = this.state.productData

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 text-center">
                            <img style={{ width: "100 %", objectFit: "contain", height: "550px" }}
                                src={image}
                                alt=""
                            />

                        </div>

                        <div className="col-6 d-flex flex-column justify-content-center">
                            <h3>{productName}</h3>
                            <h4> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}</h4>
                            <p className="mt-4">
                                {desc}
                            </p>

                            <div className="d-flex flex-row mt-4">
                                <ButtonUI>Add to card </ButtonUI>
                                <ButtonUI className="ml-4" type="outlined">
                                    Add to Wish List
                                </ButtonUI>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails