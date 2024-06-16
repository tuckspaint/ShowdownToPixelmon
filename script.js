
window.onload = makeDex;

const dex = new Map();

function makeDex() {
    fetch("ndex.txt")
    .then((res) => res.text())
    .then((text) => {
    console.log(text);
    })
}

function generateCommands() {
    document.getElementById("showdown").value;
    document.getElementById("commands").innerHTML = document.getElementById("showdown").value;
    //"setblock -381 6 -80 pixelmon:poke_gift[facing=west]{chestOneTime: 1b, Owner: [I; 0, 0, 0, 0], dropOneTime: 1b, pixelmon: {ndex: 264, palette: \"none\", Level: 5, Moveset: [{MoveID: \"Tackle\", MovePP: 35b}], Health: 10, Gender: 1b, Nature: 10b, Growth: 7b, CaughtBall: \"premier_ball\", IVHP: 0b, IVAttack: 3b, IVDefense: 4b, IVSpAtt: 14b, IVSpDef: 23b, IVSpeed: 1b, DoesLevel: 0b, originalTrainer:\"Little Cup Competition\"}}";
}