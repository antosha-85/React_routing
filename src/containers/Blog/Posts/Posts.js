import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'
// import { Link } from "react-router-dom";
import "./Posts.css";
class Posts extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    console.log(this.props);
    console.log("[Blog] componentDidMount before get axios");
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  postSelectedHandler = (id) => {
    // this.setState({ selectedPostId: id });
    // this.props.history.push({
    //   pathname: `/posts/${id}`
    // })
    this.props.history.push('/posts/' + id)
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={`/posts/${post.id}`} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            // {...this.props}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={`${this.props.match.url}/:id`} exact component={FullPost}/>
      </div>
    );
  }
}

export default Posts;
