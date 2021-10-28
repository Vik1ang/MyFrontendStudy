import React, {useReducer} from "react";

// 定义事件处理函数reducer

function reducer(state, action) {
    switch (action) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        case 'mul':
            return state * 2;
        default:
            console.log('what?');
            return state;
    }
}

function CountComponent() {
    const [count, dispatch] = useReducer(reducer, 0);

    return (
        <div>
            {count}
            <button onClick={() => {
                dispatch('add')
            }}>add
            </button>
            <button onClick={() => {
                dispatch('sub')
            }}>sub
            </button>
            <button onClick={() => {
                dispatch('mul')
            }}>mul
            </button>
        </div>
    );
}

export default CountComponent;