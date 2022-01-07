# 开发机常用

## 一些 linux 命令

查找被占用的端口：netstat -lnp|grep 80

查看端口对应的pid：lsof -i:8080

kill 进程：kill -9 xxxx

查看软链：ls -al node_modules/@baidu

本目录下内存占用：du -sh *

整体磁盘占用：df -h

查看整体磁盘使用：df -h 

复制a文件内容到b：cp -p a b

移动文件：mv /usr/local/a /usr/

软链：sudo ln -s

安装 git：yum install git

安装 node：官网下载 wget url --no-check-certificate

## 扩大内存

开发机上运行项目时可能会卡顿，由于8G内存在使用过程中可能会遇到内存不足的情况，最好一同配置一下swap交换内存。

free -m：查看内存

```bash
mkdir -p /opt/swap/ 
touch /opt/swap/swap_file 
chmod 600 /opt/swap/swap_file 
dd if=/dev/zero of=/opt/swap/swap_file bs=1024 count=8000000 
/sbin/mkswap /opt/swap/swap_file 
/sbin/swapon /opt/swap/swap_file
```

## work权限

```
chown -R work:work /home/work/
```

## cenos镜像源

https://vault.centos.org/6.10/os/x86_64/Packages/

## 安装全局包

安装之后记住执行命令使其全局生效，例如安装npx：

```bash
sudo ln -s /home/work/node-v12.13.0-linux-x64/bin/npx /usr/bin/npx
```

## 切换 node 版本

n 默认安装路径是 `/usr/local`，若你的 node 不是在此路径下，n 切换版本就不能把bin、lib、include、share 复制该路径中，所以我们必须通过N_PREFIX变量来修改 n 的默认node安装路径。

```bash
vim ~/.bash_profile

# 将下面两行代码插入到文件末尾：
export N_PREFIX=/usr/local # node实际安装位置
export PATH=$N_PREFIX/bin:$PATH

# :wq保存退出
# 执行 source ~/.bash_profile 使修改生效
```

## 命令行代理

配置代理：git config --global http.proxy url

用完重置：git config --global --unset http.proxy



