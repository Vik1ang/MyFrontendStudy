import React, {useReducer} from "react";

// 定义事件处理函数reducer

function reducer(state, action) {
    switch (action.type) {
        // count 最终加多少，取决于 action.param 的值
        case 'add':
            return state + action.param;
        case 'sub':
            return state - action.param;
        case 'mul':
            return state * action.param;
        default:
            console.log('what?');
            return state;
    }
}

function getRandom() {
    return Math.floor(Math.random() * 10);
}

function CountComponent() {
    const [count, dispatch] = useReducer(reducer, 0);

    return (
        <div>
            {count}
            <button onClick={() => {
                dispatch({type: 'add', param: getRandom()})
            }}>add
            </button>
            <button onClick={() => {
                dispatch({type: 'sub', param: getRandom()})
            }}>sub
            </button>
            <button onClick={() => {
                dispatch({type: 'mul', param: getRandom()})
            }}>mul
            </button>
        </div>
    );
}

export default CountComponent;