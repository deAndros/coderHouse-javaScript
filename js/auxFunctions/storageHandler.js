function saveTeamToStorage(team) {
  localStorage.setItem("mainTeam", JSON.stringify(team));
}

function deleteTeamFromStorage() {
  localStorage.removeItem("mainTeam");
}

function fetchFromStorage() {
  let team = JSON.parse(localStorage.getItem("mainTeam")) || undefined;
  return team;
}

export { saveTeamToStorage, deleteTeamFromStorage, fetchFromStorage };
