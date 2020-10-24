import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import Sherlock from "../Sherlock.png";
import { BiLike, BiDislike } from "react-icons/bi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      dislike: false,
    };
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
          {this.state.like ? <AiFillLike fill="#d69559" /> : <BiLike />}
          {this.state.dislike ? (
            <AiFillDislike fill="#d69559" />
          ) : (
            <BiDislike />
          )}
        </div>
      </Card>
    );
  }
}

export default Post;
