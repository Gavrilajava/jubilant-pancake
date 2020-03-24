const BASE_URL = window.location.href 
let last_message_id = 0

document.addEventListener("DOMContentLoaded", () => {
  loadAll()
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


let loadMessages = (json) => {
  console.log(json)
  let channelCard = document.querySelectorAll("div.card")[0]
  let messageCard = document.querySelectorAll("div.card")[1]
  let activeChannel = channelCard.querySelector(".contacts li.active")

  let createMessage = (message) => { }

// Styling when sender is not self
// <div class="d-flex justify-content-start mb-4">
//  <div class="img_cont_msg">
//  <img src="" class="rounded-circle user_img_msg">
//  </div>
//  <div class="msg_cotainer">
//    Hi, how are you samim?
//    <span class="msg_time">8:40 AM, Today</span>
//  </div>
// </div>

// Styling when sender is self
// <div class="d-flex justify-content-end mb-4">
// 	<div class="msg_cotainer_send">
// 		Hi Khalid i am good tnx how about you?
// 		<span class="msg_time_send">8:55 AM, Today</span>
//   </div>
// 	<div class="img_cont_msg">
// 		<img src="http://picsum.photos/200" class="rounded-circle user_img_msg">
// 	</div>
// </div>


}






















































































let loadChannels = (json) => {
}

