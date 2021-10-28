# useDebugValue

### useDebugValue概念解释

他的作用是**勾住**React开发调试工具中的自定义hook标签, 让useDebugValue勾住的自定义hook可以显示额外的信息

### useDebugValue基本用法

`useDebugValue(value,formatterFn)`函数第1个参数为我们要额外显示的内容变量, 第2个参数是可选的, 是对第1个参数值的数据化格式函数

1. useDebugValue应该在自定义hook中使用, 如果直接在组件内使用是无效的, 不会报错也不会有任何额外信息展示
2. 一般调试不需要使用useDebugValue, 除非你编写的hook是公共库中的一部分, 实在是想凸显额外信息, 引起别人注意
3. 如果使用useDebugValue, 最好设置第2个参数, 向react开发调试工具讲清楚如何格式化展示第1个参数

```jsx
useDebugValue(xxx, xxx => xxxxx)
```

1. xxx 为我们要重点关注的变量
2. xxx => xxxxx 是 `(xxx) => {return xxxxx}` 的简写; 表明如何格式化变量xxx

# 跟我没啥关系