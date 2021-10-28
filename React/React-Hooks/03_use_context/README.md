# useContext

### useContext概念解释

**勾住** 获取由`React.createContext()创建`, `<XxxContext.Provider>添加设置的共享数据value值`

`useContext`可以替代`<XxxContext.Consumer>`标签, 简化获取共享数据的代码

原本不同级别的组件之间传递属性值, 必须逐层传递, 即使中间层的组件不需要这些数据

为了解决这个问题:

1. 在组件顶层或单独的模块中, 由`React.createContext()`创建一个共享数据对象
2. 在父组件中添加共享数据对象的引用, 通过且只能通过`<XxxContext.provider value={{xx:'xxx'}}></XxxContext.provider>`
   的形式将数据传递给子组件。请注意传值必须使用`value={obj}`这种形式
3. 若下一层的子组件用不到共享数据对象中的数据, 则可以不做任何属性标签传递
4. 若某一层的子组件需要用到共享数据对象的数据, 则可通过`<XxxContext.Consumer></XxxContext.Consumer>`获取到数据
5. 在类组件中除了`<XxxContext.Consumer>`标签, 还有另外一种获取共享数据方式: `static xxx = XxxContext`, 但是这种形式在函数组件中无法使用

<XxxContext.Provider>用来添加共享数据, <XxxContext.Consumer>用来获取共享数据

### useContext用来解决什么问题

useContext是 <XxxContext.Consumer> **替代品**, 可以大量简化获取共享数据值的代码

1. 函数组件和类组件, 对于<XxxContext.Provider>, <XxxContext.Consumer>使用方式没有任何差别
2. 你可以在函数组件中不使用useContext, 继续使用<XxxContext.Consumer>, 这都没问题; 只不过使用useContext后, 可以让获取共享数据相关代码简单一些

### useContext基本用法

`useContext(context)`函数可以传入1个参数, 该参数为共享数据对象的实例, useContext函数会返回该共享对象实例的value值

```jsx
import Example1GlobalContext from './global-context'; // 引入共享数据对象

function Component() {
    const global = useContext(Example1GlobalContext); // 在函数组件中声明一个变量来代表该共享数据对象的value值

    // 若想获取共享数据对象中的属性xxx的值, 直接使用global.xxx即可
    return <div>
        {global.xxx}
    </div>
}
```

1. 子组件(函数组件)需要先引入共享数据对象`Example1GlobalContext`
2. 内部定义一个常量global, 用来接收`useContext`函数返回`Example1GlobalContext`的value值
3. 函数组件在return时, 可以不使用`<GlobalCount.Customer>`标签, 而是直接使用`global.xx`来获取共享数据
4. 请注意，这里执行的依然是单向数据流, 只可以获取global.xx, 不可以直接更改global.xx

```jsx
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
```

假如ChildComponent不使用useContext, 而是使用`<GlobalContext.Consumer>`标签, 那么代码相应修改为:

```jsx
function ChildComponent() {
    return <GlobalContext.Consumer>
        {
            global => {
                return <div>{global.name} - {global.age}</div>
            }
        }
    </GlobalContext.Consumer>
}
```

使用useContext可以大大降低获取数据代码复杂性

### 同时传递多个共享数据值给1个子组件

实现以下组件需求:

1. 有2个共享数据对象 UserContext, NewsContext
2. 父组件为AppComponent, 子组件为ChildComponent
3. 父组件需要同时将UserContext, NewsContext的数据同时传递给子组件

```jsx
import React, {useContext} from "react";

const UserContext = React.createContext();
const NewsContext = React.createContext();

function AppComponent() {
    return (
        <UserContext.Provider value={{name: 'vi'}}>
            <NewsContext.Provider value={{'title': 'Reacts hooks'}}>
                <ChildComponent/>
            </NewsContext.Provider>
        </UserContext.Provider>
    )
}

function ChildComponent() {
    const user = useContext(UserContext);
    const news = useContext(NewsContext);
    return (
        <div>
            {user.name} - {news.title}
        </div>
    )
}

export default AppComponent;

```

1. 父组件同时要实现传递2个共享数据对象value值, 需要使用<XxxContext.Provider value={obj}>标签进行2次嵌套
2. 子组件使用了useContext, 他可以自由随意使用父组件传递过来的共享数据value, 并不需要多次嵌套获取

### 同时将1个共享数据值传递给多个子组件

使用<XxxContext.Provider></XxxContext.Provider>标签将多个子组件包裹起来, 即可实现

```jsx
<XxxContext.Provider value={{name: 'vi'}}>
    <ComponentA/>
    <ComponentB/>
    <ComponentC/>
</XxxContext.Provider>
```