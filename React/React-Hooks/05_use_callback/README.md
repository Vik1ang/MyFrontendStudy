# useCallback

### 基本解释

**勾住**组件属性中某些处理函数, 创建这些函数对应在react原型链上的变量引用

useCallback第2个参数是处理函数中的依赖变量, 只有当依赖变量发生改变时才会重新修改并创建新的一份处理函数

##### React.memo()的用法

首先我们知道, 默认情况下如果父组件重新渲染, 那么该父组件下的所有子组件都会随着父级的重新渲染而重新渲染

1. 无论子组件是类组件或是函数组件
2. 无论子组件在本次渲染过程中，子组件是否有任何相关的数据变化

举例, 假设某父组件中有3个子组件: 子组件A, 子组件B, 子组件C; 若因为子组件A发生了某些操作, 引发父组件重新渲染, 这时即使子组件B和子组件C没有任何需要更改的地方, 但是默认他们两个也会重新被渲染一次

为了减少这个不必要的重新渲染, 如果是类组件, 可以在组件`shouldComponentUpdate(准备要开始更新前)`生命周期函数中, 通过比较props和state中前后两次的值, 如果完全相等则跳过本次渲染,
改为直接使用上一次渲染结果, 以此提高性能提升

```jsx
shouldComponentUpdate(nextProps, nextStates)
{
    // 判断xxx值是否相同，如果相同则不进行重新渲染
    return (nextProps.xxx !== this.props.xxx); // 注意是 !== 而不是 !=
}
```

为了简化我们这一步操作, 可以将类组件由默认继承自`React.Component`改为`React.PureComponent`, `React.PureComponent`默认会帮我们完成上面的浅层对比, 以跳过本次重新渲染

请注意: `React.PureComponent`会对props上所有可枚举属性做一遍**浅层对比**; 而不像 `shouldComponentUpdate`中可以有针对性的只对某属性做对比

上面讲的都是类组件, 与之对应的是`React.memo()`, 这个是针对函数组件的, 作用和`React.PureComponent`完全相同

`React.memo()`的使用方法很简单, 就是把要导出的函数组件包裹在React.memo中即可

```jsx
import React from 'react'

function Xxxx() {
    return <div>xx</div>;
}

export default React.memo(Xxxx); // 使用React.memo包裹住要导出的函数组件
```

1. `React.memo()`只会帮我们做浅层对比, 例如`props.name='vi'`或`props.list=[1,2,3]`, 如果是props中包含复杂的数据结构, 例如`props.obj.list=[{age:34}]`
   , 那么有可能达不到你的预期,, 因为不会做到深层次对比
2. 使用`React.memo`仅仅是让该函数组件具备了可以跳过本次渲染的基础, 若组件在使用的时候属性值中有某些处理函数, 那么还需要配合`useCallback`才可以做到跳过本次重新渲染

### useCallback是来解决什么问题的?

`useCallback`是通过获取函数在react原型链上的引用, 当即将重新渲染时, 用旧值的引用去替换旧值, 配合`React.memo()`, 达到**阻止组件不必要的重新渲染**

`useCallback`可以将组件的某些处理函数挂载到react底层原型链上, 并返回该处理函数的引用, 当组件每次即将要重新渲染时, 确保props中该处理函数为同一函数(因为是同一对象引用, 所以===运算结果一定为true),
跳过本次无意义的重新渲染, 达到提高组件性能的目的; 当然前提是该组件在导出时使用了`React.memo()`

> 默认不使用useCallback, 其实组件执行了以下伪代码

```jsx
let obj = {}; // 上一次渲染时创建的props
obj.myfun = {xxx}; // props中的myfun属性值，实为独立创建的{xxx}

let obj2 = {}; // 本次渲染时创建的props
obj2.myfun = {xxx}; // props中的myfun属性值，实为独立创建的{xxx}

if (obj.myfun === obj2.myfun) {
    // 跳过本次重新渲染，改为使用上一次渲染结果即可
}
```

