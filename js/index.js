import Team from "./classes/Team.class.js";
import Player from "./classes/Player.class.js";
import {
  renderFieldPlayers,
  renderPlayersTab,
} from "./auxFunctions/domPrinter.js";

let mainTeam;

const teamForm = document.getElementById("teamForm");
teamForm.addEventListener("submit", teamHandler);

function buildTeam(teamName, teamSport, teamPlayerAmount) {
  let team = new Team(teamName, teamSport, teamPlayerAmount);

  for (let i = 1; i <= teamPlayerAmount; i++) {
    let player = new Player(i, "", teamName, i);

    team.addPlayer(player);
  }

  mainTeam = team;
}

const inputTeamName = document.getElementById("inputTeamName");
const selectSport = document.getElementById("selectSport");
const selectPlayerAmount = document.getElementById("selectPlayerAmount");

function teamHandler(submitEvent) {
  submitEvent.preventDefault();

  //Obtengo los elementos del formulario y los almaceno en las variables "chosen"
  const chosenTeamName = inputTeamName.value;
  const chosenSport = selectSport.options[selectSport.selectedIndex].value;
  const chosenPlayerAmount = parseInt(
    selectPlayerAmount.options[selectPlayerAmount.selectedIndex].value
  );

  buildTeam(chosenTeamName, chosenSport, chosenPlayerAmount);
  renderFieldPlayers(mainTeam);
  renderPlayersTab(mainTeam);
}
