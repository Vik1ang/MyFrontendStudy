import React from "react";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {Button} from "antd-mobile";
import CityList from "./pages/CityList";
import Home from "./pages/Home"

function App() {
    return (
        <Router>
            <div className="App">
                <ul>
                    <li><Link to="/home">首页</Link></li>
                    <li><Link to="/citylist">城市选择</Link></li>
                </ul>
                <Route path="/home" component={Home}/>
                <Route path="/citylist" component={CityList}/>
            </div>
        </Router>

    );
}

export default App;
