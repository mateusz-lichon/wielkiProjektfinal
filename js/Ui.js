class Ui {
    constructor() {
        this.reset = document.getElementById("reset")
        this.login = document.getElementById("loguj")
        this.main()
    }
    //dodaje onclick do przycisków w main
    main = () => {
        this.reset.onclick = () => this.resetuj()
        this.login.onclick = () => this.loguj()
    }
    //reset nicku
    resetuj() {
        document.getElementById("name").value = ""
        net.resetuj()
    }
    //logowanie -> do funkcji robiącej fetch
    loguj() {
        let name = document.getElementById("name").value
        net.check(name)
    }
    //zmienia się treść statusu i znika formularz
    zalogowano = () => {
        document.getElementById("login").style.display = "none"
        document.getElementById("status").innerHTML = "Witaj " + net.name
    }
    oczekiwanie = () => {
        document.getElementById("wait").style.display = "block"
        var i = 0
        let f = async () => {
            //to zmień żeby wyglądało inaczej
            if (i == 0) {
                document.getElementById("wait").innerHTML = "Waiting."
            } if (i == 1) {
                document.getElementById("wait").innerHTML = "Waiting.."
            } if (i == 2) {
                document.getElementById("wait").innerHTML = "Waiting..."
                i = -1
            }
            i++
            let json = await net.secondUser()
            try {
                if (json.secondUser == true) {
                    clearInterval(w)
                    document.getElementById("wait").style.display = "none"
                    document.getElementById("status").innerHTML += "<br> Przeciwnik gra niebieskimi"
                    game.startGry()
                }
            } catch { }
        }
        let w = setInterval(f, 400)
    }
    kolor = (drugi) => {
        if (drugi == false) {
            game.user = "zolte"
            document.getElementById("status").innerHTML += ", grasz żółtymi"
            game.twojRuch = true
        } else {
            game.user = "czerwone"
            document.getElementById("status").innerHTML += ", grasz niebisekimi"
            game.twojRuch = false
            game.startGry()
            document.getElementById("time").style.display = "block"
            var t = 30
            game.timer(t)
        }
    }
    genTab = () => {
        if (game.user = "zolte"){
            let tab = document.getElementById("tab")
            tab.innerHTML = ""
            for (let a = 0; a < game.pionki.length; a++){
                let el = game.pionki[a]
                for (let b = 0; b < el.length; b++){
                    tab.innerHTML += el[b] + "  "
                }
                tab.innerHTML += "<br>"
            }
        }
    }
}