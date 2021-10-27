# useImperativeHandle

### useImperativeHandle概念解释

**勾住**子组件中某些函数(方法)供父组件调用

react属于单向数据流, 父组件可以通过属性传值, 将父组件内的函数(方法)传递给子组件, 实现子组件调用父组件内函数的目的

`useRef` 可以**勾住**某些本组件挂载完成或重新渲染完成后才拥有的某些对象

`React.forwardRef` 可以**勾住**某些子组件挂载完成或重新渲染完成后才拥有的某些对象

上面无论哪种情况, 由于勾住的对象都是渲染后的原生html对象, 父组件只能通过ref调用该原生html对象的函数(方法)

useImperativeHandle()能够调用子组件中自定义的方法

### useImperativeHandle是来解决什么问题

`useImperativeHandle`可以让父组件获取并执行子组件内某些自定义函数(方法)

本质上其实是子组件将自己内部的函数(方法)通过useImperativeHandle添加到父组件中useRef定义的对象中

1. useRef创建引用变量
2. React.forwardRef将引用变量传递给子组件
3. useImperativeHandle将子组件内定义的函数作为属性, 添加到父组件中的ref对象上

因此, 如果想使用useImperativeHandle, 那么还要结合`useRef`, `React.forwardRef`一起使用

### useImperativeHandle基本用法

`useImperativeHandle(ref,create,[deps])`函数前2个参数为必填项, 第3个参数为可选项

1. 第1个参数为父组件通过useRef定义的引用变量
2. 第2个参数为子组件要附加给ref的对象, 该对象中的属性即子组件想要暴露给父组件的函数(方法)
3. 第3个参数为可选参数, 为函数的依赖变量; 凡是函数中使用到的数据变量都需要放入deps中, 如果处理函数没有任何依赖变量, 可以忽略第3个参数

请注意:

1. 这里面说的**勾住子组件内自定义函数**本质上是子组件将内部自定义的函数添加到父组件的ref.current上面
2. 父组件若想调用子组件暴露给自己的函数, 可以通过 `ref.current.xxx` 来访问或执行

```jsx
const xxx = () => {
    //do smoting...
}
useImperativeHandle(ref, () => ({xxx}));
```

特别注意: `() => ({xxx})` 不可以再简写成 `() => {xxx}`, 如果这样写会直接react报错

因为这两种写法意思完全不一样:

1. `() => ({xxx})` 表示 返回一个object对象, 该对象为{xxx}
2. `() => {xxx}` 表示 执行 xxx 语句代码

拆解说明:

1. 子组件内部先定义一个 xxx 函数
2. 通过`useImperativeHandle`函数, 将 xxx函数包装成一个对象, 并将该对象添加到父组件内部定义的ref中
3. 若 xxx 函数中使用到了子组件内部定义的变量, 则还需要将该变量作为 **依赖变量** 成为useImperativeHandle第3个参数, 上面示例中则选择忽略了第3个参数
4. 若父组件需要调用子组件内的 xxx函数, 则通过: `res.current.xxx()`
5. 请注意, 该子组件在导出时必须被 `React.forwardRef()` 包裹住才可以

### Example1

若某子组件的需求为:

1. 有变量count, 默认值为0
2. 有一个函数 addCount, 该函数体内部执行 count+1
3. 有一个按钮, 点击按钮执行 addCount 函数

子组件:

```jsx
import React, {useState, useImperativeHandle} from "react";

function ChildComponent(props, ref) {
    const [count, setCount] = useState(0);
    // 子组件定义内部函数 addCount
    const addCount = () => {
        setCount(count + 1);
    }

    // 子组件通过useImperativeHandle函数, 将addCount函数添加到父组件中的ref.current中
    useImperativeHandle(ref, () => ({addCount}));

    return (
        <div>
            {count}
            <button onClick={addCount}>child</button>
        </div>
    )
}

//子组件导出时需要被React.forwardRef包裹, 否则无法接收 ref这个参数
export default React.forwardRef(ChildComponent);
```

父组件:

```jsx
import React, {useRef} from "react";
import ChildComponent from "./ChildComponent";

function Imperative() {
    const childRef = useRef(null); // 父组件定义一个对子组件的引用

    const clickHandler = () => {
        childRef.current.addCount();  // 父组件调用子组件内部 addCount函数
    }

    return (
        <div>
            {/* 父组件通过给子组件添加 ref 属性, 将childRef传递给子组件，
            子组件获得该引用即可将内部函数添加到childRef中 */}
            <ChildComponent ref={childRef}/>
            <button onClick={clickHandler}>child component do something</button>
        </div>
    )
}

export default Imperative;
```

### 思考一下真的有必要使用useImperativeHandle吗?

从实际运行的结果, 无论点击子组件还是父组件内的按钮, 都将执行 addCount函数, 使 count+1

react为单向数据流, 如果为了实现这个效果, 我们完全可以把需求转化成另外一种说法:

1. 父组件内定义一个变量count 和 addCount函数
2. 父组件把 count 和 addCount 通过属性传值 传递给子组件
3. 点击子组件内按钮时调用父组件内定义的 addCount函数，使 count +1

