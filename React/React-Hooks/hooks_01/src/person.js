import React, {useState} from "react";

let showSex = true;

function Person() {
    const [age, setAge] = useState(18); 
    /*if (showSex) {
        const [sex, setSex] = useState('male');
        showSex = false;
    }*/ // 会报错
    const [sex, setSex] = useState('male');
    const [work, setWork] = useState('work');

    return (
        <div>
            <p>age: {age}</p>
            <p>gender: {sex}</p>
            <p>work: {work}</p>
        </div>
    )
}

export default Person;