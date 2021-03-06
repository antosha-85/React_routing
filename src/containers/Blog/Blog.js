import React, { Component, Suspense } from "react";
import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";
import AsyncComponent from '../../hoc/asyncComponent'
// import FullPost from "./FullPost/FullPost";

import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import "./Blog.css";

// const AsyncNewPost = AsyncComponent(()=> {
//   return import("./NewPost/NewPost");
// })
const AsyncNewPost = React.lazy(()=> import('./NewPost/NewPost'))
class Blog extends Component {
  state = {
    auth: true
  }
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  exact
                  to="/posts/"
                  activeClassName="my_active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    // pathname: this.props.match.url + '/new-post',
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path='/'exact render={()=><h1>Home</h1>}/>
        <Route path='/' render={()=><h1>Home2</h1>}/> */}
        <Switch>
          {/* {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} />: null} */}
          {this.state.auth ? <Route path="/new-post" render={()=><Suspense fallback={<div>Loading...</div>}><AsyncNewPost/></Suspense>} />: null}
          <Route path="/posts" component={Posts} />
          <Route render={()=> <h1>Not found</h1>}/>
          {/* <Redirect from="/" to="/posts" /> */}
          {/* <Route path="/" component={Posts} /> */}
          {/* <Route path="/:id" exact component={FullPost} hi="hi" /> */}
        </Switch>
        {/* <Route path='/' render={()=><Posts/>}/> */}
        {/* <Posts /> */}
      </div>
    );
  }
}

export default Blog;
