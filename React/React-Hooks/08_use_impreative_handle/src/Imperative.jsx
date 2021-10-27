import React, {useRef} from "react";
import ChildComponent from "./ChildComponent";

function Imperative() {
    const childRef = useRef(null); // 父组件定义一个对子组件的引用

    const clickHandler = () => {
        childRef.current.addCount();  // 父组件调用子组件内部 addCount函数
    }

    return (
        <div>
            {/* 父组件通过给子组件添加 ref 属性, 将childRef传递给子组件，
            子组件获得该引用即可将内部函数添加到childRef中 */}
            <ChildComponent ref={childRef}/>
            <button onClick={clickHandler}>child component do something</button>
        </div>
    )
}

export default Imperative;