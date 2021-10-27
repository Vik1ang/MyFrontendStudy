# useRef

### useRef概念解释

**勾住**某些组件挂载完成或重新渲染完成后才拥有的某些对象, 并返回该对象的引用; 该引用在组件整个生命周期中都固定不变, 该引用并不会随着组件重新渲染而失效

#### 某些组件挂载完成或重新渲染完成后才拥有的某些对象

这句话中的**某些对象**主要分为3种: `JSX组件转换后对应的真实DOM对象`, `在useEffect中创建的变量`, `子组件内自定义的函数(方法)`

##### JSX组件转换后对应的真实DOM对象

假设在JSX中, 有一个输入框`<input type='text' />`, 这个标签最终将编译转换成真正的html标签中的`<input type='text'/>`

1. JSX中小写开头的组件看似和原生html标签相似, 但是并不是真的原生标签, 依然是react内置组件
2. 什么时候转换? 虚拟DOM转化为真实DOM
3. 什么时候可访问? 组件挂载完成或重新渲染完成后

对于上面举例中的那个转换后的`<input/>` 真实DOM, 只有组件挂载完成或重新渲染完成后才可以访问, 它就就属于**某些组件挂载完成或重新渲染完成后才拥有的某些对象**

> 特别强调: `useRef`只适合**勾住**小写开头的类似原生标签的组件; 如果是自定义的react组件(自定义的组件必须大写字母开头), 那么是无法使用useRef的

用`useRef`获取这个 `<input/>` 真实DOM

##### 第2: 在useEffect中创建的变量

```jsx
useEffect(() => {
    let timer = setInterval(() => {
        setCount(prevData => prevData + 1);
    }, 1000);
    return () => {
        clearInterval(timer);
    }
}, []);
```

上述代码中, 请注意这个timer是在useEffect中才定义的

`useEffect` 以外的地方, 该如何获取这个 `timer` 的引用? 使用 `useRef`

##### 第3: 子组件内自定义的函数(方法)

啊哈

#### 并返回该对象的引用

#### 该引用在组件整个生命周期中都固定不变

假设通过useRef获得了该对象的引用, 那么当react组件重新渲染后, 如何保证该引用不丢失?

react在底层帮我们做了这个工作, 我们只需要相信之前的引用可以继续找到目标对象即可

请注意: `React.createRef()`也有useRef相似效果, 但是React.createRef无法全部适用上面提到的3种情况

### useRef是来解决什么问题

useRef可以**获取某些组件挂载完成或重新渲染完成后才拥有的某些对象**的引用, 且保证该引用在组件整个生命周期内固定不变, 都能准确找到我们要找的对象

1. useRef是针对函数组件的, 如果是类组件则使用React.createRef()
2. React.createRef()也可以在函数组件中使用

只不过`React.createRef`创建的引用不能保证每次重新渲染后引用固定不变;

如果你只是使用`React.createRef`**勾住**JSX组件转换后对应的真实DOM对象是没问题的, 但是如果想**勾住**在`useEffect`中创建的变量, 那是做不到的

### useRef基本用法

useRef(initialValue)函数只有1个可选参数, 该参数为默认**勾住**的对象

绝大多数实际的情况是, 默认**勾住**的对象在JSX未编译前(组件挂载或重新渲染后)根本不存在, 所以更多时候都会传一个 null 作为默认值, 如果不传任何参数, 那么react默认将参数设置为`undefined`

**提到的组件, 默认都是指小写开头的类似原生标签的组件, 不可以是自定义组件**

接下来具体说说useRef关联对象的2种用法:

1. 针对 JSX组件, 通过属性 `ref={xxxRef}` 进行关联
2. 针对 useEffect中的变量, 通过 `xxxRef.current` 进行关联

```jsx
// 先定义一个xxRef引用变量, 用于勾住某些组件挂载完成或重新渲染完成后才拥有的某些对象
const xxRef = useRef(null);

// 针对 JSX组件，通过属性 ref={xxxRef} 进行关联
<xxx ref={xxRef}/>

// 针对 useEffect中的变量, 通过 xxxRef.current 进行关联
useEffect(() => {
    xxRef.current = xxxxxx;
}, []);
```

1. 组件的 ref 为特殊属性名, 他并不存在组件属性传值的 props 中
2. 如果给一个组件设定了 ref 属性名, 但是对应的值却不是由 useRef 创建的, 那么实际运行中会收到react的报错, 无法正常渲染

**useRef只能针对react中小写开头的类似原生标签的组件, 所以这里用的是 <xxx> 而不是 <Xxx>**

**当需要使用勾住的对象时也是通过xxRef.current来获取该对象的**

### Example1

我们有一个组件, 该组件只有一个输入框, 我们希望当该组件挂载到网页后, 自动获得输入焦点

