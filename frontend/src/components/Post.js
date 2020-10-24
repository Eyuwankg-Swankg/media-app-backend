import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import Sherlock from "../Sherlock.png";
import { BiLike, BiDislike } from "react-icons/bi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { connect } from "react-redux";
import { addLike, addDislike } from "../redux/actions/postActions";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      dislike: false,
      comment: false,
    };
    this.updateDislike = this.updateDislike.bind(this);
    this.updateLike = this.updateLike.bind(this);
    this.showComment = this.showComment.bind(this);
  }
  componentWillMount() {
    console.log(this.props.post);
    var index;
    index = this.props.post.like.findIndex(
      (element) => element.user == this.props.id
    );
    if (index == -1) {
      index = this.props.post.dislike.findIndex(
        (element) => element.user == this.props.id
      );
      if (index != -1) this.setState({ dislike: true });
    } else {
      this.setState({ like: true });
    }
  }
  updateDislike() {
    this.props.ARdislike(
      this.props.post._id,
      this.props.userToken,
      this.props.index
    );
    if (this.state.like) {
      this.setState({ dislike: !this.state.dislike, like: !this.state.like });
    } else {
      this.setState({ dislike: !this.state.dislike });
    }
  }
  updateLike() {
    this.props.ARlike(
      this.props.post._id,
      this.props.userToken,
      this.props.index
    );
    if (this.state.dislike) {
      this.setState({ dislike: !this.state.dislike, like: !this.state.like });
    } else {
      this.setState({
        like: !this.state.like,
      });
    }
  }
  showComment() {
    const commentModal = {
      opacity: this.state.comment ? 1 : 0,
      visibility: this.state.comment ? "visible" : "hidden",
    };
  }
  render() {
    return (
      <Card id="post">
        <CardImg
          top
          width="100%"
          src={Sherlock}
          alt="Card image cap"
          className="post-img"
        />
        <CardBody>
          <CardTitle>{this.props.post.heading}</CardTitle>
          <CardText>{this.props.post.caption}</CardText>
        </CardBody>
        <div id="post-props">
          {this.state.like ? (
            <AiFillLike fill="#d69559" onClick={this.updateLike} />
          ) : (
            <BiLike onClick={this.updateLike} />
          )}
          {this.state.dislike ? (
            <AiFillDislike fill="#d69559" onClick={this.updateDislike} />
          ) : (
            <BiDislike onClick={this.updateDislike} />
          )}
          <FaRegComment onClick={this.showComment} />
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  ARlike: (id, token, index) => {
    addLike(dispatch, id, token, index);
    return;
  },
  ARdislike: (id, token, index) => {
    addDislike(dispatch, id, token, index);
    return;
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
