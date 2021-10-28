import React, {useState, useEffect, useLayoutEffect} from 'react'

function LayoutEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('useEffect...');
    }, [count]);

    useLayoutEffect(() => {
        console.log('useLayoutEffect...');
    }, [count]);

    return (
        <div>
            {count}
            <button onClick={() => {
                setCount(count + 1)
            }}>Click
            </button>
        </div>
    )
}

export default LayoutEffect;