1. 我们可以很轻松使用<input >创建出这个输入框
2. 需要使用useRef **勾住**这个输入框, 当它被挂载到网页后, 通过操作原生html的方法, 将焦点赋予该输入框上

```jsx
import React, {useEffect, useRef} from "react";

function Example1() {
    // 先定义一个inputRef引用变量, 用于"勾住"挂载网页后的输入框
    const inputRef = useRef(null);

    useEffect(() => {
        // inputRef.current就是挂载到网页后的那个输入框, 一个真实DOM, 因此可以调用html中的方法focus()
        inputRef.current.focus();
    }, []);

    return (
        <div>
            {/* 通过 ref 属性将 inputRef与该输入框进行挂钩 */}
            <input type='text' ref={inputRef}/>
        </div>
    )
}

export default Example1;
```

1. 在给组件设置 ref 属性时，只需传入 inputRef, 千万不要传入 `inputRef.current`
2. 在**勾住**渲染后的真实DOM输入框后, 能且只能调用原生html中该标签拥有的方法

### Example2

1. 组件中有一个变量count, 当该组件挂载到网页后, count每秒自动 +1
2. 组件中有一个按钮, 点击按钮可以停止count自动+1

需求分析:

1. 声明内部变量`count`用 `useState`
2. 可以在`useEffect` 通过``setInterval`创建一个计时器timer, 实现count每秒自动 +1
3. 当组件卸载前, 需要通过 ``clearInterval` 将timer清除 4、按钮点击处理函数中，也要通过 clearInterval 将timer清除

假设我们不使用useRef, 那该如何实现?

为了确保timer可以被useEffect以外地方也能访问, 我们通常做法是将timer声明提升到useEffect以外

```jsx
import React, {useState, useEffect} from "react";

function Example2() {
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(null); // 单独声明定义timer, 目的是为了让组件内所有地方都可以访问到timer

    useEffect(() => {
        // 需要用setTimer()包裹住 setInterval()
        setTimer(setInterval(() => {
            setCount(prevData => prevData + 1);
        }, 1000));

        return () => {
            // 清楚timer
            clearInterval(timer);
        }
    }, []);

    const clickHandler = () => {
        // 清楚timer
        clearInterval(timer);
    }

    return (
        <div>
            {count}
            <button onClick={clickHandler}>Stop</button>
        </div>
    )

}

export default Example2;
```

使用useRef:

```jsx
import React, {useState, useEffect, useRef} from "react";

function Example3() {
    const [count, setCount] = useState(0);
    const timerRef = useRef(null); // 先定义一个timerRef引用变量, 用于"勾住"useEffect中通过setInterval创建的计时器

    useEffect(() => {
        // 将timerRef.current与setInterval创建的计时器进行挂钩
        timerRef.current = setInterval(() => {
            setCount(prevData => prevData + 1);
        }, 1000);

        return () => {
            // 清楚timer
            clearInterval(timerRef.current);
        }
    }, []);

    const clickHandler = () => {
        // 清楚timer
        clearInterval(timerRef.current);
    }

    return (
        <div>
            {count}
            <button onClick={clickHandler}>Stop</button>
        </div>
    )

}

export default Example3;
```

1. 两种实现方式最主要的差异地方在于 如何创建组件内对计时器的引用
2. 两种创建引用的方式, 分别是：用useState创建的timer, 用useRef创建的timerRef
3. 在使用setInterval时, 相对来说timerRef.current更加好用简单, 结构清晰, 不需要像 setTimer那样需要再多1层包裹
4. timer更像是一种react对计时器的映射, 而timerRef直接就是真实DOM中计时器的引用, timerRef能够调用更多的原生html中的JS方法和属性

结论:

1. 如果需要对渲染后的DOM节点进行操作, 必须使用useRef
2. 如果需要对渲染后才会存在的变量对象进行某些操作, 建议使用useRef

### 那如何勾住自定义组件中的**小写开头的类似原生标签的组件**

`React.forwardRef()`

React.forwardRef()包裹住要输出的组件, 且将第2个参数设置为 ref 即

```jsx
import React from 'react'

const ChildComponent = React.forwardRef((props, ref) => {
    //子组件通过将第2个参数ref 添加到内部真正的“小写开头的类似原生标签的组件”中 
    return <button ref={ref}>{props.label}</button>
});

/* 上面的子组件直接在父组件内定义了，如果子组件是单独的.js文件，则可以通过
   export default React.forwardRef(ChildComponent) 这种形式  */

function Forward() {
    const ref = React.useRef();//父组件定义一个ref
    const clickHandle = () => {
        console.log(ref.current);//父组件获得渲染后子组件中对应的DOM节点引用
    }
    return (
        <div>
            {/* 父组件通过给子组件添加属性 ref={ref} 将ref作为参数传递给子组件 */}
            <ChildComponent label='child bt' ref={ref}/>
            <button onClick={clickHandle}>get child bt ref</button>
        </div>
    )
}

export default Forward;
```