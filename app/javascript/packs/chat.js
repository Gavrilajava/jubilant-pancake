const BASE_URL = "localhost:3000"


document.addEventListener("DOMContentLoaded", () => {
  setInterval(loadAll(), 5000);
})

function loadAll() {
  loadMessages()
  loadChannels()
}