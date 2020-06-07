import React, { Component, Suspense, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Blog from "./containers/Blog/Blog";

class App extends Component {
  state = {
    showPosts: false
  }

  modeHandler = () => {
    this.setState(prevState=> {
      return {showPosts: !prevState.showPosts}
    })
  }
  render() {
    return (
      // <BrowserRouter basename='/'>
      //   <div className="App">
      //     <Blog />
      //   </div>
      // </BrowserRouter>
      <React.Fragment>
      <button onClick={this.modeHandler}>Toggle</button>
      {this.state.showPosts ? (<Suspense fallback={<div>Loading...</div>}>Post</Suspense>) : <p>User</p>}
</React.Fragment>
    );
  }
}

export default App;
