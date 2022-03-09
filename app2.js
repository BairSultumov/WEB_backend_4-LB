const express = require("express");
const res = require("express/lib/response");
const { maxHeaderSize } = require("http");
const app = express();

function color() {
    let r = Math.round(Math.random() * 255)
    let g = Math.round(Math.random() * 255)
    let b = Math.round(Math.random() * 255)
    return `rgb(${r},${g},${b})`
}

app.get(function (request, response, next) {
    let d = new Date().toLocaleTimeString
    console.log(`${d} : ${request.url}`)
    next();
});

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/app2/index.html")
});

app.get("/data", function (request, response) {
    let str = ""
    for (let i = 0; i < 10; i++)
        str += `<p>Добро пожаловать пользователь</p>`
    response.send(str)
});

app.get("/dataAdmin", function (request, response) {
    let str = ""
    for (let i = 0; i < 10; i++)
        str += `<p style:"color:red">Вы перешли на сайт администратора</p>`
    response.send(str)
});

app.get("*", function (request, response, next) {
    let size = Math.round(Math.random() * 15) + 5
    response.send(`<h1 style="font-size:${size}">Страница не найдена</h1>`)
});
app.listen(3000);
