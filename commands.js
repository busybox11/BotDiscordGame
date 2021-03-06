module.exports = {
    messageAdminEnter,
    messageEnter,
    Update
}

const Main = require('./main.js');
const ConstructFonc = require('./constructor').Functions;
const PlayerConstructor = require('./constructor').Player;
const CommandsFunctions = require('./classCommands');

let heure = 12;
let minute = 0;
let heurepassé = false;

function messageEnter(message, datefonc, args, command, Players, admin){

    if(command == "help"){
        CommandsFunctions.help(args);
    }

    if(command == "playerlist"){
        for (let i = 0; i < Players.length; i++) {
            Main.sendMessage("`"+`${i + 1} - ${Players[i].name}`+"`", "general");
        }
    }

    if(command == "stats"){
        if(args == ""){
            ConstructFonc.getStatsPlayer(message.author.tag, Players,args);
        }else{
            ConstructFonc.getStatsPlayer(args, Players, args);
        }
    }

    if(command == "hour")
    {
        Main.sendMessage(`Il est : ${datefonc.getHours()}h${datefonc.getMinutes()}`, "general");
    }

    if(command == "date")
    {
        let mois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
        let jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        Main.sendMessage(`Today it's ${jours[datefonc.getDay() - 1]} ${datefonc.getDate()} ${mois[datefonc.getMonth()]} ${datefonc.getFullYear()}`, "general"); 
    }

    if(message.author.id != admin && (command == "sethour" || command == "heal" || command == "dammage" || command == "addplayer" )){
        Main.sendMessage("You're not allowed to do this command", "private");
    }
};

function messageAdminEnter(message, datefonc, args, command, Players, admin){
    
    if(command == "sethour"){
        if(parseInt(args[0]) && parseInt(args[1]) || args[0] == 0 && parseInt(args[1]) || parseInt(args[0]) && args[1] == 0){
            if(0 <= args[0] && args[0] <= 23){
                if(0 <= args[1] && args[1] <= 59){
                    heure = args[0];
                    minute = args[1];
                    Main.sendMessage(`The hour of auto-send message have been update to ${heure}h${minute}`, "general")
                }else{
                    Main.sendMessage("You must indicate valid minutes (between 0 and 59 inclued)", "general");
                }
            }else{
                Main.sendMessage("You must indicate an valid hour (between 0 and 23 inclued)", "general");
            }
        }else{
            Main.sendMessage("You must indicate an hour and minutes (for example !sethour 10 15 (10h and 15min))", "general");
        }
    }

    if(command == "heal"){
        Players[ConstructFonc.getPlayerProfil(message.author.tag, Players)].heal();
    }

    if(command == "dammage"){
        if(args != ""){
            if(ConstructFonc.getPlayerProfil(args, Players)){
                Players[ConstructFonc.getPlayerProfil(args, Players)].takeDammage(Players[ConstructFonc.getPlayerProfil(message.author.tag, Players)], Players);
            }else{
                Main.sendMessage("You have to write a valid name", "general");
            }
        }else{
            Main.sendMessage("You have to write a name", "general");
        }
    }

    if(command == "addplayer"){
        Main.AddPlayer(args[0]);
    }
};

function Update(){
  
    const datefonc = new Date();

    if(datefonc.getHours()==heure && datefonc.getMinutes()==minute && heurepassé == false){
        heurepassé = true;
        Main.sendMessage("It's time", "general");
    }
    else if(datefonc.getHours()==heure && datefonc.getMinutes()== minute+1 && heurepassé == true){
        heurepassé = false;
        return
    }
};
