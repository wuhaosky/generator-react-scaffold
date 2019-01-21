# generator-react-scaffold

## react技术栈脚手架
*   webpack-react           -- react 脚手架  
*   webpack-react-redux     -- react+redux 脚手架

## 使用脚手架生成项目
*   npm install -g yo
*   npm install -g generator-react-scaffold
*   cd /path/of/your/project  //切到你的项目目录
*   yo react-scaffold  //在你的项目目录下执行

## react 项目目录结构
```
├── LICENSE
├── README.md
├── devserver.js
├── dist
│   ├── static          -- webpack打包生成的静态文件，包括js/css等
│   └── xx.html
├── entries
│   └── xx.js           -- 入口js
├── f2eci.json
├── html
│   └── xx.html         -- 入口html
├── img
│   └── xx.jpg          -- 图片目录
├── less
│   ├── component
│   └── xx.less         -- 入口less
├── node_modules
├── package.json
├── react               -- react代码
│   ├── component       -- react模块
│   └── page            -- react页面
└── webpack.config.js   -- webpack配置文件
```

## react+redux 项目目录结构
```
├── LICENSE
├── README.md
├── devserver.js
├── dist
│   ├── static          -- webpack打包生成的静态文件，包括js/css等
│   └── xx.html
├── entries
│   └── xx.js           -- 入口js
├── f2eci.json
├── html
│   └── xx.html         -- 入口html
├── img
│   └── xx.jpg          -- 图片目录
├── less
│   ├── component
│   └── xx.less         -- 入口less
├── node_modules
├── package.json
├── react               -- react代码
│   ├── actions         -- redux action
│   ├── actiontype      -- redux actionType
│   ├── component       -- react模块
│   ├── page            -- react页面
│   └── reducers        -- redux reducer
└── webpack.config.js   -- webpack配置文件
```

## 本地开发
*   执行npm run start命令，会开启一个本地服务器，支持HMR。

## 构建
*   执行npm run build命令，会在dist/static目录下，生成webpack打包后的.js和.css文件。

