// const electron = require('electron');
const { app } = require('electron');
const path = require('path');
// const fs = require('fs');
let { dialog } = require('electron').remote;
let child = require('child_process').execFile;

doneedconfirmgame = false;

let selectgamename;
let newgame;
let tempoapp;
let tempoappname;
let tempoappdisplayable;
let executablePath;

function inputtext() {return document.querySelector(".select-game-name > p > input")};
console.log("\\\\")



//cancel game selection
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        cancelselectgame()
        console.log("echap")
    }
});
//confirm game selction
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        applyselectgame()
        console.log("entrer")
    }
});


function selectgame() {
    // document.body.innerHTML += '<div class="select-game-name"><p id="appsource">app src: </p><p id="appname"> Nom a afficher<input type="text"></p>  <div><h2>OK</h2><h2>Annuler</h2></div></div>';
    selectgamename = document.querySelector(".select-game-name");
    console.log(tempoapp)
    tempoapp = dialog.showOpenDialogSync({ properties: ['openFile'] });
    if (tempoapp != undefined) {
        tempoapp = tempoapp[0]
        console.log("ok")
    } else {
        console.log("pas ok")
        return
    }
    selectgamename.style.display = "block"
    console.log(tempoapp)
    tempoappname = tempoapp.split("\\")[tempoapp.split("\\").length-1].split(".")[0];

    console.log(selectgamename)
    document.querySelector(".select-game-name > #appsource").innerHTML= "app source: " + tempoapp;
    document.querySelector(".select-game-name > #appname > input").placeholder = tempoappname

    doneedconfirmgame = true;
    document.querySelectorAll(".select-game-name > div > h2")[0].addEventListener("click", applyselectgame)
    document.querySelectorAll(".select-game-name > div > h2")[1].addEventListener("click", cancelselectgame)

    }

function applyselectgame() {
    if (doneedconfirmgame) {
        console.log(inputtext().value)
        if (inputtext().value != "") {
            tempoappname = inputtext().value
            console.log("ok")
        }
        tempoappdisplayable = tempoapp
        for (i = 0; i < tempoapp.length; i++) {
            tempoappdisplayable = tempoappdisplayable.replace("\\", "|")
        }
        console.log(tempoappdisplayable)
        selectgamename.style.display = "none"
        newgame = document.querySelector("#unset-game")
        newgame.innerHTML = '<div class="game-image"> <img src="' + '" alt=""> </div><h2>' + tempoappname + '</h2><button class="bottom-selector" onclick="lauchgame(`'+ tempoappdisplayable + '`)">jouer</button>'
        newgame.id = "set-game"
        document.body.innerHTML += '<div class="game" id="unset-game"><div class="game-image"><img src="" alt=""></div><button class="bottom-selector" onclick="selectgame()"><i class="fas fa-plus-circle"></i> Ajouter un jeux</button></div>'
    
        doneedconfirmgame = false;

    }
}
function cancelselectgame() {
    if (doneedconfirmgame) {
        selectgamename.style.display = "none"
        doneedconfirmgame = false;
    }
    
}

function lauchgame(executablePath) {
    for (i = 0; i < executablePath.length; i++) {
        executablePath = executablePath.replace("|", '\\')
    }
    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
    });
}
