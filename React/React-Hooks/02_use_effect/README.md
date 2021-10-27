# useEffect

## 基础用法

### useEffect 概念解释

都能勾住哪些生命周期函数:

+ componentDidMount (组件被挂载完成后)
+ componentDidUpdate(组件重新渲染完成后)
+ componentWillUnmount(组件即将被卸载前)

因为修改数据我们可以使用前面学到的useState, 数据变更会触发组件重新渲染, 上面3个就是和组件渲染关联最紧密的生命周期函数

### useEffect是来解决类组件什么问题的

类组件 **某些执行代码被分散在不同的生命周期函数中** 的问题

#### Example1

若某类组件中有变量a, 默认值为`0`, 当组件第一次被挂载后或组件重新渲染后, 将网页标题显示为a的值

那么在类组件里, 我们需要写的代码是:

```jsx
//为了更加清楚看到每次渲染，我们在网页标题中 a 的后面再增加一个随机数字
componentDidMount()
{
    document.title = `${this.state.a} - ${Math.floor(Math.random() * 100)}`;
}
componentDidUpdate()
{
    document.title = `${this.state.a} - ${Math.floor(Math.random() * 100)}`;
}
```

从上面这种代码里你会看到, 为了保证第一次被挂载, 组件重新渲染后都执行修改网页标题的行为

相同的代码我们需要分别在`componentDidMount`, `componentDidUpdate`中写2次

#### Example2

假设需要给上面那个组件新增一个功能, 当组件第一次被挂载后执行一个自动累加器 `setInterval`, 每`1`秒 `a `的值`+1`

为了防止内存泄露, 我们在该组件即将被卸载前清除掉该累加器

```jsx
timer = null; //新增一个可内部访问的累加器变量(注: 类组件定义属性时前面无法使用 var/let/const)
componentDidMount()
{
    document.title = `${this.state.a} - ${Math.floor(Math.random() * 100)}`;
    this.timer = setInterval(() => {
        this.setState({a: this.state.a + 1})
    }, 1000);//添加累加器
}
componentDidUpdate()
{
    document.title = `${this.state.a} - ${Math.floor(Math.random() * 100)}`;
}
componentWillUnmount()
{
    clearInterval(this.timer);//清除累加器
}
```

#### Example3

假设给上面的组件再新增一个变量 `b`, 当 `b` 的值发生变化后也会引发组件重新渲染, 然后呢? 有什么隐患吗?

`b` 的值改变引发组件重新渲染, 然后肯定是会触发`componentDidUpdate`函数, 这时会让修改网页标题的代码再次执行一次, 尽管此时a的值并没有发生任何变化

1. Example1中, 相同的代码可能需要在不同生命周期函数中写2次
2. Example2中, 相关的代码可能需要在不同生命周期函数中定义
3. Example3中, 无论是哪个原因引发的组件重新渲染, 都会触发生命周期函数的执行, 造成一些不必要的代码执行

**useEffect就是来解决这些问题的**

### useEffect基本用法

`useEffect(effect,[deps])`函数可以传入2个参数

第1个参数为我们定义的执行函数

第2个参数是依赖关系(可选参数)

若一个函数组件中定义了多个`useEffect`, 那么他们实际执行顺序是按照在代码中定义的**先后顺序**来执行的

第1个值effect是一个function, 用来编写useEffect对应的执行代码; `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`,
当上述3个生命周期函数执行后, 就会触发`useEffect`函数, 进而执行而第1个参数 effect 中的内容

组件挂载后(componentDidMount)与组件重新渲染后(componentDidUpdate)对应的代码合并为一个函数这个容易理解

组件卸载前(componentWillUnmount) 通过在 `effect` 中 return 一个函数来实现的

```jsx
useEffect(() => {
    //此处编写 组件挂载之后和组件重新渲染之后执行的代码
...

    return () => {
        //此处编写 组件即将被卸载前执行的代码
    ...
    }
}, [deps])
```

1. effect 函数主体内容中的代码, 就是组件挂载之后和组件重新渲染之后你需要执行的代码
2. effect 函数 return 出去的返回函数主体内容中的代码, 就是组件即将被卸载前你需要执行的代码
3. 第2个参数` [deps]`, 为可选参数, 若有值则向React表明该useEffect是**依赖哪些变量发生改变而触发的**

> 若你不需要在组件卸载前执行任何代码, 那么可以忽略不写 effect 中的 return相关代码

#### `[deps]`补充说明:

1. 若缺省, 则组件挂载, 组件重新渲染, 组件即将被卸载前, **每一次**都会触发该`useEffect`
2. 若传值, 则**必须为数组**, 数组的内容是函数组件中通过`useState`自定义的变量或者是父组件传值过来的`props`中的变量, 告诉React只有数组内的变量发生变化时才会触发useEffect
3. 若传值, 但是传的是空数组 `[]`, 则表示该useEffect里的内容仅会在 **挂载完成后和组件即将被卸载前执行一次**

### 示例

