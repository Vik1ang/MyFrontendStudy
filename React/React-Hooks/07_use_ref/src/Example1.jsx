import React, {useEffect, useRef} from "react";

function Example1() {
    // 先定义一个inputRef引用变量, 用于"勾住"挂载网页后的输入框
    const inputRef = useRef(null);

    useEffect(() => {
        // inputRef.current就是挂载到网页后的那个输入框, 一个真实DOM, 因此可以调用html中的方法focus()
        inputRef.current.focus();
    }, []);

    return (
        <div>
            {/* 通过 ref 属性将 inputRef与该输入框进行挂钩 */}
            <input type='text' ref={inputRef}/>
        </div>
    )
}

export default Example1;