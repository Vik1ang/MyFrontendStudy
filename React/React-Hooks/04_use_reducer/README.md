# useReducer

### useReducer概念解释

**勾住**某些自定义数据对应的dispatch所引发的数据更改事件

useReducer可以替代useState, 实现更为复杂逻辑的数据修改

### useReducer是来解决什么问题的

useReducer是useState的升级版(实际上应该是原始版), 可以实现复杂逻辑修改, 而不是像useState那样只是直接赋值修改

### useReducer基本用法

`useReducer(reducer,initialValue)`函数通常传入2个参数

第1个参数为我们定义的一个**由dispatch引发的数据修改处理函数**

第2个参数为自定义数据的默认值, useReducer函数会返回自定义变量的引用和该自定义变量对应的dispatch

```jsx
import React, {useReducer} from 'react'; //引入useReducer

// 定义好“事件处理函数” reducer
function reducer(state, action) {
    switch (action) {
        case 'xx':
            return xxxx;
        case 'xx':
            return xxxx;
        default:
            return xxxx;
    }
}

function Component() {
    // 声明一个变量xxx，以及对应修改xxx的dispatch
    // 将事件处理函数reducer和默认值initialValue作为参数传递给useReducer
    const [xxx, dispatch] = useReducer(reducer, initialValue);

    //若想获取xxx的值，直接使用xxx即可

    //若想修改xxx的值，通过dispatch来修改
    dispatch('xx');
}

// 请注意，上述代码中的action只是最基础的字符串形式，事实上action可以是多属性的object，这样可以自定义更多属性和更多参数值
// 例如 action 可以是 {type:'xx',param:xxx}
```

### Example1

若某React组件内部有一个变量count, 默认值为0, 有3个button, 点击之后分别可以修改count的值

3个按钮具体的功能为: 第1个button点击之后count+1, 第2个button点击之后count -1, 第3个button点击之后 count x 2 (翻倍)

若使用useState来实现, 那肯定没问题, 每个button点击之后分别运算得到对应的新值, 将该值直接通过setCount赋予给count

通过useReducer:

```jsx
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
```

3个按钮点击之后, 不再具体去直接修改count的值, 而是采用 dispatch('xxx')的形式 **抛出修改count的事件**, 事件处理函数reducer **捕获到修改count的事件后**,
根据该事件携带的命令类型来进一步判断, 并真正执行对count的修改

3个按钮只是负责通知reducer **我希望做什么事情**, 具体怎么做完全由reducer来执行; 这样实现了修改数据具体执行逻辑与按钮点击处理函数的抽离

### Example2

假设我们希望按钮点击之后, 能够自主控制增加多少, 减多少, 或乘以几

我们将dispatch('xxx')中的xxx由字符串改为obj, obj可以携带更多属性作为参数传给reducer

比如之前对 加 的命令 dispatch('add')，修改为 dispatch({type:'add',param:2})

reducer可以通过action.type来区分是哪种命令, 通过action.param来获取对应的参数

```jsx
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
```

**建议不要把 useReducer 对应的变量设计的过于复杂**

### 使用useReducer来管理复杂类型的数据

举例, 若某组件内通过ajax请求数据, 获取最新一条站内短信文字, 需要组件显示整个ajax过程及结果

1. 当ajax开始请求时, 界面显示 'loading...'
2. 当ajax请求发生错误时, 界面显示 'wrong!'
3. 当ajax请求成功获取数据时, 界面显示获取到的数据内容

#### useState实现

```jsx
function Component() {
    const [loading, setLoading] = useState(true); //是否ajax请求中, 默认为true
    const [result, setResult] = useState(''); // 请求数据内容, 默认为''
    const [error, setError] = useState(false); // 请求是否发生错误, 默认为false

    {
        // ajax请求成功
        setLoading(false);
        setResult('You have a good news!');// 请注意，这是一行伪代码，只是为了演示，并不是真正ajax获取的结果
        setError(false);

        // ajax请求错误
        setLoading(false);
        setError(true);
    }

    return (
        <div>
            {loading ? 'loading...' : result}
            {error ? 'wrong!' : null}
        </div>
    )
}
```

#### useReducer 实现

```jsx

const initralData = {loading: true, result: '', error: false};

const reducer = (state, action) => {
    switch (action.type) {
        case 'succes':
            return {loading: false, result: action.res, error: false}
        case 'error':
            return {loading: false, error: true}
    }
}

function Component() {
    const [state, dispatch] = useReducer(reducer, initralData);

    {
        // ajax请求成功
        dispatch({type: 'succes', res: 'You have a good news!'});

        // ajax请求错误
        dispatch({type: 'error'});
    }

    return (
        <div>
            {state.loading ? 'loading...' : state.result}
            {state.error ? 'wrong!' : null}
        </div>
    )
}

```


# 都别用了用 Recoil