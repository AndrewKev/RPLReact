// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import Welcome from './pages/Welcome'
import { Fragment } from 'react';

import Home from "./pages/Home";
import Friends from "./pages/Friends";
import NewPost from "./pages/NewPost";
import Settings from "./pages/Settings";
import Login from './pages/Login';
import Comment from './pages/Comment';
import Detail from './pages/Detail';
import Shared from './pages/Shared';
import { Forgot } from './pages/Forgot';

function App() {
  return (
    <Router>
      <Fragment>
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/forgot" element={<Forgot/>} />
            {/* <Route path="/user/home" element={<><Main /><Home /></>} /> */}
            <Route path="/:username/home" element={<><Main /><Home /></>} />
            <Route path="/:username/detail" element={<><Main /><Detail /></>} />
            <Route path="/:username/friends/detail/:friend" element={<><Main /><Detail /></>} />
            <Route path="/:username/comment/:idPost" element={<><Main /><Comment /></>} />
            <Route path="/:username/friends" element={<><Main /><Friends /></>} />
            <Route path="/:username/shared" element={<><Main /><Shared /></>} />
            <Route path="/:username/new-post" element={<><Main /><NewPost /></>} />
            <Route path="/:username/settings" element={<><Main /><Settings /></>} />
          </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
