#!/bin/bash 
basepath=$(cd `dirname $0`; pwd)
TCPListeningnum=`netstat -an | grep ":8888" | awk '$1 == "tcp6" && $NF == "LISTEN" {print $0}' | wc -l` 
if [ $TCPListeningnum -eq 0 ];then  
    echo "`date` : listener port is down" 
    #如果3389端口down了，重启namenode服务 
    nohup node /home/q/system/firebase_fcm/index.js > /data/wwwlogs/node_service_push_messages.log  2>&1 &
    exit
fi
echo "8888端口正常"