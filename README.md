## 项目介绍

> 项目名称：基于Vue3&Ts开发的后台管理系统
>
> 开发人员：呆头鸭
>
> 更新日期：2022年5月7日
>
> 项目地址：[基于Vue3&Ts开发的后台管理系统)](https://gitee.com/Aa8880788/vue3-ts-shop/tree/master/)
>
> 有任何疑问请联系`qq`：283313959，并注明来意。
>
> **请勿商用**

##  功能介绍

>①后台不同权限管理员的账号登陆
>
>②不同权限管理员展示不同菜单列表(动态权限菜单)
>
>③数据可视化展示，利用了`Echarts`及`countup`对展示数据进行可视化处理
>
>④正常后台系统的增删改查功能

## 项目技术栈

>`Vue3.2`&&`VueX`&&`Vue-Router`&&`TypeScript`&&`Element Plus`&&`Echarts`&&`Axios`

## 项目特色

> ①菜单部分用的动态路由注册技术，展现效果为不同权限用户会展现不同的菜单
>
> ②全部代码采用均采用`TypeScript`代码进行类型限制，包括`Vuex`、`Axios`等
>
> ③`Form`表单部分与`Table`表格部分均对`Element Plus`进行了二次封装，通过传入配置项即可生成表单
>
> ④网络请求部分均用`Vuex`统一管理，公共部分放置根模块，单独部分放对应子模块
>
> ⑤每个页面的增删改查主要逻辑均抽成hook，增强组件复用性
>
> ⑥项目搭建使用`集成 editorconfig 配置`—` prettier 工具` —` ESLint 检测`—`git Husky 和 eslint`

注:

`editorconfig`(有助于为不同 `IDE` 编辑器上处理同一项目的多个开发人员维护一致的编码风格。)

`prettier `(代码格式化工具)

`ESLint `(代码规范检测工具)

`git Husky 和 eslint`(执行 `git commit `命令的时候对代码进行`eslint` 校验并修复)

## 项目部分演示

### 菜单管理页

![菜单管理页](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img//blog/Project/Vue3-ts-shop/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86%E9%A1%B5.gif)

### 角色管理页

![角色管理页](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img//blog/Project/Vue3-ts-shop/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E9%A1%B5.gif)

### 商品统计页

![商品统计页](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img//blog/Project/Vue3-ts-shop/%E5%95%86%E5%93%81%E7%BB%9F%E8%AE%A1%E9%A1%B5.gif)

### 登录页面

![登录与商品信息页 ](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101600810.gif)

## 项目所有页面

### 登录

![image-20220510160119711](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101601136.png)

### 核心技术

![image-20220510160232494](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101602602.png)

### 商品统计

![image-20220510160204143](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101602279.png)

### 用户管理

![image-20220510160302065](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101603366.png)

![image-20220510160335695](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101603808.png)

### 部门管理

![image-20220510160402832](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101604948.png)

![image-20220510160416618](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101604732.png)

### 菜单管理

![image-20220510160431918](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101604030.png)

![image-20220510160459786](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101604869.png)

![image-20220510160509426](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101605505.png)

![image-20220510160519813](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101605877.png)

![image-20220510160534982](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101605041.png)

### 角色管理

![image-20220510160552502](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101605610.png)

![image-20220510160607475](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101606603.png)

### 商品类别

![image-20220510160627994](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101606103.png)

### 商品信息

![image-20220510161146722](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101611846.png)

![image-20220510161232662](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101612776.png)

### 故事列表

![image-20220510161456213](https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/Project/Vue-myCinima/202205101614326.png)

