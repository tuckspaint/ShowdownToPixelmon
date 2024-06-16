
window.onload = makeMaps;

const dex = new Map();
const natures = new Map();
const showdownLines = [
    "Name",
    "Ability",
    "Tera",
    "EVs",
    "Nature",
    "IVs",
    "Move1",
    "Move2",
    "Move3",
    "Move4",
    "Empty"
]

function makeMaps() {
    fetch("https://raw.githubusercontent.com/tuckspaint/ShowdownToPixelmon/main/ndex.txt")
    .then((res) => res.text())
    .then((text) => {
        text = text.split("\n");
        for (let i = 1; i <= text.length; i++) {
            dex.set(text[i-1], i);
        }
    })

    
}

function generateCommands() {
    let lineNum = 0;
    let commands = "";
    let name;
    let templLn, gender, ndex, nature, ability, heldItem, variant, move1, move2, move3, move4, EVHP, EVAttack, EVDefense, EVSpecialAttack, EVSpecialDefense, EVSpeed, IVHP, IVAttack, IVDefense, IVSpAtt, IVSpDef, IVSpeed;
    let showdown = document.getElementById("showdown").value.split("\n");


    for (const line of showdown) {  
        if (line === "" && showdownLines[lineNum % 11] !== "Empty") break ;

        switch(showdownLines[lineNum % 11]) {
            case "Name":
                commands += "setblock -381 6 -80 pixelmon:poke_gift[facing=west]{chestOneTime: 1b, Owner: [I; 0, 0, 0, 0], dropOneTime: 1b, ";
                commands += "pixelmon: {CaughtBall: \"premier_ball\", palette: \"none\", Growth: 7b, originalTrainer:\"Little Cup Competition\", Level: 5, Health: 0, DoesLevel: 0b, Friendship: 255s, ";

                templLn = line.split(" @ ");
                name = templLn[0].split("-")[0];
                ndex = dex.get(name);
                heldItem = templLn[1].trim().replace(" ", "_").replace("-", "_").toLowerCase();
                gender = Math.floor(Math.random() * 2);

                commands += "ndex: "+ndex+", HeldItemStack: {id: \"pixelmon:"+heldItem+"\", Count: 1b}, Variant: \""+variant+"\", Gender: "+gender+"b, ";
                break;
            case "Ability":
                ability = line.split("Ability: ")[1].trim();
                commands += "Ability: \""+ability+"\", ";
                break;
            case "Tera":
                break;
            case "EVs":
                EVHP=EVAttack=EVDefense=EVSpecialAttack=EVSpecialDefense=EVSpeed=0;
                break;
            case "Nature":
                break;
            case "IVs":
                IVHP=IVAttack=IVDefense=IVSpAtt=IVSpDef=IVSpeed=31;
                if (line[0] !== "I") {
                    lineNum = 6;
                    break;
                }
            case "Move1":
                break;
            case "Move2":
                break;
            case "Move3":
                break;
            case "Move4":
                break;
            case "Empty":
                commands += "EVHP: "+EVHP+"s, EVAttack: "+EVAttack+"s, EVDefense: "+EVDefense+"s, EVSpecialAttack: "+EVSpecialAttack+"s, EVSpecialDefense: "+EVSpecialDefense+"s, EVSpeed: "+EVSpeed+"s, ";
                commands += "Nature: "+nature+"b, ";
                commands += "IVHP: "+IVHP+"b, IVAttack: "+IVAttack+"b, IVDefense: "+IVDefense+"b, IVSpAtt: "+IVSpAtt+"b, IVSpDef: "+IVSpDef+"b, IVSpeed: "+IVSpeed+"b, ";
                commands += "Movset: [{MoveID: \""+move1+"\", MovePP: 0b}, {MoveID: \""+move2+"\", MovePP: 0b}, {MoveID: \""+move3+"\", MovePP: 0b}, {MoveID: \""+move4+"\", MovePP: 0b}]}}";
                commands += "<br/><br/><br/><br/>"
                break;
        }
        lineNum++;
    }

    document.getElementById("commands").innerHTML = commands;
}