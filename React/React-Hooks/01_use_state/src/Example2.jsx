import React, {useState} from "react";

function Example2() {
    const initCount = 0;
    const [count, setCount] = useState(initCount);

    return (
        <div>
            {count}
            <button onClick={() => {
                setCount(initCount)
            }}>init
            </button>
            <button onClick={() => {
                setCount(count + 1)
            }}>+1
            </button>
            <button onClick={() => {
                setCount(count - 1)
            }}>-1
            </button>
            <button onClick={() => {
                let prevData = count;
                for (let i = 0; i < 3; i++) {
                    setCount(prevData => prevData + 1);
                }
            }}>Adding 3
            </button>
        </div>
    )
}

export default Example2;
