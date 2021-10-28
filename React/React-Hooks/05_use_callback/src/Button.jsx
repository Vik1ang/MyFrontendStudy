import React from 'react';

function Button({label, clickHandler}) {
    // 为了方便我们查看该子组件是否被重新渲染, 这里增加一行console.log代码
    console.log(`rendering ... ${label}`);
    return (
        <button onClick={clickHandler}>${label}</button>
    )
}

export default React.memo(Button); // 使用React.memo()包裹住要导出的组件