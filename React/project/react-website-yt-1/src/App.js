import React from "react";
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Services from "./pages/Services";
import Products from "./pages/Products";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/services' component={Services}/>
                    <Route path='/products' component={Products}/>
                    <Route path='/sign-up' component={SignUp}/>
                </Switch>
            </Router>

        </React.Fragment>
    );
}


export default App;
