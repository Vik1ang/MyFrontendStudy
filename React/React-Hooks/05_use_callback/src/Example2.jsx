import React, {useState, useEffect, useCallback} from "react";
import Button from "./Button";

function MyButton() {
    const [age, setAge] = useState(1);
    const [salary, setSalary] = useState(1000);

    useEffect(() => {
        document.title = `Hooks - ${Math.floor(Math.random() * 100)}`;
    });

    // 使用useCallback()包裹住原来的处理函数
    const clickHandler01 = useCallback(() => {
        setAge(age + 1);
    }, [age]);

    const clickHandler02 = useCallback(() => {
        setSalary(salary + 1);
    }, [salary]);

    return (
        <div>
            {age} -- {salary}
            <Button label='btn01' clickHandler={clickHandler01}/>
            <Button label='btn02' clickHandler={clickHandler02}/>
        </div>
    );
}

export default MyButton;