import React from "react";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";

import { registerHandler, loginHandler } from "../../../redux/actions/index"
import { connect } from "react-redux"
import Cookie from "universal-cookie"

const cookiesObject = new Cookie();
class AuthScreen extends React.Component {
  state = {
    username: "",
    fullName: "",
    password: "",
    address: "",
    users: [],
    kondisi: true,
    isLoading: false,
  }
  conditionFormLogin = () => {
    this.setState({ kondisi: true });
  }

  conditionFormRegister = () => {
    this.setState({ kondisi: false });
  }

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  }

  LoginDataHandler = () => {
    const { username, password } = this.state
    const userData = {
      username,
      password,
    };
    this.props.onLogin(userData)
    this.setState({ username: "" })
    this.setState({ password: "" })
    this.setState({ errMsg: "" })
  }

  postDataHandler = () => {
    const { username, fullName, password, address } = this.state
    const userData = {
      username,
      password,
      fullName,
      address,
    };
    this.props.onRegister(userData)
    this.setState({ username: "" })
    this.setState({ password: "" })
    this.setState({ fullName: "" })
    this.setState({ address: "" })
    this.setState({ errMsg: "" })

  }

  componentDidUpdate() {
    if (this.props.user.id) {
      cookiesObject.set("authData", JSON.stringify(this.props.user))
    }
  }

  render() {

    const {
      username,
      password,
      fullName,
      address,
    } = this.state;

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div className="d-flex">
              <input className="btn" type="button" value="Login" onClick={this.conditionFormLogin} />
              <input className="btn" type="button" value="Register" onClick={this.conditionFormRegister} />
            </div>
            {
              (this.state.kondisi) ? (
                <div>
                  <h3 style={{ marginTop: "10px" }}>Log In</h3>
                  <p className="mt-4">
                    Welcome Back. {this.props.user.username}
                    <br />Please, Login to your account</p>
                  <p>{this.props.user.errMsg}</p>
                  <TextField
                    placeholder="Username"
                    className="mt-5"
                    value={username}
                    onChange={(e) => this.inputHandler(e, "username")}
                  />
                  <TextField
                    placeholder="Password"
                    className="mt-2"
                    value={password}
                    onChange={(e) => this.inputHandler(e, "password")}
                  />
                  <div className="d-flex justify-content-center">
                    <ButtonUI type="contained" className="mt-4" onClick={this.LoginDataHandler}>
                      Login
                                        </ButtonUI>
                  </div>
                </div>
              ) : (
                  <div>
                    <h3 style={{ marginTop: "10px" }}>Register</h3>
                    <p className="mt-4">
                      Hello new User,Please Register your new account
                                    <br />Feel a new experience in our website</p>
                    <p>{this.props.user.errMsg}</p>
                    <TextField value={username} placeholder="Username" className="mt-5" onChange={(e) => this.inputHandler(e, "username")} />
                    <TextField value={fullName} placeholder="Fullname" className="mt-2" onChange={(e) => this.inputHandler(e, "fullName")} />
                    <TextField value={password} placeholder="Password" className="mt-2" onChange={(e) => this.inputHandler(e, "password")} />
                    <TextField value={address} placeholder="Address" className="mt-2" onChange={(e) => this.inputHandler(e, "address")} />
                    <div className="d-flex justify-content-center">
                      <ButtonUI type="contained" className="mt-4" onClick={this.postDataHandler}>
                        Register
                                            </ButtonUI>
                    </div>
                  </div>
                )
            }
          </div>
          <div className="col-7">Picture</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  onLogin: loginHandler,
  onRegister: registerHandler

}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
