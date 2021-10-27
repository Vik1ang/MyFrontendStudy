import React, {useState, useEffect} from "react";

function Example3() {

    const [obj, setObj] = useState({a: 0, b: 0});

    useEffect(() => {
        document.title = `${obj.a} - ${Math.floor(Math.random() * 50)}`;
    }, [obj.a]);

    return (
        <div>
            {JSON.stringify(obj)}
            <button onClick={() => {
                setObj({...obj, a: obj.a + 1})
            }}>a+1
            </button>
            <button onClick={() => {
                setObj({...obj, b: obj.b + 1})
            }}>b+1
            </button>
        </div>
    )

}

export default Example3;