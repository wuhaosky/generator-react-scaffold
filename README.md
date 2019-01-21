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
├── ciconfig.json
├── devserver.js
├── dist
│   ├── static          -- webpack打包生成的静态文件，包括js/css等
│   └── xx.html
├── html
│   └── yourpagename.html  -- 入口html
├── package.json
├── src
│   └── yourpagename
│       ├── app.jsx
│       ├── assets     -- 资源目录
│       │   └── blademaster.jpg
│       ├── component  -- react模块
│       │   └── introduction.jsx
│       ├── index.js   -- 入口js
│       ├── index.less -- 入口less
│       └── less
│           └── introduction.less
└── webpack.config.js  -- webpack配置文件
```

## react+redux 项目目录结构
```
├── LICENSE
├── README.md
├── ciconfig.json
├── devserver.js
├── dist
│   ├── static          -- webpack打包生成的静态文件，包括js/css等
│   └── xx.html
├── html
│   └── yourpagename.html  -- 入口html
├── package.json
├── src
│   └── yourpagename   -- 页面
│       ├── actions    -- redux action
│       │   └── index.js
│       ├── actiontype -- redux actionType
│       │   └── index.js
│       ├── app.jsx
│       ├── assets     -- 资源目录
│       │   └── blademaster.jpg
│       ├── component  -- react模块
│       │   ├── inputwidget.jsx
│       │   └── introduction.jsx
│       ├── index.js   -- 页面入口js
│       ├── index.less -- 入口less
│       ├── less
│       │   └── introduction.less
│       └── reducers   -- redux reducer
│           └── index.js 
└── webpack.config.js  -- webpack配置文件
```

## 本地开发
*   执行npm run start命令，会开启一个本地服务器，支持HMR。

## 构建
*   执行npm run build命令，会在dist/static目录下，生成webpack打包后的.js和.css文件。

