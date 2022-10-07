//alert("Bienvenido a Andros TeamBuilder (ALFA version)!")
let mainTeam

class Team {
    constructor(name, sport, playerAmount){
        this.id = Math.floor(Math.random() * 100) + 1
        this.name = name
        this.sport = sport
        this.playerAmount = playerAmount
        this.players = []
    }
    
    addPlayer(player){
        this.players.push(player)
    }

    listTeam(){
        let teamString = ""
        for (const player of this.players) {
            teamString += player.name + "\n"
        }
        return this.name + "\n" + teamString
    }
}

function Player(name, teamName){
    this.name = name
    this.teamName = teamName
}

function buildTeam(teamName, teamSport, teamPlayerAmount){   
       
    let team = new Team(teamName, teamSport, teamPlayerAmount)       

    for(let i = 1; i<=teamPlayerAmount; i++){
        const playerName = prompt("Ingrese el nombre del jugador " + i)       
        
        //Valido que no puedan ingresarse caracteres numéricos utilizando expresiones regulares
        if(/\d/.test(playerName)){
            i = i-1
            alert("No se admiten caracteres numéricos en los nombres de los jugadores")
            continue
        } else {
            let player = new Player(playerName, teamName)
            team.addPlayer(player)
        }
    }   
    console.log(team.listTeam())
    mainTeam = team
    return team
}

function buildField(e) {
    e.preventDefault();
    const selectPlayerAmount = document.getElementById("selectPlayerAmount")
    const chosenPlayerAmount = parseInt(selectPlayerAmount.options[selectPlayerAmount.selectedIndex].value);
    const field = document.getElementById('field');
    
    field.innerHTML = '';

    for (let i = 1; i <= mainTeam.lenght(); i++) {
        field.innerHTML = `${field.innerHTML}
        <div class="player-${i}">
        <img src="./assets/images/kit.png" alt="camiseta">
        <input type="text" name="" id="">
        </div>`
    }

}

function selectEvent(event){

    event.preventDefault()

    //Obtengo los elementos del formulario y los almaceno en las variables "chosen"
    const inputTeamName = document.getElementById("inputTeamName")
    const selectSport = document.getElementById("selectSport")
    const selectPlayerAmount = document.getElementById("selectPlayerAmount")

    const chosenTeamName = inputTeamName.value
    const chosenSport = selectSport.options[selectSport.selectedIndex].value
    const chosenPlayerAmount = selectPlayerAmount.options[selectPlayerAmount.selectedIndex].value
    
    console.log(inputTeamName.value)
    console.log(chosenSport)
    console.log(chosenPlayerAmount)

    const team = buildTeam(chosenTeamName, chosenSport, chosenPlayerAmount)
    alert(team.listTeam())
}

const buttonBuild = document.getElementById("buttonBuild")
console.log(buttonBuild)

buttonBuild.addEventListener("click", buildField)
    // let inputTeamName = document.getElementById("inputTeamName")
    // let selectSport = document.getElementById("selectSport")
    // let selectPlayerAmount = document.getElementById("selectPlayerAmount")

    // let chosenTeamName = inputTeamName.value
    // let chosenSport = selectSport.options[selectSport.selectedIndex].value
    // let chosenPlayerAmount = selectPlayerAmount.options[selectPlayerAmount.selectedIndex].value
    
    // console.log(inputTeamName.value)
    // console.log(chosenSport)
    // console.log(chosenPlayerAmount)

    // let team = buildTeam(chosenTeamName, chosenSport, chosenPlayerAmount)
    // alert(team.listTeam())



