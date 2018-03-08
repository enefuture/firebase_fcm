var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function route(pathname, params) {
    console.log("About to route a request for " + pathname);
    if( "/sendToDevice" == pathname) {
        return sendToDevice(params);
    }
}

//向各个设备发送消息,传递一组注册令牌,在单个请求中，您最多可以向 1000 台设备发送消息。
//如果您提供的一组注册令牌数超过 1000 个，则系统将无法处理此请求并显示 messaging/invalid-recipient 错误。
function sendToDevice(params) {
    var registrationTokens = params.device_token;
    var notification = params.notification;
    var data = params.data;
    var options = params.options
    var payload = {
        notification: notification,
        data: data,
    };
    admin.messaging().sendToDevice(registrationTokens, payload, options)
        .then(function (response) {
            // See the MessagingDevicesResponse reference documentation for https://firebase.google.com/docs/cloud-messaging/admin/send-messages?authuser=0
            console.log("Successfully sent message:", response);
            return response;
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
            return "";
        });
}

//在发布/订阅模式下,向主题发送消息,
function sendToTopic(params) {
    var topic = params.topic;
    var notification = params.notification;
    var data = params.data;
    var options = params.options;
    var payload = {
        notification: notification,
        data: data,
    };
    admin.messaging().sendToTopic(topic, payload, options)
        .then(function (response) {
            // See the MessagingDevicesResponse reference documentation for https://firebase.google.com/docs/cloud-messaging/admin/send-messages?authuser=0
            console.log("Successfully sent message:", response);
            return response;
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
            return "";
        });
}

exports.route = route;