//Objetos en los que almaceno todos los elementos del DOM según su categoría

const renderableElements = {
  playersTabShirtNumberColumn: document
    .getElementById("playersTab")
    .getElementsByTagName("div")[0],

  playersTabNameColumn: document
    .getElementById("playersTab")
    .getElementsByTagName("div")[1],

  playersTabDeleteColumn: document
    .getElementById("playersTab")
    .getElementsByTagName("div")[2],

  field: document.getElementById("field"),
  teamNameHeader: document.getElementById("teamNameHeader"),
};

const formElements = {
  teamForm: document.getElementById("teamForm"),
  inputTeamName: document.getElementById("inputTeamName"),
  selectSport: document.getElementById("selectSport"),
  selectPlayerAmount: document.getElementById("selectPlayerAmount"),
  selectLegacyTeam: document.getElementById("selectLegacyTeam"),
};

const buttons = {
  saveTeamButton: document.getElementById("saveTeamButton"),
  loadTeamButton: document.getElementById("loadTeamButton"),
  deleteTeamButton: document.getElementById("deleteTeamButton"),
  playerAddButton: document.getElementById("playerAddButton"),
  loadLegacyTeamButton: document.getElementById("loadLegacyTeamButton"),
};

const tabs = {
  teamTab: document.getElementById("teamTab"),
  mainPlayersTabLabel: document.getElementById("mainPlayersTabLabel"),
  legacyTablabel: document.getElementById("legacyTablabel"),
};

export { renderableElements, formElements, buttons, tabs };
