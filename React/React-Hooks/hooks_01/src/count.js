// import React, {Component} from 'react';
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

/* 
class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times!</p>
                <button onClick={this.addCount.bind(this)}>Click me</button>
            </div>
        )
    }

    addCount() {
        this.setState({count: this.state.count + 1});
    }
}

export default Example;

*/

function Index() {
    useEffect(() => {
        console.log('useEffect=>Index In');
        return () => {
            console.log('Index Out');
        }
    }, [])

    return <h2>my.com</h2>
}

function List() {
    useEffect(() => {
        console.log('useEffect=>List In');
        return () => {
            console.log('List Out');
        }
    })
    return <h2>List Page</h2>
}

function Count() {
    const [count, setCount] = useState(0); // 数组解构

    useEffect(() => {
        console.log(`useEffect=>You clicked ${count}} times`);
        return () => {
            console.log('============================');

        }
    }, [count])
    return (
        <div>
            <p>You clicked {count} times!</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>

            <Router>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/list">列表</Link></li>
                </ul>
                <Route path='/' exact component={Index}/>
                <Route path='/list/' component={List}/>
            </Router>
        </div>
    )
}

export default Count;