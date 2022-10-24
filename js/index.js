import Team from "./classes/Team.class.js";
import Player from "./classes/Player.class.js";
import {
  renderFieldPlayers,
  renderPlayersTab,
} from "./auxFunctions/domPrinter.js";
import {
  saveTeamToStorage,
  deleteTeamFromStorage,
  fetchFromStorage,
} from "./auxFunctions/storageHandler.js";

//TODO Ver la clase 11 para preparar el proyecto para su entrega (Workshop)
//TODO Ver la clase 12 para aplicar sugar syntax y simplificaciones al proyecto

let mainTeam = undefined;

const inputTeamName = document.getElementById("inputTeamName");
const selectSport = document.getElementById("selectSport");
const selectPlayerAmount = document.getElementById("selectPlayerAmount");
const teamForm = document.getElementById("teamForm");
const loadTeamButton = document.getElementById("loadTeamButton");
const saveTeamButton = document.getElementById("saveTeamButton");
const deleteTeamButton = document.getElementById("deleteTeamButton");
const playerAddButton = document.getElementById("playerAddButton");
const mainPlayersTabLabel = document.getElementById("mainPlayersTabLabel");
const stylesTabLabel = document.getElementById("stylesTabLabel");
const teamTab = document.getElementById("teamTab");

playerAddButton.addEventListener("click", () =>
  addPlayerToTeamHandler(mainTeam)
);
deleteTeamButton.addEventListener("click", () => deleteTeamHandler(mainTeam));
saveTeamButton.addEventListener("click", () => saveTeamHandler(mainTeam));
loadTeamButton.addEventListener("click", loadTeamHandler);
teamForm.addEventListener("submit", submitTeamHandler);

function addPlayerToTeamHandler(team) {
  if (team.players.length === 11) {
    Swal.fire(
      "Demasiados jugadores!",
      "Recuerda que no es posible tener más de 11 jugadores en un equipo",
      "error"
    );
    return;
  }

  //Tomo el arreglo de jugadores y lo transformo en un arreglo de IDs de jugadores
  let playersIdArray = team.players.map((player) => player.id);

  //Busco el mínimo ID entero y positivo disponible en el arreglo
  let newPlayerId = firstMissingPositive(playersIdArray);

  //Repito el mismo proceso para determinar el número de camiseta
  let playersShirtNumberArray = team.players.map(
    (player) => player.shirtNumber
  );
  let newPlayerShirtNumber = firstMissingPositive(playersShirtNumberArray);

  //Creo un nuevo jugador asignandole el ID y el número de camiseta hallados
  let newPlayer = new Player(newPlayerId, "", team.name, newPlayerShirtNumber);

  //Agrego el jugador en el array de jugadores
  team.addPlayer(newPlayer);

  mainTeam = team;
  renderFieldPlayers(mainTeam);
  renderPlayersTab(mainTeam);
}

//Función auxiliar para encontrar el primer número entero positivo que no esté en un arreglo
let firstMissingPositive = function (A) {
  let j = 0;
  for (let i = 0; i < A.length; i++) {
    if (A[i] <= 0) {
      let temp = A[j];
      A[j] = A[i];
      A[i] = temp;
      j++;
    }
  }

  let arr = A.slice(j);

  for (let i = 0; i < arr.length; i++) {
    if (arr[Math.abs(arr[i]) - 1] > 0) {
      arr[Math.abs(arr[i]) - 1] = -arr[Math.abs(arr[i]) - 1];
    }
  }

  let k = 0;
  while (true) {
    if (k == arr.length || arr[k] > 0) {
      break;
    }
    k++;
  }
  return ++k;
};

function buildTeam(teamName, teamSport, teamPlayerAmount) {
  let team = new Team(teamName, teamSport);

  for (let i = 1; i <= teamPlayerAmount; i++) {
    let player = new Player(i, "", teamName, i);

    team.addPlayer(player);
  }
  mainTeam = team;
}

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
  mainPlayersTabLabel.removeAttribute("hidden");
  stylesTabLabel.removeAttribute("hidden");
  deleteTeamButton.removeAttribute("hidden");
}

function deleteTeamHandler(team) {
  Swal.fire({
    title: "¿Eliminar este equipo?",
    html: `Recuerda que una vez eliminado, el equipo <b>${team.name}</b> no podrá volverse a cargar`,
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: "No",
    customClass: {
      actions: "my-actions",
      confirmButton: "order-2",
      denyButton: "order-3",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      team = new Team();
      mainTeam = team;

      renderFieldPlayers(mainTeam);
      renderPlayersTab(mainTeam);
      deleteTeamFromStorage();
      mainTeam = undefined;
      teamTab.click();
      mainPlayersTabLabel.hidden = true;
      stylesTabLabel.hidden = true;
      deleteTeamButton.hidden = true;
      Swal.fire("Equipo eliminado!", "", "success");
    } else if (result.isDenied) {
      return;
    }
  });
}

function loadTeamHandler() {
  let team = fetchFromStorage();
  if (!team) {
    Swal.fire(
      "No hay equipos guardados",
      "Recuerda presionar el botón <b>SAVE</b> para no perder los cambios!",
      "error"
    );
    return;
  }

  mainTeam = new Team(team.name, team.sport, team.players);
  renderFieldPlayers(mainTeam);
  renderPlayersTab(mainTeam);
  mainPlayersTabLabel.removeAttribute("hidden");
  stylesTabLabel.removeAttribute("hidden");
  deleteTeamButton.removeAttribute("hidden");
  Swal.fire(
    "Equipo cargado exitosamente!",
    "Recuerda presionar el botón <b>SAVE</b> para no perder los cambios!",
    "success"
  );
}

function saveTeamHandler(team) {
  if (!team) {
    Swal.fire(
      "No hay ningún equipo en cancha!",
      "Recuerda presionar el botón <b>BUILD TEAM!</b> para crear uno o bien el botón <b>LOAD</b> si ya lo tienes!",
      "info"
    );
    return;
  }
  saveTeamToStorage(team);
  Swal.fire(
    "Equipo guardado correctamente!",
    "Recuerda presionar el botón <b>LOAD</b> para poder recuperarlo!",
    "success"
  );
}

//TODO: Implementar DropZone de forma tal que los jugadores solo puedan arrastrarse por el campo de juego
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
});
