import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class SignUp extends Component {
  render() {
    return (
      <div>
        <div className="signin">
          <div>
            <Form id="signin-form">
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
                <Input type="text" name="name" id="name" />
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

export default SignUp;
