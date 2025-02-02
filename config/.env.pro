###
 # @Author: xiang cao caoxiang@sutpc.com
 # @Date: 2023-04-11 09:55:35
 # @LastEditors: niyayong@sutpc.com
 # @LastEditTime: 2024-09-24 21:57:42
 # @FilePath: /epcsp-dp-web/config/.env.pro
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 
NODE_ENV = production

# 接口前缀
VITE_API_BASEPATH=/web/ecpsp/damengdp/api/
#服务地址
VITE_BASE_URL=http://sit-tpaas.sutpc.com:8080 #测试环境

#中台登录模式
VITE_LOGIN_MODE=SUTPC-LOGIN
# 打包路径
VITE_BASE_PATH = /
# 是否跳转到登录页面
VITE_REDIRECT_LOGIN = 0

# 飞渡地图服务地址
# VITE_FD_URL=10.10.50.136:3480 #开发环境  //斜对面电脑
# VITE_FD_URL=location.hostname:3480 #开发环境  //斜对面电脑
# 飞渡文件磁盘地址
VITE_FD_FileURL=D:/FreeDo/Cloud/SDK/data/3dt # 开发环境  //斜对面电脑
# VITE_FD_FileURL= D:/freeDo/AirCityCloud/SDK/data/3dt // 演示笔记本
# VITE_FD_PID=2
# 应用名称，用于网页头部等
VITE_APP_TITLE = 电力充储放一张网

# 头部是否使用包含英文的头部，设置为1表示使用包含英文的头部，0为不包含英文的头部
VITE_HEADER_EN = 1