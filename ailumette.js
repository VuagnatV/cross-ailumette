const readline = require("readline");
const { exec } = require('child_process');

function Ask(query) {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    })
  
    return  new Promise(resolve => readline.question(query, ans => {
    readline.close();
    resolve(ans);
  }))
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function ErrorLine(line, gameboard){

    if(line > 4 || line == 0){
        console.log("Error: this line is out of range")
        return false
    }
    else if(line < 0 || isNaN(line)){
        console.log("Error: invalid input (positive number expected)")
        return false
    }
    return true
}

function ErrorMatches(line, matches, gameboard){
    if(matches == 0){
        console.log("Error: you have to remove at least one match")
        return false
    }
    else if(matches < 0 || isNaN(matches)){
        console.log("Error: invalid input (positive number expected)")
        return false
    }
    else if((gameboard[line - 1].lastIndexOf(1) - gameboard[line - 1].indexOf(1) + 1) < matches){
        console.log("Error: not enough matches on this line")
        return false
    }
    return true
}

async function Game(){

    let on = 1
    let turn = 0
    let line
    let matches
    let baseboard = [[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1]]
    let gameboard = baseboard

    while(on){
        turn += 1
        Affichage(gameboard)
        if(turn % 2 != 0){
            console.log("Your turn : ")
            line = await Ask("Line: ") 
            while(!ErrorLine(line, gameboard)){
                line = await Ask("Line: ") 
            }
            matches = await Ask("Matches: ")
            while(!ErrorMatches(line, matches, gameboard)){
                line = await Ask("Line: ") 
                while(!ErrorLine(line, gameboard)){
                    line = await Ask("Line: ") 
                }
                matches = await Ask("Matches: ")
            }
            matches = parseInt(matches)
            line -= 1
            console.log(`PLAYER removed ${matches} match(es) from line ${line + 1}`)
        }

        else{
            console.log("AI’s turn...")
            line = getRandomInt(0, 4)
            //console.log(line)
            while(!gameboard[line].includes(1)){
                line = getRandomInt(0, 4)
            }
            let NbrMatches = gameboard[line].lastIndexOf(1) - gameboard[line].indexOf(1) + 1
            matches = getRandomInt(1, NbrMatches + 1)
            console.log(`AI removed ${matches} match(es) from line ${line + 1}`)
        }
        //console.log(gameboard[line].indexOf(1) + matches)
        let help = gameboard[line].indexOf(1) + matches
        for(let j = gameboard[line].indexOf(1); j < help; j++){
            gameboard[line][j] = 0
        }
        
        if(GameOver(gameboard)) on = 0
    }
    Affichage(gameboard)
    if(turn % 2 != 0) console.log("You lost, too bad..")
    else console.log(" I lost.. snif.. but I’ll get you next time!!")
    console.log("\r\n")
}

function GameOver(board){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 7; j++){
            if(board[i][j]) return false
        }
    }
    return true
}

function Affichage(board){
    console.log("*********")
    for(let i = 0; i < 4; i++){
        process.stdout.write("*")
        for(let j = 0; j < 7; j++){
            if(board[i][j]) process.stdout.write("|")
            else process.stdout.write(" ")
        }
        console.log("*")
    }
    console.log("*********\n")
}


if(process.argv[2] == "--gui"){
    exec('npm run start')
    exec('npm run electron-start')
}
else Game()

