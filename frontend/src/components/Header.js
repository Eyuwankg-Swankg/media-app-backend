import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState((state) => ({
      ...state,
      isOpen: !this.state.isOpen,
    }));
  }
  render() {
    return (
      <div className="header">
        <Navbar expand="md">
          <NavbarBrand href="/">SocialMedia</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.props.userToken == "" ? (
              <Nav className="ml-auto" navbar>
                <NavItem className="mr-5">
                  <NavLink>Sign In</NavLink>
                </NavItem>
                <NavItem className="mr-5">
                  <NavLink>Login In</NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem className="mr-5">
                  <NavLink>Logout</NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
