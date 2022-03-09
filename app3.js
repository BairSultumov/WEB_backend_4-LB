const express = require("express");
const hbs = require("hbs");
const app = express();
const expressHbs = require("express-handlebars");
// устанавливаем настройки движка для файлов layout (мастер-страниц) 
app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts", // каталог layout-а 
        defaultLayout: "layout", // имя layout-а по умолчанию 
        extname: "hbs" // расширение файлов представлений 
    }
))
//ЗАДАНИЕ 4 {ХЕЛПЕР HBS}
hbs.registerHelper("getTime", function(){ 
    var time = new Date().toLocaleTimeString(); 
    console.log(time)
    return `Текущее время: ${time}`; 
});

//остальная часть – как в предыдущем примере 
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials"); // частичные пред. 

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