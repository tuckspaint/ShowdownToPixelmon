
window.onload = makeMaps;

const dex = new Map();
const natures = new Map();
const showdownLines = [
    "Name",
    "Ability",
    "Level",
    "Tera",
    "EVs",
    "Nature",
    "IVs",
    "Move",
    "Move",
    "Move",
    "Move",
    "Empty"
]
const genderless = [
    "Voltorb",
    "Staryu",
    "Porygon",
    "Baltoy",
    "Beldum",
    "Bronzor",
    "Klink",
    "Sinistea",
    "Tandemaus",
    "Magnemite",
]

const regex = /\(((?<!\)).)*\)$/g

function makeMaps() {
    fetch("https://raw.githubusercontent.com/tuckspaint/ShowdownToPixelmon/main/ndex.txt")
    .then((res) => res.text())
    .then((text) => {
        text = text.split("\n");
        for (let i = 1; i <= text.length; i++) {
            dex.set(text[i-1], i);
        }
    })

    fetch("https://raw.githubusercontent.com/tuckspaint/ShowdownToPixelmon/main/natures.txt")
    .then((res) => res.text())
    .then((text) => {
        text = text.split("\n");
        for (let i = 0; i < text.length; i++) {
            natures.set(text[i], i);
        }
    })
}

function generateCommands() {
    let lineNum=0;
    let commands = "";
    let nameIdx, nickname, nameAndVar, name, tempLn, gender, ndex, nature, ability, heldItem, variant, move, EVHP, EVAttack, EVDefense, EVSpecialAttack, EVSpecialDefense, EVSpeed, IVHP, IVAttack, IVDefense, IVSpAtt, IVSpDef, IVSpeed;
    let showdown = document.getElementById("showdown").value.split("\n");


    for (let realLineNum = 0; realLineNum < showdown.length; realLineNum++) {  
        line = showdown[realLineNum]
        console.log(showdownLines[lineNum % 12], line)
        switch(showdownLines[lineNum % 12]) {
            case "Name":
                if (line === "") continue;
                variant = ""
                nickname = ""
                commands += "setblock -381 6 -80 pixelmon:poke_gift[facing=west]{chestOneTime: 1b, Owner: [I; 0, 0, 0, 0], dropOneTime: 1b, ";
                commands += "pixelmon: {CaughtBall: \"premier_ball\", palette: \"none\", Growth: 7b, originalTrainer:\"Little Cup Competition\", Level: 5, Health: 0, DoesLevel: 0b, Friendship: 255s, ";
                gender = Math.floor(Math.random() * 2);
                tempLn = line.split(" @ ");
                nameAndVar = null

                if (tempLn[0].includes("(M)")) {
                    gender = 0;
                    tempLn[0] = tempLn[0].replace("(M)","");
                }
                if (tempLn[0].includes("(F)")) {
                    gender = 1;
                    tempLn[0] = tempLn[0].replace("(F)","");
                }
                tempLn[0] = tempLn[0].trim();
                
                nameIdx = tempLn[0].search(regex);

                if (nameIdx !== -1) {
                    nameAndVar = tempLn[0].substring(nameIdx).replace("(","").replace(")","")
                    nickname = tempLn[0].substring(0,nameIdx)
                }
                console.log(nameAndVar)
                nameAndVar = nameAndVar ? nameAndVar.split("-") : tempLn[0].split("-");
                name = nameAndVar[0].replace(/é/g,"e");
                ndex = dex.get(name);
                if (tempLn[1]) {heldItem = tempLn[1].trim().replace(/\s/g, "_").replace(/-/g, "_").toLowerCase();}
                

                

                if (heldItem) {
                    commands += "HeldItemStack: {id: \"pixelmon:"+heldItem+"\", Count: 1b}, "
                }

                if (genderless.includes(name)) {
                    gender = 2;
                }

                switch(nameAndVar[1]) {
                    case "Alola":
                        variant="alolan"
                        break;
                    case "Galar":
                        variant="galarian"
                        break;
                    case "Hisui":
                        variant="hisuian"
                        break;
                    case "Paldea":
                        variant="paldean"
                        break;
                }

                if (variant) {
                    commands += "Variant: \""+variant+"\", "
                }

                if (nickname) {
                    commands += "Nickname: \""+nickname+"\", "
                }

                commands += "ndex: "+ndex+", Gender: "+gender+"b, ";
                break;
            case "Ability":
                ability = line.split("Ability: ")[1].trim();
                commands += "Ability: \""+ability+"\", ";
                break;
            case "Level":
                break;
            case "Tera":
                break;
            case "EVs":
                EVHP=EVAttack=EVDefense=EVSpecialAttack=EVSpecialDefense=EVSpeed=0;
                tempLn = line.replace(/\s/g,"").replace("EVs:","")
                tempLn = tempLn.split("/")
                for (let i = 0; i < tempLn.length; i++) {
                    if (tempLn[i].includes("HP")) {EVHP = Number(tempLn[i].split("HP")[0]);}
                    if (tempLn[i].includes("Atk")) {EVAttack = Number(tempLn[i].split("Atk")[0]);}
                    if (tempLn[i].includes("Def")) {EVDefense = Number(tempLn[i].split("Def")[0]);}
                    if (tempLn[i].includes("SpA")) {EVSpecialAttack = Number(tempLn[i].split("SpA")[0]);}
                    if (tempLn[i].includes("SpD")) {EVSpecialDefense = Number(tempLn[i].split("SpD")[0]);}
                    if (tempLn[i].includes("Spe")) {EVSpeed = Number(tempLn[i].split("Spe")[0]);}
                }
                commands += "EVHP: "+EVHP+"s, EVAttack: "+EVAttack+"s, EVDefense: "+EVDefense+"s, EVSpecialAttack: "+EVSpecialAttack+"s, EVSpecialDefense: "+EVSpecialDefense+"s, EVSpeed: "+EVSpeed+"s, ";
                break;
            case "Nature":
                if (!line.includes("Nature")) {
                    realLineNum--;
                    commands += "Nature: 2b, ";
                } else {
                    nature = natures.get(line.split(" ")[0])
                    commands += "Nature: "+nature+"b, ";
                }
                break;
            case "IVs":
                IVHP=IVAttack=IVDefense=IVSpAtt=IVSpDef=IVSpeed=31;
                if (line[0] !== "I") {
                    realLineNum--;
                } else {
                    tempLn = line.replace(/\s/g,"").replace("IVs:","")
                    tempLn = tempLn.split("/")
                    for (let i = 0; i < tempLn.length; i++) {
                        if (tempLn[i].includes("HP")) {IVHP = Number(tempLn[i].split("HP")[0]);}
                        if (tempLn[i].includes("Atk")) {IVAttack = Number(tempLn[i].split("Atk")[0]);}
                        if (tempLn[i].includes("Def")) {IVDefense = Number(tempLn[i].split("Def")[0]);}
                        if (tempLn[i].includes("SpA")) {IVSpAtt = Number(tempLn[i].split("SpA")[0]);}
                        if (tempLn[i].includes("SpD")) {IVSpDef = Number(tempLn[i].split("SpD")[0]);}
                        if (tempLn[i].includes("Spe")) {IVSpeed = Number(tempLn[i].split("Spe")[0]);}
                    }
                }
                commands += "IVHP: "+IVHP+"b, IVAttack: "+IVAttack+"b, IVDefense: "+IVDefense+"b, IVSpAtt: "+IVSpAtt+"b, IVSpDef: "+IVSpDef+"b, IVSpeed: "+IVSpeed+"b, ";
                commands += "Moveset: [";
                break;
            case "Move":
                if (lineNum % 12 !== 7) {
                    commands += ", "
                }
                move = line.trim()
                commands += "{MoveID: \""+move+"\", MovePP: 0b}";
                break;
            case "Empty":
                commands += "]}}<br/><br/><br/><br/>"
                break;
        }
        lineNum++;
    }

    document.getElementById("commands").innerHTML = commands;
}