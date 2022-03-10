const express = require("express");
const hbs = require("hbs");
const app = express();
const expressHbs = require("express-handlebars");
app.set("view engine", "hbs");
// устанавливаем настройки движка для файлов layout (мастер-страниц) 
app.set("view options", { layout: "layouts/layout" }); 

hbs.registerPartials(__dirname + "/views/partials"); // частичные пред. 

hbs.registerHelper("getTime", function(){ 
    let mas=["Новость 1","Новость 2","Новость 3","Новость 4"]
    let news=mas[Math.round(Math.random()*4)]
    return `Новость дня: ${news}`; 
});

app.use("/home", function (request, response) {
    response.render("home.hbs", {
        title: "Главная страница"
    });
});
app.use("/info", function (request, response) {
    response.render("info.hbs", {
        title: "Информация о задании"
    });
});
app.use("/contact", function (request, response) {
    response.render("contact.hbs", {
        title: "Мои контакты",
        email: "user@mycorp.com",
        phone: "+1234567890"
    });
});

app.use("/*", function (request, response) {
    response.redirect("/home")
});

app.listen(3000);