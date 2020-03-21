# tableau-plugin-table

tableau 插件，使用 vue 编写的，主要目的是实现 sentence 内容中的 keywords 高亮，方便公司 nlp 相关的展示工作。

## Develop

```
npm install
npm start
npm run build
```

## How to use

1. npm run build，插件会被打包到 ym-tableau-table 文件夹
2. 把 ym-tableau-table 文件夹的静态文件放到任意服务器上
3. 修改 ```ym-data-table.trex``` 文件中的```source-location```路径
