import React, {useState} from "react";

function Example3() {
    const [person, setPerson] = useState({name: 'vi', age: 1});

    const nameChangeHandler = (event) => {
        setPerson({...person, name: event.target.value});
    }

    const ageChangeHandler = (event) => {
        setPerson({...person, age: event.target.value});
    }
    return (
        <div>
            <input type='text' value={person.name} onChange={nameChangeHandler}/>
            <input type='number' value={person.age} onChange={ageChangeHandler}/>
            {JSON.stringify(person)}
        </div>
    )
}

export default Example3;
