import Team from "./classes/Team.class.js";
import Player from "./classes/Player.class.js";
import {
  renderFieldPlayers,
  renderPlayersTab,
  playerAmountPrinter,
} from "./auxFunctions/domPrinter.js";
import {
  saveTeamToStorage,
  deleteTeamFromStorage,
  fetchFromStorage,
} from "./auxFunctions/storageHandler.js";
import {
  formElements,
  buttons,
  tabs,
  renderableElements,
} from "./constants/domElements.js";

let mainTeam = undefined;

//________________________________________________Mapeo de Event Listeners____________________________________________________//

buttons["playerAddButton"].addEventListener("click", () =>
  addPlayerToTeamHandler(mainTeam)
);
buttons["deleteTeamButton"].addEventListener("click", () =>
  deleteTeamHandler(mainTeam)
);
buttons["saveTeamButton"].addEventListener("click", () =>
  saveTeamHandler(mainTeam)
);
buttons["loadTeamButton"].addEventListener("click", () =>
  loadTeamHandler("STORAGE")
);
buttons["loadLegacyTeamButton"].addEventListener("click", () =>
  loadTeamHandler("LEGACY")
);
formElements["teamForm"].addEventListener("submit", submitTeamHandler);

formElements["selectSport"].addEventListener("change", () => {
  sportChangeHandler(
    formElements["selectSport"].options[
      formElements["selectSport"].selectedIndex
    ].value
  );
});

//________________________________________________Funciones Auxiliares____________________________________________________//
/**
 * Función utilizada para asignar el dorsal de un nuevo jugador
 * @param {Array} A Arreglo con valores numéricos
 * @return {Number} Primer número positivo disponible en el arreglo "A"
 */
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

/**
 * Función encargada de instanciar un equipo y con sus respectivos jugadores
 * @param {String} teamName Nombre del equipo
 * @param {String} teamSport Tipo de deporte
 * @param {Number} teamPlayerAmount Cantidad con la que se inicializará el equipo
 * @return {Team}
 */
function buildTeam(teamName, teamSport, teamPlayerAmount) {
  let team = new Team(teamName, teamSport);

  for (let i = 1; i <= teamPlayerAmount; i++) {
    let player = new Player(i, "", teamName, i);

    team.addPlayer(player);
  }
  mainTeam = team;
}

//________________________________________________Handlers____________________________________________________//

/**
 * Handler encargado de agregar un jugador nuevo a un equipo preexistente, le da comportamiento al botón "+"
 * @param {Team} team Equipo al que se le agrega un jugador
 */
function addPlayerToTeamHandler(team) {
  if (team.sport === "football" && team.players.length === 11) {
    Swal.fire(
      "Demasiados jugadores!",
      "Recuerda que no es posible tener más de 11 jugadores en un equipo de fútbol",
      "error"
    );
    return;
  } else if (team.sport === "basketball" && team.players.length === 5) {
    Swal.fire(
      "Demasiados jugadores!",
      "Recuerda que no es posible tener más de 5 jugadores en un equipo de básquet",
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

/**
 * Handler que orquesta la creación y el renderizado de un nuevo equipo
 * @param {Event} submitEvent Evento que se dispara al confirmar el formulario de la tab "Equipo"
 */
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
        renderFieldPlayers(mainTeam);
        renderPlayersTab(mainTeam);
        renderableElements["teamNameHeader"].removeAttribute("hidden");
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
    renderFieldPlayers(mainTeam);
    renderPlayersTab(mainTeam);
    renderableElements["teamNameHeader"].removeAttribute("hidden");
    tabs["mainPlayersTabLabel"].removeAttribute("hidden");
    buttons["deleteTeamButton"].removeAttribute("hidden");
  }
}

/**
 * Handler que elimina el equipo actual
 * @param {Team} team Equipo a eliminar
 */
function deleteTeamHandler(team) {
  Swal.fire({
    title: "¿Eliminar este equipo?",
    html: `El equipo <b>${team.name}</b> se eliminará permantentemente, no podrá volver a cargarse`,
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
      //Si el nombre del equipo en cancha coincide con el del equipo que está en el storage, limpia el storage
      mainTeam.name === fetchFromStorage().name && deleteTeamFromStorage();

      //Asigno al equipo principal un equipo vacío para renderizar, luego vuelvo a dejarlo undefined
      team = new Team();
      mainTeam = team;
      renderFieldPlayers(mainTeam);
      renderPlayersTab(mainTeam);
      mainTeam = undefined;

      tabs["teamTab"].click();
      renderableElements["teamNameHeader"].innerHTML = "";
      renderableElements["teamNameHeader"].hidden = true;
      tabs["mainPlayersTabLabel"].hidden = true;
      buttons["deleteTeamButton"].hidden = true;
      Swal.fire("Equipo eliminado!", "", "success");
    } else if (result.isDenied) {
      return;
    }
  });
}

