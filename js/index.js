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
import { formElements, buttons, tabs } from "./constants/domElements.js";

//TODO Ver la clase 11 para preparar el proyecto para su entrega (Workshop)
//TODO Ver la clase 12 para aplicar sugar syntax y simplificaciones al proyecto
//TODO Buscar manera de guardar los equipos dentro de un JSON, es decir, que se escriba el JSON dinámicamente en el código y luego traer el equipo guardado con un fetch

let mainTeam = undefined;

buttons["playerAddButton"].addEventListener("click", () =>
  addPlayerToTeamHandler(mainTeam)
);
buttons["deleteTeamButton"].addEventListener("click", () =>
  deleteTeamHandler(mainTeam)
);
buttons["saveTeamButton"].addEventListener("click", () =>
  saveTeamHandler(mainTeam)
);
buttons["loadTeamButton"].addEventListener("click", loadTeamHandler);
buttons["loadLegacyTeam"].addEventListener("click", loadLegacyTeamHandler);
formElements["teamForm"].addEventListener("submit", submitTeamHandler);

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

//Handlers
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

function submitTeamHandler(submitEvent) {
  submitEvent.preventDefault();

  //Valido si hay un equipo en cancha y le doy la posibilidad al usuario de mantenerlo
  if (mainTeam) {
    Swal.fire({
      title: "¡Ya tienes un equipo en cancha!",
      html: `¡El equipo <b>${mainTeam.name}</b> ya está en cancha! ¿deseas descartarlo y crear uno nuevo?`,
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
        mainTeam = undefined;

        //Obtengo los elementos del formulario y los almaceno en las variables "chosen"
        const chosenTeamName = formElements["inputTeamName"].value;
        const chosenSport =
          formElements["selectSport"].options[
            formElements["selectSport"].selectedIndex
          ].value;
        const chosenPlayerAmount = parseInt(
          formElements["selectPlayerAmount"].options[
            formElements["selectPlayerAmount"].selectedIndex
          ].value
        );

        buildTeam(chosenTeamName, chosenSport, chosenPlayerAmount);
        console.log(mainTeam);
        renderFieldPlayers(mainTeam);
        renderPlayersTab(mainTeam);
        tabs["mainPlayersTabLabel"].removeAttribute("hidden");
        buttons["deleteTeamButton"].removeAttribute("hidden");
      } else if (result.isDenied) {
        return;
      }
    });
  } else {
    mainTeam = undefined;

    //Obtengo los elementos del formulario y los almaceno en las variables "chosen"
    const chosenTeamName = formElements["inputTeamName"].value;
    const chosenSport =
      formElements["selectSport"].options[
        formElements["selectSport"].selectedIndex
      ].value;
    const chosenPlayerAmount = parseInt(
      formElements["selectPlayerAmount"].options[
        formElements["selectPlayerAmount"].selectedIndex
      ].value
    );

    buildTeam(chosenTeamName, chosenSport, chosenPlayerAmount);
    console.log(mainTeam);
    renderFieldPlayers(mainTeam);
    renderPlayersTab(mainTeam);
    tabs["mainPlayersTabLabel"].removeAttribute("hidden");
    buttons["deleteTeamButton"].removeAttribute("hidden");
  }
}

function deleteTeamHandler(team) {
  Swal.fire({
    title: "¿Eliminar este equipo?",
    html: `El equipo <b>${team.name}</b> se eliminará permantentemente`,
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
      tabs["teamTab"].click();
      tabs["mainPlayersTabLabel"].hidden = true;
      buttons["deleteTeamButton"].hidden = true;
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
  tabs["mainPlayersTabLabel"].removeAttribute("hidden");
  buttons["deleteTeamButton"].removeAttribute("hidden");
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

function loadLegacyTeamHandler() {
  fetch("js/constants/legacyTeams.json")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log("Legacy Teams: ", data);
    });

  /*El mismo fetch hubiese funcionado si en el primer .then() uso llaves en la función anónima lo que hago es quitar el return implícito que esta tiene y
  por lo tanto voy a tener que ingresar el retorno manualmente. La otra forma de escribirlo sería:
  
    fetch("js/constants/legacyTeams.json")
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Legacy Teams: ", data);
    });*/
}

//TODO: Implementar DropZone de forma tal que los jugadores solo puedan arrastrarse por el campo de juego
const position = { x: 0, y: 0 };

//Función que le da al atributo draggable la funcionalidad del drag and drop
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

//Función que permite cambiar el color de camiseta al clickear sobre ella
interact(".tap-target")
  .on("tap", function (event) {
    event.currentTarget.classList.toggle("switch-bg");
    event.preventDefault();
  })
  .on("doubletap", function (event) {
    event.currentTarget.classList.toggle("large");
    event.currentTarget.classList.remove("rotate");
    event.preventDefault();
  })
  .on("hold", function (event) {
    event.currentTarget.classList.toggle("rotate");
    event.currentTarget.classList.remove("large");
  });
