import Team from "./classes/Team.class.js";
import Player from "./classes/Player.class.js";
import {
  printFieldPlayers,
  printPlayersTabContent,
} from "./auxFunctions/domPrinter.js";

let mainTeam = [];

const teamForm = document.getElementById("teamForm");

teamForm.addEventListener("submit", teamHandler);

function buildTeam(teamName, teamSport, teamPlayerAmount) {
  let team = new Team(teamName, teamSport, teamPlayerAmount);

  for (let i = 1; i <= teamPlayerAmount; i++) {
    const playerName = prompt("Ingrese el nombre del jugador " + i);

    //Valido que no puedan ingresarse caracteres numéricos utilizando expresiones regulares
    if (/\d/.test(playerName)) {
      i = i - 1;
      alert(
        "No se admiten caracteres numéricos en los nombres de los jugadores"
      );
      continue;
    } else {
      let player = new Player(playerName, teamName, i);
      console.log(player);
      team.addPlayer(player);
    }
  }
  console.log(team.listTeam());
  mainTeam = team;
  return team;
}

function teamHandler(submitEvent) {
  submitEvent.preventDefault();

  //Obtengo los elementos del formulario y los almaceno en las variables "chosen"
  const inputTeamName = document.getElementById("inputTeamName");
  const selectSport = document.getElementById("selectSport");
  const selectPlayerAmount = document.getElementById("selectPlayerAmount");

  const chosenTeamName = inputTeamName.value;
  const chosenSport = selectSport.options[selectSport.selectedIndex].value;
  const chosenPlayerAmount = parseInt(
    selectPlayerAmount.options[selectPlayerAmount.selectedIndex].value
  );

  /*Intenté acceder a los elementos del formulario desde el evento submit pero se me dificulta porque los mismos están dentro de una tabla.
  Por este motivo, opté por acceder a ellos directamente desde su ID

  const chosenTeamName = submitEvent.target.children[0].innerHTML
  const chosenSport = submitEvent.target.children[1]
  const chosenPlayerAmount = submitEvent.target.children[2]*/

  buildTeam(chosenTeamName, chosenSport, chosenPlayerAmount);
  printFieldPlayers(mainTeam);
  printPlayersTabContent(mainTeam);
}
