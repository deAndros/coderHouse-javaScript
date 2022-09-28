alert("Bienvenido a AndrosTeam Builder (ALFA version)!")

class Team {
    constructor(id, name, playerAmount){
        this.id = id
        this.name = name
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

function Player(name, teamId){
    this.name = name
    this.teamId = teamId
}

function buildTeam(playerAmount, teamNumber){   
    
    let teamName = prompt("Ingrese el nombre del equipo " + teamNumber)    
    let team = new Team(teamNumber, teamName, playerAmount)       

    for(let i = 1; i<=playerAmount; i++){
        let playerName = prompt("Ingrese el nombre del jugador " + i)       
        
        //Valido que no puedan ingresarse caracteres numéricos utilizando expresiones regulares
        if(/\d/.test(playerName)){
            i = i-1
            alert("No se admiten caracteres numéricos en los nombres de los jugadores")
            continue
        } else {
            let player = new Player(playerName, teamNumber)
            team.addPlayer(player)
        }
    }   
    console.log(team.listTeam())
    return team
}

function selectEvent(){
    let event = prompt("Seleccione qué tipo de evento desea planificar \n1 - Fútbol 5\n2 - Basquet (3v3)")

    switch(event){

        case("1"):
            if(prompt("¿Desea planificar al equipo rival?\n1 - Sí\n2 - No") == "1"){              
                let team1 = buildTeam(5, 1)
                let team2 = buildTeam(5, 2)
                alert("Equipo 1:\n" + team1.listTeam() + "\n\nVS\nEquipo 2:\n" + team2.listTeam())
            } else {
                let team1 = buildTeam(5, 1)
                alert(team1.listTeam())
            }
            break;
            
        case("2"):
            if(prompt("¿Desea planificar al equipo rival?\n1 - Sí\n2 - No") == "1"){               
                let team1 = buildTeam(3, 1)
                let team2 = buildTeam(3, 2)
                alert("Equipo 1:\n" + team1.listTeam() + "\n\nVS\nEquipo 2:\n" + team2.listTeam())
            } else {
                let team1 = buildTeam(5, 1)
                alert(team1.listTeam())
            }
            break;

        default:
            alert("La opción ingresada no se encuentra disponible, por favor ingrese otra")
            selectEvent()
    }
}

selectEvent()