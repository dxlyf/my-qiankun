https://github.com/module-federation/module-federation-examples


name: 应用的名称。在其他应用查找的时候，会在这个name的作用域下去查找对应的组件。
remotes： 一个映射管理，将其他远程的名称映射成本地的别名。例如上面的我们将其他远程项目app_2映射成了本地的app_two。
filename： 这些对外暴露的模块存放在哪个文件中。
exposes： 对外暴露的模块。只有对外暴露的相应的模块功能才能被使用。
shared： 制定了这个参数，可以让远程加载的模块对应依赖改为使用本地项目的 React 或 ReactDOM。

