const express = require('express')
const mysql = require("mysql")
const send = require('send')
const bodyParser = require('body-parser')
var query = require("./ADB/db.js");


const app = express()


app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})


process.on('uncaughtException', function (err) {}) //监听未捕获的异常

process.on('unhandledRejection', function (err, promise) {}) //监听Promise没有被捕获的失败函数


app.get("/", async (req, res) => {
    res.send('ok')
})

//获取所有数据接口
app.get("/getdata", async (req, res) => {
    let sql = "select * from person"
    query(sql, [req.query.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404)
            res.send()
            throw err
        } else {
            res.send(rows);
        }
    });
})


// 登录
app.get("/login", async (req, res) => {
    let sql = `select * from person where text="${req.query.user}" and password=${req.query.password}`
    query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404)
            res.send()
            throw err;
        } else {
            res.send(rows);
        }
    });
})


// 注册
app.get("/register", async (req, res) => {
    let sql = `insert into person(name,text,password,phone) values ('${req.query.name}','${req.query.user}','${req.query.password}',${req.query.phone})`
    //  let sql =`insert into person(name,text,password,phone) values ('溜溜','123456789','123123123123','12345678900')` 
    await query(sql, [req.query.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404)
            res.send()
            throw err;

        }
        res.send(rows)
    });
})


// 通过id查询数据
app.get("/id", async (req, res) => {
    // console.log(req.query.user);
    // console.log(req.query.password);
    let sql = `select * from person where id=${req.query.id}`;
    query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404)
            res.send()
            throw err;

        } else {
            res.send(rows);
        }
    });
})

//  添加新打的项目
app.get("/addobj", async (req, res) => {
    // console.log(req.query.user);
    // console.log(req.query);
    var speed = 0
    if (isNaN(req.query.sign) || isNaN(req.query.target)) {
        speed = "-";
    } else {
        speed = req.query.target <= 0 ? "0" : 100 - (Math.round(req.query.sign / req.query.target * 10000) / 100.00);
    }
    let sql = `insert into OBJ(name,user,type,post,target,sign,starttime,endtime,speed) values ('${req.query.name}','${req.query.user}','${req.query.type}',${req.query.post},${req.query.target},${req.query.sign},'${req.query.starttime}','${req.query.endtime}',${speed})`;
    query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404)
            res.send()
            throw err;

        } else {
            res.send(rows);
        }
    });
})

// 获取所有项目
app.get("/getobj", async (req, res) => {
    let sql = "select * from OBJ"
    query(sql, [req.query.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404)
            res.send()
            throw err
        } else {
            res.send(rows);
        }
    });
})

// 修改密码
app.get("/modifypassword", async (req, res) => {
    // console.log(req.query);
    let sql = `update person set password='${req.query.newpassword}' where id=${req.query.id} and password='${req.query.oldpassword}'`
    query(sql, [req.query.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404)
            res.send("密码错误！")
            throw err
        } else {
            res.send(rows);
        }
    });
})

// 修改手机号和年龄
app.get("/modifyuserdata", async (req, res) => {
    // console.log(req.query);
    let sql = `update person set phone='${req.query.phone}',age=${req.query.age} where id=${req.query.id} `
    query(sql, [req.query.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(404)
            res.send("密码错误！")
            throw err
        } else {
            res.send(rows);
        }
    });
})

app.listen(3001, () => {
    // console.log("http://localhost:3001");
})