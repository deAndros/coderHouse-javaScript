import Team from "./classes/Team.class.js";
import Player from "./classes/Player.class.js";

let mainTeam = [];

const teamForm = document.getElementById("teamForm");

const buttonBuild = document.getElementById("buttonBuild");

console.log(buttonBuild);

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

function domPrinter(team) {
  const field = document.getElementById("field");
  const playersTabContent = document.getElementById("playersTabContent");

  field.innerHTML = "";

  for (let i = 1; i <= team.players.length; i++) {
    //Agrego los jugadores al campo de juego
    field.innerHTML = `${field.innerHTML}
        <div class="player-${i}">
          <img src="../assets/images/footballKit.png" alt="camiseta">
          </br>
          <input class="playerFieldInput" id="player-${i}" value="${
      team.players[i - 1].name
    }">
        </div>`;

    //Construyo la tabla con el detalle de los jugadores en la tab "jugadores"
    let shirtNumberColumn = playersTabContent.getElementsByTagName("div")[0];
    shirtNumberColumn.innerHTML = `${shirtNumberColumn.innerHTML}
      <input
        type="number"
        id="playerNumber${i}"
        class="inputPlayerNumber"
        value="${team.players[i - 1].shirtNumber}"
      />`;

    let playerNameColumn = playersTabContent.getElementsByTagName("div")[1];
    playerNameColumn.innerHTML = `${playerNameColumn.innerHTML}
      <input
        type="text"
        id="inputPlayerName${i}"
        class="inputPlayerName"
        value="${team.players[i - 1].name}"
      />`;
  }
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
  domPrinter(mainTeam);
}
