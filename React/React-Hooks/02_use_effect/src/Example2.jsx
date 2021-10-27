import React, {useState, useEffect} from "react";

function Example2() {
    const [a, setA] = useState(0); // 定义变量a, 并且默认值为0

    // 定义第1个useEffect，专门用来处理自动累加器
    useEffect(() => {
        let timer = setInterval(() => {
            setA(a => a + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []); // 此处第2个参数为[], 告知React以后该组件任何更新引发的重新渲染都与此useEffect无关

    // 定义第2个useEffect, 专门用来处理网页标题更新
    useEffect(() => {
        document.title = `${a} - ${Math.floor(Math.random() * 100)}`;
    }, [a]);

    return (
        <div>
            {a}
        </div>
    )
}

export default Example2;