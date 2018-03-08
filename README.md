# Firebase_fcm
Google 云消息推送 node的简单服务封装,github地址：https://github.com/enefuture/firebase_fcm
#环境要求
服务器必须运行 Node.js 4.0+。
#将 Firebase 添加至您的应用
要使用 Firebase Admin SDK，您需要一个 Firebase 项目、一个与 Firebase 服务通信的服务帐号，以及一个含有您的服务帐号凭据的配置文件。
1.  转到您项目的设置页面中的[**服务帐号**](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)标签。
2.  选择您的 Firebase 项目。如果还没有 Firebase 项目，请点击**新建项目**。如果您已有一个与您的应用相关联的现有 Google 项目，则可点击**导入 Google 项目**。
3.  点击位于**服务帐号**标签中 **Firebase Admin SDK** 部分底部的**生成新的私钥**按钮。

点击该按钮后，系统会下载一个包含您的服务帐号凭据的 JSON 文件。您在下一步初始化 SDK 时需要用到此文件。
![导入项目私钥](http://upload-images.jianshu.io/upload_images/9953645-f169efaebe770f4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 配置安装
你的app需要接入firebase服务，官网：https://firebase.google.com, 并将Firebase Admin SDK添加到项目依赖中，执行：
```
npm install firebase-admin --save 或者 npm install
```
# 启动服务
```
node index.js
```
启动服务会开启8888端口监听请求，目前实现了基于用户令牌的消息推送，postman请求格式如下：
```
curl --request POST \
  --url http://localhost:8888/sendToDevice \
  --header 'Content-Type: application/json' \
  --data '{
	"device_token":"eQQSu7Oy-7Y:APA91bG9lFWKOW6u1fIv1AkD51dUZeyVM6KDlVx2L-hODSo3tMHdpL3PkHllbulqpnvy3JqLUQHbwC0iipFJP2g_83rHsvqNM7qvgyBxALy54QNGN_piKAUt6KGp3zQwKsKKiJPmHBhp",
	"data": {
    	"score": "850",
    	"time": "2:45"
	},
	"notification": {
      "body" : "great match!",
      "title" : "Portugal vs. Denmark",
      "icon" : "myicon"
    },
    "options" :{
    	"priority" : "normal"
    }
}'
```

