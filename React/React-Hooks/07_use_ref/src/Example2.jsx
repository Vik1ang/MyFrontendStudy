import React, {useState, useEffect} from "react";

function Example2() {
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(null); // 单独声明定义timer, 目的是为了让组件内所有地方都可以访问到timer

    useEffect(() => {
        // 需要用setTimer()包裹住 setInterval()
        setTimer(setInterval(() => {
            setCount(prevData => prevData + 1);
        }, 1000));

        return () => {
            // 清楚timer
            clearInterval(timer);
        }
    }, []);

    const clickHandler = () => {
        // 清楚timer
        clearInterval(timer);
    }

    return (
        <div>
            {count}
            <button onClick={clickHandler}>Stop</button>
        </div>
    )

}

export default Example2;