import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { signin } from "../redux/actions/authActions";
import { getPosts } from "./../redux/actions/postActions";
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.allPosts(this.props.userToken);
  }
  render() {
    return (
      <div>
        <Button className="m-3" onClick={this.getpost}>
          GET
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.auth.token,
  isOpen: state.post.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  allPosts: (token) => {
    getPosts(dispatch, token);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
