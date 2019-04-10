# 2019-04-05
# First Commit

# ES6 

## 1. 模板字符串
### 1.1 startsWith，endsWith , includes 是否以某个字符串开头/结尾/包含某个字符串

    console.log('number'.startsWith("num")) // true
    console.log('number'.endsWith("er")) // true
    console.log('number'.includes("mb")) // true

### 1.2 repeat， 重复几次

    console.log('love'.repeat(3)) // lovelovelove
### 1.3 padStart(maxLength, fillString), padEnd(maxLength, fillString), 如果fillString为空，则用空格补齐

    console.log('aaa'.padStart(6,'k')) // kkkaaa
    console.log('aaa'.padEnd(6,'k')) // aaakkk
    console.log('aaa'.padStart(6,'koaExpress')) // koaaaa
    console.log('aaa'.padEnd(6,'koaExpress')) // aaakoa


# webpack
## npm i webpack webpack-cli -D
## npx 可以直接运行node_modules/.bin 目录下的命令
## loader 所有非js文件， 都要用loader 去处理

## css loader 的使用
    1. 在入口文件加载css代码， require('./index.css)
    2. html模板需要 npm i html-webpack-plugin -D