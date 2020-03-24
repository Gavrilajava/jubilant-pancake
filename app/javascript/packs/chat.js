const BASE_URL = window.location.href 
let last_message_id = 0

document.addEventListener("DOMContentLoaded", () => {
  fetch(BASE_URL)
  // .then(console.log)
  .then(res => res.json())
  .then(console.log)
  // setInterval(loadAll(), 5000);
})

function loadAll() {
  fetch(BASE_URL+'/'+last_message_id)
    .then(resp => resp.json())
    .then(json => {
      loadMessages(json)
      loadChannels(json)
    })
}
























































































// let loadChannels(json)