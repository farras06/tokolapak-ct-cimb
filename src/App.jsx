import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Cart from "./views/screens/Cart/Cart";
<<<<<<< HEAD
import AdminDashboard from "../src/views/screens/AdminDashboard/AdminDashboard";
=======
import AdminDashboard from "./views/screens/Admin/AdminDashboard";
import { userKeepLogin, cookieChecker } from "./redux/actions";
>>>>>>> 508caeefe1de3177c3eb76aa793779a83e1dbb23

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      let cookieResult = cookieObj.get("authData");
      if (cookieResult) {
        this.props.keepLogin(cookieResult);
      } else {
        this.props.cookieChecker();
      }
    }, 2000);
  }

<<<<<<< HEAD
  adminDashboardcall = () => {
    if (this.props.user.role == "admin") {

    }
  }
=======
  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return <Route exact path="/admin/dashboard" component={AdminDashboard} />;
    }
  };
>>>>>>> 508caeefe1de3177c3eb76aa793779a83e1dbb23

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route
              exact
              path="/product/:productId"
              component={ProductDetails}
            />
            <Route exact path="/cart" component={Cart} />
<<<<<<< HEAD
            <Route exact path="/admin" component={AdminDashboard} />

=======
            {this.renderAdminRoutes()}
            {/* <Route path="*" component={} /> */}
>>>>>>> 508caeefe1de3177c3eb76aa793779a83e1dbb23
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

/**
 * PR
 * 1. Add to cart, jika barang double, qty yg akan bertambah
 * 2. Di Home, ketika click PHONE/LAPTOP/TAB/DESKTOP
 * 3. Di navbar, ketika ketik, secara otomatis filter products
 * 4. Di cart, buat button checkout, serta dengan proses checkout
 * 5. Ketika confirm checkout, lakukan POST request ke db.json ke transaction
 *    -> lalu cart harus kosong
 */
