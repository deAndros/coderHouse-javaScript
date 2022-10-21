import Team from "./classes/Team.class.js";
import Player from "./classes/Player.class.js";
import {
  renderFieldPlayers,
  renderPlayersTab,
} from "./auxFunctions/domPrinter.js";
import { saveTeam } from "./auxFunctions/storageHandler.js";

//TODO Ver la clase 11 para preparar el proyecto para su entrega (Workshop)
//TODO Ver la clase 12 para aplicar sugar syntax y simplificaciones al proyecto

let mainTeam = undefined;

function buildTeam(teamName, teamSport, teamPlayerAmount) {
  let team = new Team(teamName, teamSport);

  for (let i = 1; i <= teamPlayerAmount; i++) {
    let player = new Player(i, "", teamName, i);

    team.addPlayer(player);
  }
  mainTeam = team;
}

function loadTeam() {
  mainTeam = JSON.parse(localStorage.getItem("mainTeam")) || undefined;

  if (!mainTeam) {
    console.log("No hay ningún equipo guardado");
  } else {
    renderFieldPlayers(mainTeam);
    renderPlayersTab(mainTeam);
  }

  console.log(mainTeam);
}

const inputTeamName = document.getElementById("inputTeamName");
const selectSport = document.getElementById("selectSport");
const selectPlayerAmount = document.getElementById("selectPlayerAmount");
const teamForm = document.getElementById("teamForm");
const loadTeamButton = document.getElementById("loadTeamButton");

loadTeamButton.addEventListener("click", loadTeam);

teamForm.addEventListener("submit", submitTeamHandler);

function submitTeamHandler(submitEvent) {
  submitEvent.preventDefault();
  mainTeam = undefined;

  //Obtengo los elementos del formulario y los almaceno en las variables "chosen"
  const chosenTeamName = inputTeamName.value;
  const chosenSport = selectSport.options[selectSport.selectedIndex].value;
  const chosenPlayerAmount = parseInt(
    selectPlayerAmount.options[selectPlayerAmount.selectedIndex].value
  );

  buildTeam(chosenTeamName, chosenSport, chosenPlayerAmount);
  renderFieldPlayers(mainTeam);
  renderPlayersTab(mainTeam);
  saveTeam(mainTeam);
}

/*TODO: Implementar Drag and Drop

const position = { x: 0, y: 0 };

interact(".draggable").draggable({
  listeners: {
    start(event) {
      console.log(event.type, event.target);
    },
    move(event) {
      position.x += event.dx;
      position.y += event.dy;

      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    },
  },
});*/
