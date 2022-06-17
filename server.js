var express = require("express")
var app = express()
const PORT = process.env.PORT || 3000;
app.use(express.static('js'));
app.use(express.json())
var path = require("path")
var serveIndex = require('serve-index')
var path = require('path');
app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/js/index.html")));

// app.get("/", function (req, res) {
//     console.log("ścieżka do katalogu głównego aplikacji: "+__dirname)
//     res.sendFile(path.join(__dirname + "/index.html"))
    
// })


let uzytkownicy = [{ name: "" }]

app.post("/resetuj", function (req, res) {
    uzytkownicy = [{ name: "" }]
})
app.post("/", function(req, res) {
    res.sendFile("/index.html")
}

)
app.post("/check", function (req, res) {
    dane = req.body
    if (uzytkownicy.length < 2) {
        //dodanie pierwszego uzytkownika
        if (uzytkownicy[0].name == "") {
            uzytkownicy[0].name = dane.name
            let obj = {
                "name": dane.name,
                "test": 'tak',
                "drugi": false,
                "wait": true
            }
            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(obj, null, 5));
            //dodanie drugiego
        } else if (uzytkownicy[0].name != dane.name) {
            let obj = {
                "name": dane.name,
                "test": 'tak',
                "drugi": true,
                "wait": false
            }
            uzytkownicy.push({ name: dane.name })
            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(obj, null, 5));
            //nie można dodać tego samego nicku
        } else {
            let obj = {
                "name": dane.name,
                "test": 'nie',
                "drugi": false,
                "wait": false
            }
            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(obj, null, 5));
        }
        //nie można dodać trzeciego
    } else {
        let obj = {
            "name": dane.name,
            "test": 'za duzo',
            "drugi": false
        }
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(obj, null, 5));
    }
})

app.post("/secondUser", function (req, res) {
    if (uzytkownicy.length == 2) {
        let obj1 = {
            "secondUser": true
        }
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(obj1, null, 5));
    } else {
        let obj2 = {
            "secondUser": false
        }
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(obj2, null, 5));
    }

})

var ruch = ""
var stareX = ""
var stareY = ""
var noweX = ""
var nowePosX = ""
var noweY = ""
var nowePosY = ""
var time = ""
var t1
app.post("/sendPionki", function (req, res) {
    stareX = req.body.stareX
    stareY = req.body.stareY
    noweX = req.body.noweX
    nowePosX = req.body.nowePosX
    noweY = req.body.noweY
    nowePosY = req.body.nowePosY
    ruch = req.body.ruch
    let obj2 = {
        "status": "sukces"

    }
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(obj2, null, 5));
})

app.post("/timeCheck", function (req, res) {
    var t2 = new Date()
    time = t2 - t1
    setTimeout(function () {
        if (ruch != req.body.wait && ruch != "") {//&& time > 1500) {
            obj = {
                move: true,
                stareX: stareX,
                stareY: stareY,
                noweX: noweX,
                nowePosX: nowePosX,
                noweY: noweY,
                nowePosY: nowePosY
            }
            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(obj, null, 5));
        } else {
            obj = {
                move: false
            }
            res.setHeader("Content-Type", "application/json")
            res.send(JSON.stringify(obj, null, 5));
        }

    }, 200)
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})