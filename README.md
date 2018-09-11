### 静态资源服务器
* .gitignore  处理上传到Git的文件规则

> 匹配模式前**/**代表项目根目录

> 匹配模式后**/**代表目录

> **!**标示取反

> * 代表任意字符

> ? 匹配任意一个字符

> ** 匹配多级目录

### 使用supervisor 来监听node，不需要一直启动
```
npm i -g supervisor
supervisor app.js
```

### handlebars 模版

### 安装
```
npm i -g anydoor
```

#### 使用方法

```
anydoor # 当前目录

anydoor -p 8080 # 设置端口号

anydoor -j localhost #设置host 为本地

anydoor -d /usr # 设置根目录为/ usr
```

#### 语义化版本号
x.y.z
> z 程序bug

> y 新增的功能

> x 大版本升级，不保证兼容


### 发布npm的步骤

* 注册账号
* npm login 命令。输入
* npm publish 发布

* 最后可以安装测试是否完成

#### 注意的是并没有把视频的所有功能完成，只是完成的大部分，没有实现anydoor命令启动