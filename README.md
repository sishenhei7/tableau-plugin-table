# tableau-plugin-table

tableau 插件，使用 vue 编写的，主要目的是实现 sentence 内容中的 keywords 高亮，方便公司 nlp 相关的展示工作。

## Develop

```
npm install
npm start
npm run build
```

## How to use

1. ```npm run build```，插件会被打包到 ym-tableau-table 文件夹
2. 把 ym-tableau-table 文件夹的静态文件放到任意服务器上
3. 修改 ```ym-data-table.trex``` 文件中的```source-location```路径

## How to use locally

1. ```npm run start```
2. 导入主目录下面的 ```ym-data-table.trex``` 文件

## How to debug in tableau

[Debug Extensions in Tableau Desktop](https://tableau.github.io/extensions-api/docs/trex_debugging.html)

```bash
## open /Applications/Tableau\ Desktop\ <version>.app --args --remote-debugging-port=8696
open /Applications/Tableau\ Desktop\ 2020.1.app --args --remote-debugging-port=8696
```

## ToDo

1. 增加 config 弹窗进行自定义配置
2. 调整样式
