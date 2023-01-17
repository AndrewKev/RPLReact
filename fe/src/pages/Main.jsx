import React, {Component, Fragment} from "react";
// import Navbar from "../components/Navbar";
import Sidenav from '../components/Sidenav'
import '../style/input.css'

class Main extends Component {
  render() {
    return(
      <Fragment>
        <div className="font-raleway">
          {/* <Navbar /> */}
          <Sidenav />
        </div>
        {/* <h1>hehe</h1> */}

      </Fragment>
    )
  }
}

export default Main