(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{403:function(a,s,t){a.exports=t.p+"assets/img/connect.6180b20c.png"},608:function(a,s,t){"use strict";t.r(s);var r=t(14),n=Object(r.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"mongodb"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mongodb"}},[a._v("#")]),a._v(" mongodb")]),a._v(" "),s("p",[a._v("MongoDB是一个基于分布式文件存储的数据库。由C++语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。")]),a._v(" "),s("h2",{attrs:{id:"安装教程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装教程"}},[a._v("#")]),a._v(" 安装教程")]),a._v(" "),s("p",[a._v("以下是在 cenos7 开发机上安装的过程，具体参考"),s("a",{attrs:{href:"https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-red-hat/",target:"_blank",rel:"noopener noreferrer"}},[a._v("官网"),s("OutboundLink")],1)]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" /etc/yum.repos.d/mongodb-org-4.4.repo\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 添加如下配置")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("mongodb-org-4.4"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("MongoDB Repository\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("baseurl")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("https://repo.mongodb.org/yum/redhat/"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$releasever")]),a._v("/mongodb-org/4.4/x86_64/\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("gpgcheck")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("enabled")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("gpgkey")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("https://www.mongodb.org/static/pgp/server-4.4.asc\n")])])]),s("p",[a._v("安装")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" yum "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-y")]),a._v(" mongodb-org\n")])])]),s("p",[a._v("验证安装结果")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rpm")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-qa")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" mongodb\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rpm")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-ql")]),a._v(" mongodb-org-server\n")])])]),s("p",[a._v("锁定版本，避免 yum 更新")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vi")]),a._v(" /etc/yum.conf\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 添加如下内容")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("exclude")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("mongodb-org,mongodb-org-server,mongodb-org-shell,mongodb-org-mongos,mongodb-org-tools\n")])])]),s("p",[a._v("启动")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl start mongod\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 默认端口 27017，查看是否启动")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("netstat")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-natp")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("27017")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看数据库的进程是否存在")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-aux")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" mongod    \n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 验证服务开启")]),a._v("\nmongo\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 设置开机自动启动")]),a._v("\nsystemctl "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("enable")]),a._v(" mongod\n")])])]),s("p",[a._v("修改配置")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vi")]),a._v(" /etc/mongod.conf\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("################################################################")]),a._v("\nnet:\n  port: "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("8811")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 默认为27021端口")]),a._v("\n  bindIp: "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.0")]),a._v(".0.0 "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 127.0.0.1 只允许本地连接")]),a._v("\n  \n  \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 默认情况下 mongodb 的数据和日志存储位置是 /var/log/mongodb/mongod.log 和 /var/lib/mongo")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 首先在/home/work/mongodb目录下执行：mkdir -p var/log var/database")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 然后修改以下配置")]),a._v("\n\nsystemLog:\n  destination: "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("file")]),a._v("\n  logAppend: "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v("\n  path: /home/work/mongodb/var/log/mongodb/mongod.log "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 修改这里")]),a._v("\n\nstorage:\n  dbPath: /home/work/mongodb/var/lib/mongo "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 修改这里")]),a._v("\n  \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("###############################################################")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 重启服务")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" mongod restart\n")])])]),s("p",[a._v("用户配置")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 进入命令行")]),a._v("\nmongo\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# admin数据库")]),a._v("\nuse admin\ndb.createUser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("user:"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"admin"')]),a._v(",pwd:"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"***"')]),a._v(",roles:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("role:"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"root"')]),a._v(",db:"),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"admin"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("p",[a._v("重新开启带认证的服务")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看之前未认证的时候开启的服务pid")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-ef")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" mongo\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 杀死pid对应服务")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("kill")]),a._v(" pid\n\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" /usr/bin/\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# fork参数是服务在后台运行，auth是访问需要验证：")]),a._v("\n./mongod "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--bind_ip")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.0")]),a._v(".0.0 "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--port")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("8811")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--dbpath")]),a._v(" /home/work/mongodb/var/database "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--logpath")]),a._v(" /home/work/mongodb/var/log/mongo.log "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--fork")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--auth")]),a._v("\n")])])]),s("h2",{attrs:{id:"数据备份与恢复"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据备份与恢复"}},[a._v("#")]),a._v(" 数据备份与恢复")]),a._v(" "),s("p",[s("strong",[a._v("数据备份到本地")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("mongodump "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-h")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("ip"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(":"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("port"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("dbname"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-o")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("path"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),s("ul",[s("li",[a._v("-h：host")]),a._v(" "),s("li",[a._v("-d：db")]),a._v(" "),s("li",[a._v("-o：output")])]),a._v(" "),s("p",[s("strong",[a._v("本地数据恢复到数据库")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("mongorestore "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-h")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("ip"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(":"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("port"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-u")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("user"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-p")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("password"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("dbname"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("path"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),s("h2",{attrs:{id:"数据库连接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据库连接"}},[a._v("#")]),a._v(" 数据库连接")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 连接本地")]),a._v("\nmongo mongodb://localhost:8811\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 连接开发机")]),a._v("\nmongo mongodb://"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("user"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(":"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("password"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("@"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("ip"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(":"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("port"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),s("h2",{attrs:{id:"mongodb-compass"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mongodb-compass"}},[a._v("#")]),a._v(" mongodb compass")]),a._v(" "),s("p",[a._v("mongodb compass 是一款可视化工具，直接在"),s("a",{attrs:{href:"https://www.mongodb.com/zh-cn/products/compass",target:"_blank",rel:"noopener noreferrer"}},[a._v("官网"),s("OutboundLink")],1),a._v("安装即可，以下是连接时所填的字段。")]),a._v(" "),s("ul",[s("li",[a._v("Hostname：开发机的公网IP")]),a._v(" "),s("li",[a._v("port：端口号")]),a._v(" "),s("li",[a._v("Username/password：用户配置时添加的用户名和密码")]),a._v(" "),s("li",[a._v("Authentication Database：数据库默认为 admin")])]),a._v(" "),s("p",[s("img",{attrs:{src:t(403),alt:"connect"}})])])}),[],!1,null,null,null);s.default=n.exports}}]);