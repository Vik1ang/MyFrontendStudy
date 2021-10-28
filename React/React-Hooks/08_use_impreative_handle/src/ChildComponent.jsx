import React, {useState, useImperativeHandle} from "react";

function ChildComponent(props, ref) {
    const [count, setCount] = useState(0);
    // 子组件定义内部函数 addCount
    const addCount = () => {
        setCount(count + 1);
    }

    // 子组件通过useImperativeHandle函数, 将addCount函数添加到父组件中的ref.current中
    useImperativeHandle(ref, () => ({addCount}));

    return (
        <div>
            {count}
            <button onClick={addCount}>child</button>
        </div>
    )
}

//子组件导出时需要被React.forwardRef包裹, 否则无法接收 ref这个参数
export default React.forwardRef(ChildComponent);