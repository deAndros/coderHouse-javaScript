function saveTeam(team) {
  localStorage.setItem("mainTeam", JSON.stringify(team));
}

export { saveTeam };
