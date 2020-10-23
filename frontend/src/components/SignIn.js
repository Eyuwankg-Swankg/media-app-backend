import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signin } from "../redux/actions/authActions";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onsubmit = this.onsubmit.bind(this);
  }
  async onsubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const a = await this.props.signinInUser(data);
    try {
      toast(a.msg, { type: "error" });
    } catch (error) {
      toast("Success", { type: "success" });
    }
  }
  render() {
    return (
      <div className="signin">
        <div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
          />
          <Form id="signin-form" onSubmit={this.onsubmit}>
            <FormGroup>
              <Label
                for="exampleEmail"
                style={{
                  color: "#d69559",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="examplePassword"
                style={{
                  color: "#d69559",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormGroup>
            <Button
              style={{
                backgroundColor: "#d69559",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              SignIn
            </Button>
          </Form>
          <div
            style={{
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Don't have an account?
            <a className="ml-2" href="#">
              SignUp
            </a>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  signinInUser: async (data) => {
    return await signin(dispatch, data);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
