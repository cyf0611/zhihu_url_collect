const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json());


let connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '123456',
    database: 'zhihu',
    multipleStatements: true // 使用多条语句
});

connection.connect(err => {
    if (err) {
        console.log(`数据库连接失败${err}`);
        return;
    }
    console.log("数据库连接成功");
});




// connection.query(`insert into url values ?`, [{ url: 123 }, { url: 456 }], (err, result) => {
//     if (err) {
//         console.log(`err：${err}`);
//         return;
//     }
//     console.log(`result：${result}`);
// });

app.post('/saveUrl', (req, res) => {
    res.header("Access-Control-Allow-Origin", '*'); //request.getHeader("Origin")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-csrf-token, token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    let data = req.body["data[]"];
    data.forEach(v => {
        connection.query(`insert into url set url = '${v}'`, (err, result) => {
            if (err) {
                console.log(`err：${err}`);
                return;
            }
        });
    })

    res.json({code: 200});
})


const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log('服务开启成功，监听 %s 端口', port, moment().format('YYYY-MM-DD HH:mm:ss'));
});