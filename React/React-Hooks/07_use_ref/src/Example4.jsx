import React from "react";

const ChildComponent = React.forwardRef((props, ref) => {
    // 子组件通过将第2个参数ref 添加到内部真正的小写开头的类似原生标签的组件中
    return (
        <button ref={ref}>{props.label}</button>
    )
})

/* 上面的子组件直接在父组件内定义了，如果子组件是单独的.js文件，则可以通过
   export default React.forwardRef(ChildComponent) 这种形式  */

function Forward() {
    const ref = React.useRef(); //父组件定义一个ref
    const clickHandle = () => {
        console.log(ref.current); //父组件获得渲染后子组件中对应的DOM节点引用
    }
    return (
        <div>
            {/* 父组件通过给子组件添加属性 ref={ref} 将ref作为参数传递给子组件 */}
            <ChildComponent label='child bt' ref={ref}/>
            <button onClick={clickHandle}>get child bt ref</button>
        </div>
    )
}

export default Forward;