若某类组件中有变量a, 默认值为0, 当组件第一次被挂载后或组件重新渲染后, 将网页标题显示为a的值

1. 为了让 a 的值可以发生变化, 我们在组件中添加一个按钮, 每次点击 a 的值 +1
2. 为了更加清楚看到每次渲染, 我们在网页标题中 `a` 的后面再增加一个随机数字\

## 高级用法

### 让useEffect只在挂载后和卸载前执行一次

实现 Example2 的功能

需求:

1. 若某类组件中有变量a, 默认值为0, 当组件第一次被挂载后或组件重新渲染后, 将网页标题显示为a的值
2. 当组件第一次被挂载后执行一个自动累加器 `setInterval`, 每1秒 a 的值+1, 为了防止内存泄露, 我们在该组件即将被卸载前清除掉该累加器

useEffect函数的第2个参数表示该依赖关系, 将useEffect的第2个参数, 设置为空数组 [], 即表示告诉React, 这个useEffect不依赖任何变量的更新所引发的组件重新渲染,
以后此组件再更新也不需要调用此useEffect

这样就可以实现只在第一次挂载后和卸载前调用此useEffect的目的

```jsx
import React, {useState, useEffect} from "react";

function Example2() {
    const [a, setA] = useState(0); // 定义变量a, 并且默认值为0

    // 定义第1个useEffect，专门用来处理自动累加器
    useEffect(() => {
        let timer = setInterval(() => {
            setA(a + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []); // 此处第2个参数为[], 告知React以后该组件任何更新引发的重新渲染都与此useEffect无关

    // 定义第2个useEffect, 专门用来处理网页标题更新
    useEffect(() => {
        document.title = `${a} - ${Math.floor(Math.random() * 100)}`;
    }, [a]);

    return (
        <div>
            {a}
        </div>
    )
}

export default Example2;
```

但其实这个代码是运行不了的; a 的值修改为了 1, 然后... a 的值一直为 1, 并没有继续累加

会受到一个警告:

```shell
React Hook useEffect has a missing dependency: 'a'. Either include it or remove the dependency array. You can also do a functional update 'setA(a => ...)' if you only need 'a' in the 'setA' call  react-hooks/exhaustive-deps
```

```jsx
let timer = setInterval(() => {
    setA(a + 1)
}, 1000);  
```

> 有时候，你的 effect 可能会使用一些频繁变化的值。你可能会忽略依赖列表中 state，但这通常会引起 Bug，传入空的依赖数组 []，意味着该 hook 只在组件挂载时运行一次，并非重新渲染时。但如此会有问题，在 setInterval 的回调中，count 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 count 的值被保存在该闭包当中，且初值为 0。每隔一秒，回调就会执行 setCount(0 + 1)，因此，count 永远不会超过 1

如果`useEffec`t函数第2个参数为空数组, 那么react会将该`useEffect`的第1个参数 effect **建立一个闭包**

该闭包里的变量 `a` 被**永远设定为当初的值**, 即 0; 尽管`setInterval`正常工作，每次都`正常执行了`, 可是 `setA(a+1)`中 `a` 的值一直没变化, 一直都是当初的`0`, 所以造成 `0 + 1`
一直都等于 1 的结果

如果修改成` setA(a => a+1) `的形式, 那么就解决了 `a` 数据异步的问题, 每次都是读取最新当前 `a` 的值

**要养成异步更新数据的习惯**

### 性能优化

若一个组件中有一个自定义变量`obj`, `obj`有两个属性`a`, `b`, 当`a`发生变化时, 网页标题也跟着`a`发生变化

1. 我们为了让a, b都可以发生变化, 将在组件中创建2个按钮, 点击之后分别可以修改a, b的值
2. 为了更加清楚看到每次渲染, 我们在网页标题中 a 的后面再增加一个随机数字

```jsx
import React, {useState, useEffect} from "react";

function Example3() {

    const [obj, setObj] = useState({a: 0, b: 0});

    useEffect(() => {
        document.title = `${obj.a} - ${Math.floor(Math.random() * 50)}`;
    });

    return (
        <div>
            {JSON.stringify(obj)}
            <button onClick={() => {
                setObj({...obj, a: obj.a + 1})
            }}>a+1
            </button>
            <button onClick={() => {
                setObj({...obj, b: obj.b + 1})
            }}>b+1
            </button>
        </div>
    )

}

export default Example3;
```

由于我们在网页标题中添加了随机数, 因此实际运行你会发现即使修改b的值, 也会引发网页标题重新变更一次

正确的做法应该是我们给useEffect添加上第2个参数: `[obj.a]`, 明确告诉React, 只有当`obj.a`变更引发的重新渲染才执行本条useEffect

```jsx
useEffect(() => {
    document.title = `${obj.a} - ${Math.floor(Math.random() * 50)}`;
}, [obj.a]); //第2个参数为数组，该数组中可以包含多个变量
```

添加过[obj.a]之后, 再次运行, 无论obj.b或者其他数据变量引发的组件重新渲染, 都不会执行该useEffect

因此达到提高性能的目的