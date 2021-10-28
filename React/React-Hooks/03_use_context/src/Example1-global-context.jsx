import React from "react";

const Example1GlobalContext = React.createContext(); // 这里还可以给React.createContext()传入一个默认值

//例如: const Example1GlobalContext = React.createContext({name:'Yang',age:18})
//假如 <Example1GlobalContext.Provider>中没有设置value的值, 就会使用上面定义的默认值

export default Example1GlobalContext;