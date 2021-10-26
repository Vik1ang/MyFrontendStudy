# useState

## 基本用法

### useState 概念解释

作用是**勾住**函数组件中自定义的变量

### useState 是来解决类组件的什么问题

useState能够解决类组件 **所有自定义变量只能存储在`this.state`** 的问题

若某组件需要有2个自定义变量`name`和`age`, 那么在类组件中只能如下定义:

```js
constructor(props)
{
    super(props);
    this.state = {
        'name': 'v',
        'age': 1
    }
}
```

`name`和`age`只能作为`this.state`的一个属性

使用`useState`后, 函数组件实现上述需求:

```js
const [name, setName] = useState('v);
const [age, setAge] = useState(1);
```

1. 函数组件本身是一个函数, 不是类, 因此没有构造函数
2. 任何想定义的变量都可以单独拆分出去, 独立定义, 互不影响

使用Hook的useState后, 会让我们定义的变量相对独立, 清晰简单, 便于管理

### useState 函数源码

### useState 基本用法

useState(value)函数会返回一个数组, 该数组包含2个元素:第1个元素为我们定义的变量, 第2个元素为修改该变量对应的函数名称

```js

const [variable, setVariable] = useState(value);
//....
setVariable(newValue); //修改variable的值

```

`setVariable(newValue)` 为调用`setVariable`并将新的值`newValue`赋值给`variable`

### useState使用示例

```jsx
import React, {useState} from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}
```

## 高级用法

### 恢复默认值

组件需求: 实现一个计数器, 有3个按钮, 点击后分别实现: `恢复默认值`, `点击+1`, `点击-1`

```jsx
import React, {useState} from "react";

function Example2() {
    const initCount = 0;
    const [count, setCount] = useState(initCount);

    return (
        <div>
            {count}
            <button onClick={() => {
                setCount(initCount)
            }}>init
            </button>
            <button onClick={() => {
                setCount(count + 1)
            }}>+1
            </button>
            <button onClick={() => {
                setCount(count - 1)
            }}>-1
            </button>
        </div>
    )
}

export default Example2;

```

1. 通过额外定义一个变量`initCount=0`, 作为count的默认值
2. 任何时候想恢复默认值, 直接将`initCount`赋值给`count`

### 解决数据异步

还是基于上面那个示例, 假设现在新增个按钮, 点击该按钮后执行以下代码:

```jsx
for (let i = 0; i < 3; i++) {
    setCount(count + 1);
}
```

通过for循环, 执行了3次`setCount(count+1)`, `count`事实上不会加3

无论for循环执行几次, 最终实际结果都将是**仅仅执行一次 +1**

`setCount` 的赋值过程是异步的

虽然执行了3次`setCount(count+1)`, 可是每一次修改后的count并不是立即生效的; 当第2次和第3次执行时获取到count的值和第1次获取到的count值是一样的, 所以最终其实相当于仅执行了1次

#### 解决办法

笨方法:

```jsx
let num = count;
for (let i = 0; i < 3; i++) {
    num += 1;
}
setCount(num);
```

和类组件中解决异步的办法类似, 就是不直接赋值, 而是采取 **箭头函数返回值的形式** 赋值

```jsx
for (let i = 0; i < 3; i++) {
    setCount(prevData => {
        return prevData + 1
    });
    //可以简化为 setCount(prevData => prevData+1);
}
```

1. `prevData`为我们定义的一个形参, 指当前count的值
2. `{return prevData+1}` 中, 将 `prevData+1`, 并将运算结果return出去
3. 最终将`prevData`赋值给`count`

### 数据类型为Object的修改方法

前的示例中, 每个`useState`对应的值都是简单的`string`或`number`, 如果对应的值是`object`, 又该如何处理?

```jsx
const [person, setPerson] = useState({name: 'puxiao', age: 34});
```

若想将age的值修改为18, 该怎么写?

在类组件中:

```jsx
setPerson({age: 18});
```

在类组件中, `setState`是执行的是**异步对比累加赋值**, 就是先对比之前数据属性中是否有age, 如果有则修改age值, 同时不会影响到其他属性的值

但是, 用`useState`定义的修改函数 setXxxx, 例如setPerson中，执行的是 **异步直接赋值**

```jsx
console.log(person);//{name:'puxiao',age:34}
setPerson({age: 18});
console.log(person);//{age:18}
```

#### 正确的做法

我们需要先将person拷贝一份, 修改之后再进行赋值

```jsx
let newData = {...person};
newData.age = 18;
setPerson(newData);
```

以上代码还有一种简写形式:

```jsx
setPerson({...person, age: 18}); //这种简写是解构赋值带来的，并不是React提供的
```

### 数据类型为Array的修改方法

和数据类型为Object相似, 都是需要通过先拷贝一次, 修改后再整体赋值

这里举一个简单的小例子, 以下代码实现了一个类似学习计划列表的功能组件