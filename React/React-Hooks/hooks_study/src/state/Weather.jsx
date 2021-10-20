import React, { useState } from 'react';

function Weather() {

    const [isHot, setHot] = useState(false);
    const [wind, setWind] = useState('微风');

    function changeWeather() {
        setHot(!isHot);
        setWind(!isHot ? '没有风' : '微风');
    }

    return (
        <h1 onClick={changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}, {wind}</h1>
    )
}

export default  Weather;