import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class SignIn extends Component {
  render() {
    return (
      <div className="signin">
        <div>
          <Form id="signin-form">
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
              <Input type="email" name="email" id="exampleEmail" />
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
              <Input type="password" name="password" id="examplePassword" />
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
