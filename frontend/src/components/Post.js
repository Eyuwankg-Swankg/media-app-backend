import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
class Post extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props.post);
  }
  render() {
    return (
      <Card>
        <CardImg
          top
          width="100%"
          src={this.props.post.img}
          alt="Card image cap"
          className="post-img"
        />
        <CardBody>
          <CardTitle>{this.props.post.heading}</CardTitle>
          <CardText>{this.props.post.caption}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    );
  }
}

export default Post;
