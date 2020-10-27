import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner, Label, Input, Form, FormGroup, Button } from "reactstrap";
import { getPosts } from "./../redux/actions/postActions";
import FormData from "form-data";
import Header from "./Header";
import Post from "./Post";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      caption: "",
      file: null,
    };
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }
  componentWillMount() {
    this.props.allPosts(this.props.userToken);
  }
  onSubmitPost(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("hi", "how");
    console.log(formData);
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
        <div className="post-div">
          {this.props.posts.map((post, index) => (
            <Post
              post={post}
              key={index}
              id={this.props.userId}
              index={index}
            />
          ))}
        </div>
        <div className="addpost-modal">
          <Form className="add-post-container" onSubmit={this.onSubmitPost}>
            <FormGroup>
              <Label
                for="post-title"
                style={{
                  letterSpacing: "2px",
                  fontWeight: "bold",
                  color: "snow",
                  fontSize: "1.4rem",
                }}
              >
                Title
              </Label>
              <Input
                type="text"
                name="text"
                id="post-title"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="post-caption"
                style={{
                  letterSpacing: "2px",
                  fontWeight: "bold",
                  color: "snow",
                  fontSize: "1.4rem",
                }}
              >
                Caption
              </Label>
              <Input
                type="textarea"
                name="text"
                id="post-caption"
                value={this.state.caption}
                onChange={(e) => this.setState({ caption: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="post-image"
                style={{
                  letterSpacing: "2px",
                  fontWeight: "bold",
                  color: "snow",
                  fontSize: "1.4rem",
                }}
              >
                Upload Image
              </Label>
              <Input
                type="file"
                name="file"
                id="post-image"
                value={this.state.fileName}
                onChange={(e) => this.setState({ file: e.target.files[0] })}
              />
            </FormGroup>
            <Button
              style={{
                letterSpacing: "2px",
                fontWeight: "bold",
                color: "snow",
                fontSize: "1.4rem",
                backgroundColor: "#d69559",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.auth.token,
  isLoaded: state.post.isLoading,
  posts: state.post.posts,
  userId: state.auth.data._id,
});

const mapDispatchToProps = (dispatch) => ({
  allPosts: (token) => {
    getPosts(dispatch, token);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
