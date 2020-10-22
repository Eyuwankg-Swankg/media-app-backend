import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onsubmit = this.onsubmit.bind(this);
  }
  onsubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div className="signin">
        <div>
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

export default SignIn;
