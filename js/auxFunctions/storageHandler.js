function saveTeam(team) {
  localStorage.setItem(team, JSON.stringify(team));
}

export { saveTeam };
