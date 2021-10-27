import React, {useState, useEffect, useRef} from "react";

function Example3() {
    const [count, setCount] = useState(0);
    const timerRef = useRef(null); // 先定义一个timerRef引用变量, 用于"勾住"useEffect中通过setInterval创建的计时器

    useEffect(() => {
        // 将timerRef.current与setInterval创建的计时器进行挂钩
        timerRef.current = setInterval(() => {
            setCount(prevData => prevData + 1);
        }, 1000);

        return () => {
            // 清楚timer
            clearInterval(timerRef.current);
        }
    }, []);

    const clickHandler = () => {
        // 清楚timer
        clearInterval(timerRef.current);
    }

    return (
        <div>
            {count}
            <button onClick={clickHandler}>Stop</button>
        </div>
    )

}

export default Example3;