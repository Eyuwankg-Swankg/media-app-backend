import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { signup } from "./../redux/actions/authActions";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.onsubmit = this.onsubmit.bind(this);
  }
  async onsubmit(e) {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    var a;
    a = await this.props.signUpUser(data);
    try {
      toast(a.msg, { type: "error" });
    } catch (error) {
      toast("Success", { type: "success" });
    }
  }
  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
        />
        <div className="signin">
          <div>
            <Form id="signin-form" onSubmit={this.onsubmit}>
              <FormGroup>
                <Label
                  for="name"
                  style={{
                    color: "#d69559",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </FormGroup>

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
                SignUp
              </Button>
            </Form>
            <div
              style={{
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Already have an account?
              <a className="ml-2" href="#">
                SignIn
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => ({
  signUpUser: async (data) => {
    return await signup(dispatch, data);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