/**
 * Handler encargado de cargar un equipo
 * @param {String} source Parámetro que indica si el equipo se debe cargar desde el local storage o bien desde el JSON de equipos de legado
 */
async function loadTeamHandler(source) {
  let teamToLoad;
  switch (source) {
    case "STORAGE":
      teamToLoad = fetchFromStorage();
      if (!teamToLoad) {
        Swal.fire(
          "No hay equipos guardados",
          "Recuerda presionar el botón <b>SAVE</b> para no perder los cambios!",
          "error"
        );
      }
      break;
    case "LEGACY":
      const legacyTeams = await fetch("js/constants/legacyTeams.json")
        .then((promise) => {
          return promise.json();
        })
        .then((data) => {
          let chosenLegacyTeam =
            formElements["selectLegacyTeam"].options[
              formElements["selectLegacyTeam"].selectedIndex
            ].value;
          teamToLoad = data[chosenLegacyTeam];
        });
      break;
    default:
      Swal.fire(
        "Se produjo un inesperado, por favor intentá nuevamente más tarde",
        "",
        "error"
      );
      return;
  }
  mainTeam = new Team(teamToLoad.name, teamToLoad.sport, teamToLoad.players);
  renderFieldPlayers(mainTeam);
  renderPlayersTab(mainTeam);
  renderableElements["teamNameHeader"].removeAttribute("hidden");
  tabs["mainPlayersTabLabel"].removeAttribute("hidden");
  buttons["deleteTeamButton"].removeAttribute("hidden");
  Swal.fire(
    "Equipo cargado exitosamente!",
    "Recuerda presionar el botón <b>SAVE</b> para no perder los cambios!",
    "success"
  );
}

/**
 * Handler encargado de guardar un equipo que esté en cancha
 * @param {Team} team Equipo a guardar
 */
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

/**
 * Handler encargado de modificar los atributos de un jugador del equipo en cancha y plasmar los cambios en el DOM (interactúa con el domPrinter)
 * @param {Number} i Índice que representa la fila de la tab de jugadores que se modificó, coincide con la posición del jugador modificado en el arreglo de jugadores
 * @param {Element} modifiedElement Elemento del DOM en el que el usuario ingresó el valor a modificar
 * @param {Team} team Equipo en cancha sobre el que contiene al jugador al que se le debe aplicar la modificación
 */
function updatePlayerHandler(i, modifiedElement, team) {
  switch (modifiedElement) {
    case "PLAYER NAME":
      //Obtengo y actualizo el nombre del jugador
      let newName =
        renderableElements["playersTabNameColumn"].getElementsByTagName(
          "input"
        )[i].value;
      team.players[i].name = newName;

      //Vuelvo a renderizar la cancha
      renderFieldPlayers(team);
      break;
    case "SHIRT NUMBER":
      //Obtengo y actualizo el número de camiseta del jugador
      let newNumber =
        renderableElements["playersTabShirtNumberColumn"].getElementsByTagName(
          "input"
        )[i].value;
      team.players[i].shirtNumber = parseInt(newNumber);

      //Vuelvo a renderizar la cancha
      renderFieldPlayers(team);
      break;
    case "DELETE PLAYER":
      //Borro al jugador del equipo
      let deletedPlayer = team.players[i];
      team = team.deletePlayer(deletedPlayer);

      //Vuelvo a renderizar la tab y la cancha sin el jugador borrado
      renderFieldPlayers(team);
      renderPlayersTab(team);
      break;
    default:
      Swal.fire(
        "Se produjo un inesperado, por favor intentá nuevamente más tarde",
        "",
        "error"
      );
      return;
  }
}

/**
 * Handler que envía la orden de reimprimir la cantidad máxima de jugadores ante un cambio en el deporte seleccionado
 * @param {String} selectedSport Deporte seleccionado
 */
function sportChangeHandler(selectedSport) {
  playerAmountPrinter(selectedSport);
}

//________________________________________________Interact JS____________________________________________________//

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

//Función que permite alternar la clase de un determinado elemento del DOM (se utiliza para poder cambiar a la camiseta del arquero)
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

export { updatePlayerHandler };
