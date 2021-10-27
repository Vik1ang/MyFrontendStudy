import React, {useContext} from "react";
import Example1GlobalContext from "./Example1-global-context";

function AppComponent() {
    // 标签<Example1GlobalContext.Provider>中向下传递数据, 必须使用value这个属性, 且数据必须是键值对类型的object
    // 如果不添加value, 那么子组件获取到的共享数据value值是React.createContext(defaultValues)中的默认值defaultValues

    return (
        <div>
            <Example1GlobalContext.Provider value={{name: 'vi', age: 1}}>
                <MiddleComponent/>
            </Example1GlobalContext.Provider>
        </div>
    )
}

function MiddleComponent() {
    // MiddleComponent 不需要做任何 '属性数据传递接力', 因此降低该组件数据传递复杂性, 提高组件可复用性
    return (
        <div>
            <ChildComponent/>
        </div>
    )
}

function ChildComponent() {
    const global = useContext(Example1GlobalContext); // 获取共享数据对象的value值

    // 忘掉<GlobalContext.Consumer>标签, 直接用global获取需要的值
    return (
        <div>
            {global.name} - {global.age}
        </div>
    );
}

export default AppComponent;