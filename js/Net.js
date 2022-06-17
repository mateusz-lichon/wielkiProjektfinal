class Net {
    constructor() {
    }
    resetuj(){
        let dane = JSON.stringify({
            name: name
        })
        const options = {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: dane
        }
        fetch("/resetuj", options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }
    //fetch wysylajacy nick
    check(name) {
        let dane = JSON.stringify({
            name: name
        })
        const options = {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: dane
        }
        fetch("/check", options)
            .then(response => response.json())
            .then(data => this.checked(data))
            .catch(error => console.log(error))
    }
    //sprawdza dane z serwera
    checked(dane) {
        //doany uzytkownik
        if (dane.test == 'tak') {
            this.name = dane.name
            ui.zalogowano()
            // ui.kolor(dane.drugi)
            //zajety nick
        } else if (dane.test == 'nie') {
            alert("Nick jest zajęty")
            //za duzo uzytkowników
        } else {
            alert("Jest już dwóch użytkowników")
        }
        //jeśli drugi - zmienia pov
        if (dane.drugi == true) {
            game.pos = 0
            game.camera.position.set(game.pos, 200, -400)
            // 0, 200, 400
            game.camera.lookAt(game.scene.position);
        }
        if (dane.wait == true) {
            ui.oczekiwanie()
        }
    }
    //sprawdza czy jest drugi user
    secondUser = async () => {

        const data = JSON.stringify({})

        const options = {
            method: "POST",
            body: data,
        };

        let response = await fetch("/secondUser", options)

        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json
    }
    sendPionki = () => {
        const data1 = JSON.stringify({
            "tablica": game.tabPlansza,

        })
        const options = {
            method: "POST",
            body: data1,
            headers: {
                'Content-Type': 'application/json'
            },
        }
        fetch("/sendPionki", options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
            console.log(data1)
    }
    //obsluga timera
    timeCheck = () => {
        const data1 = JSON.stringify({
            "wait": game.user
        })
        const options = {
            method: "POST",
            body: data1,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch("/timeCheck", options)
            .then(response => response.json())
            .then(data => this.move(data))
            .catch(error => console.log(error));
    }
    //ruch pionka drugiego
    move = (data) => {
        if(data.move == true){
            game.move(data.stareX, data.stareY, data.noweX, data.noweY, data.nowePosX, data.nowePosY)
            game.twojRuch = true
        }
    }
}