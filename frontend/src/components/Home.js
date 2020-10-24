import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Spinner,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { getPosts } from "./../redux/actions/postActions";
import Header from "./Header";
import Post from "./Post";

class Home extends Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
  }
  componentWillMount() {
    this.props.allPosts(this.props.userToken);
  }
  getPosts() {
    console.log(this.props.posts);
  }
  render() {
    const Modalstyle = {
      opacity: this.props.isLoaded ? 1 : 0,
      visibility: this.props.isLoaded ? "visible" : "hidden",
    };
    return (
      <div>
        <Header />
        <div className="home-modal" style={Modalstyle}>
          <Spinner
            color="warning"
            style={{ width: "4rem", height: "4rem" }}
            size="lg"
          />
        </div>
        {this.props.posts.map((post,index) => (
          <Post post={post} key={index}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.auth.token,
  isLoaded: state.post.isLoading,
  posts: state.post.posts,
});

const mapDispatchToProps = (dispatch) => ({
  allPosts: (token) => {
    getPosts(dispatch, token);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