由于`obj.myfun` 和 `obj2.myfun `为分别独立创建的函数{xxx}, 所以对比结果为`false`, 也就意味着无法跳过本次重新渲染, 尽管函数{xxx}字面相同

相反, 如果使用useCallback，其实组件执行了以下伪代码:

```jsx
let myfun = {xxx}; // 独立定义处理函数myfun

let obj = {}; // 上一次渲染时创建的props
obj.myfun = myfun; // props中的myfun属性值，实为myfun的引用

let obj2 = {}; //本次渲染时创建的props
obj2.myfun = myfun; //props中的myfun属性值，实为myfun的引用

if (obj.myfun === obj2.myfun) {
    //跳过本次重新渲染，改为使用上一次渲染结果即可
}
```

此时 `obj.myfun` 和 `obj2.myfun `均为`myfun`的引用, 因此该对比结果为true, 也就意味着可以顺利跳过本次渲染, 达到提高组件性能的目的

### useCallback基本用法

`useCallback(callback,deps`)函数通常传入2个参数, 第1个参数为我们定义的一个**处理函数**, **通常为一个箭头函**; 第2个参数为该处理函数中存在的**依赖变量**,
请注意凡是处理函数中有的数据变量都需要放入deps中

如果处理函数没有任何依赖变量, 可以传入一个空数组[]

> useCallback中的第2个依赖变量数组和useEffect中第2个依赖变量数组, **作用完全不相同**
> useEffect中第2个依赖变量数组是真正起作用的, 是具有关键性质的
> 而useCallback中第2个依赖变量数组目前作用来说仅仅是起到一个辅助作用

在React官方文档中，针对第2个参数有以下这段话:

> 注意：依赖项数组不会作为参数传给回调函数。虽然从概念上来说它表现为：所有回调函数中引用的值都应该出现在依赖项数组中。未来编译器会更加智能，届时自动创建数组将成为可能。

```jsx
import Button from './button'; // 引入我们自定义的一个组件<Button>

// 组件内部声明一个age变量
const [age, setAge] = useState(34);

// 通过useCallback，将鼠标点击处理函数保存到React底层原型链中，并获取该函数的引用，将引用赋值给clickHandler
const clickHandler = useCallback(() => {
    setAge(age + 1);
}, [age]);
// 由于该处理函数中使用到了age这个变量，因此useCallback的第2个参数中, 需要将age添加进去

// 使用该处理函数, 实为使用该处理函数的在React底层原型链上的引用
return <Button clickHandler={clickHandler}></Button>
```

age补充说明:

1. 上述代码示例中, age为该组件通过`useState`创建的内部变量, 事实上也可以是父组件通过属性传值的`props.xx`中的变量
2. 只要依赖变量不发生变化, 那么重新渲染时就可以一直使用之前创建的那个函数, 达到阻止本次渲染，提升性能的目的; 但是如果依赖变量发生变化, 那么下次重新渲染时根据变量重新创建一份处理函数并替换React底层原型链上原有的处理函数

`clickHandler` 补充说明:

1. clickHandler实际上是真正的处理函数在React底层原型链上的引用

### Example

自定义组件<Button>:

```jsx
import React from 'react';

function Button({label, clickHandler}) {
    // 为了方便我们查看该子组件是否被重新渲染, 这里增加一行console.log代码
    console.log(`rendering ... ${label}`);
    return (
        <button onClick={clickHandler}>${label}</button>
    )
}

export default React.memo(Button); // 使用React.memo()包裹住要导出的组件
```

我们要实现一个组件, 功能如下:

1. 组件内部有2个变量age, salary
2. 有2个自定义组件Button, 点击之后分别可以修改age, salary值

##### 不使用 useCallback

```jsx
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
```

无论点击哪个按钮:

```shell
rendering ... btn01
rendering ... btn02
```

**性能浪费**

##### 使用useCallback

```jsx
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
```

**使用useCallback减少子组件没有必要的渲染目的达成**