import React, {useState, useEffect} from "react";
import Button from "./Button";

function MyButton() {
    const [age, setAge] = useState(1);
    const [salary, setSalary] = useState(1000);

    useEffect(() => {
        document.title = `Hooks - ${Math.floor(Math.random() * 100)}`;
    });

    const clickHandler01 = () => {
        setAge(age + 1);
    }

    const clickHandler02 = () => {
        setSalary(salary + 1);
    }

    return (
        <div>
            {age} -- {salary}
            <Button label='btn01' clickHandler={clickHandler01}/>
            <Button label='btn02' clickHandler={clickHandler02}/>
        </div>
    );
}

export default MyButton;