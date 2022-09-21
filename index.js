alert("Bienvenido a Andros Team Builder (ALFA version)!")

function buildTeam(playerAmount){
    let teamPlayers = ""
    let teamName = prompt("Ingrese el nombre del equipo")

    for(let i = 1; i<=playerAmount; i++){
        let player = prompt("Ingrese el nombre del jugador " + i) + "\n"
        
        //Valido que no puedan ingresarse caracteres numéricos utilizando expresiones regulares
        if(/\d/.test(player)){
            i = i-1
            alert("No se admiten caracteres numéricos en los nombres de los jugadores")
            continue
        }

        teamPlayers += player
    }
    
    console.log(teamName + ":\n" + teamPlayers)
    return teamName + ":\n" + teamPlayers
}

function selectEvent(){
    let event = prompt("Seleccione qué tipo de evento desea planificar \n1 - Fútbol 5\n2 - Basquet (3v3)")

    switch(event){
        case("1"):
            if(prompt("¿Desea planificar al equipo rival?\n1 - Sí\n2 - No") == "1"){
                alert("Equipo 1 - " + buildTeam(5) + "\nVS\n\nEquipo 2 - " + buildTeam(5))
            } else {
                alert(buildTeam(5))
            }
            break;
            
        case("2"):
            if(prompt("¿Desea planificar al equipo rival?\n1- Sí\n2 - No") == "1"){
                alert("Equipo 1 - " + buildTeam(3) + "\nVS\n\nEquipo 2 - " + buildTeam(3))
            } else {
                alert(buildTeam(3))
            }
            break;
    }
}

selectEvent()
