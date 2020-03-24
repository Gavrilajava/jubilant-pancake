const BASE_URL = window.location.href 
let last_message_id = 0

document.addEventListener("DOMContentLoaded", () => {
  setInterval(loadAll(), 5000);
})

function loadAll() {
  fetch(BASE_URL+'/'+last_message_id)
    .then(resp => resp.json())
    .then(json => {
      loadMessages(json)
      loadChannels(json)
    })
}
























































































let loadChannels(json)