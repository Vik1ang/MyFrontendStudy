import React, {useState, useEffect} from "react";

function Example1() {
    const [a, setA] = useState(0); // 定义变量a, 并且默认值为0

    useEffect(() => {
        // 无论是第一次挂载还是以后每次组件更新, 修改网页标题的执行代码只需要在这里写一次即可
        document.title = `${a} - ${Math.floor(Math.random() * 100)}`;
    })

    const clickAbtHandler = (event) => {
        setA(a + 1);
    }

    return (
        <div>
            {a}
            <button onClick={clickAbtHandler}>a + 1</button>
        </div>
    )
}

export default Example1;