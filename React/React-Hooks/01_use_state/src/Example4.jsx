import React, {useState} from "react";

function Example4() {
    const [str, setStr] = useState('');
    const [arr, setArr] = useState(['react', 'Koa']);

    const inputChangeHandler = (event) => {
        setStr(event.target.value);
    }

    const addHeadHandler = (event) => {
        setArr([str, ...arr]);//添加至头
        setStr('');
    }

    const addEndHandler = (event) => {
        setArr([...arr, str]);//添加至尾
        setStr('');
    }

    const delHeadHandler = (event) => {
        let new_arr = [...arr];
        new_arr.shift();//从头删除1项目
        setArr(new_arr);
    }

    const delEndHandler = (event) => {
        let new_arr = [...arr];
        new_arr.pop();//从尾删除1项目
        setArr(new_arr);
    }

    const delByIndex = (event) => {
        let index = event.target.attributes.index.value;
        let new_arr = [...arr];
        new_arr.splice(index, 1);//删除当前项
        setArr(new_arr);
    }

    return (
        <div>
            <input type='text' value={str} onChange={inputChangeHandler}/>
            <button onClick={addHeadHandler}>添加至头</button>
            <button onClick={addEndHandler}>添加至尾</button>
            <button onClick={delHeadHandler}>从头删除1项</button>
            <button onClick={delEndHandler}>从尾删除1项</button>
            <ul>
                {arr.map(
                    (item, index) => {
                        return (
                            <li key={`item${index}`}>学习{index} - {item}
                                <span index={index} onClick={delByIndex} style={{cursor: 'pointer'}}>删除</span>
                            </li>
                        )
                    }
                )}
            </ul>
        </div>
    )
}

export default Example4;
