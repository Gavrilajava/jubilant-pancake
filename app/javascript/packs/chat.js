const BASE_URL = window.location.href 
let last_message_id = 0
const channel_list = document.querySelector("ui.contacts")
const footer = document.querySelector("div#footer_that_needed")
const channelCard = document.querySelector("div.card#card_that_needed")
const chatCard = document.querySelectorAll("div.card")[1]
// channelCard.insertBefore( "fggfgf", footer)
const sendBtn = document.querySelector(".input-group-text.send_btn")
let currentUserId

document.addEventListener("DOMContentLoaded", () => {

  loadAll()
  sendBtn.addEventListener("click", () => {
    params = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        type: "message",
        body: document.querySelector("textarea.form-control.type_msg").value,
        user_id: currentUserId,
        channel_id: getActiveChatId(), 
        user_secret_id: getSecretIdFromUrl(BASE_URL)
      })
    }
    fetch(BASE_URL, params)
      .then(resp => resp.json())
      .then(message => createMessage(message, message.self, getDivFromChannelId(message.channel_id)))
      .then(document.querySelector("textarea.form-control.type_msg").value = "")
    
  })
  // setInterval(loadAll(), 5000);
})

function loadAll() {
  fetch(BASE_URL+'/'+last_message_id)
    .then(resp => resp.json())
    .then(json => {
      currentUserId = json.self.id
      loadChannels(json)
      loadMessages(json)
    })
}


let loadMessages = (json) => {
  // let activeChannel = getActiveChatId()
  // let ourChannel = json.channels.find(jsonChannel => jsonChannel.id == activeChannel)
  json.channels.forEach(ourChannel => ourChannel.messages.forEach(message => createMessage(message, json.self, getDivFromChannelId(ourChannel.id))))
  

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

let createMessage = (message, self, messageContainer) => {
  let divCont = document.createElement("div")
  let divMsgCont = document.createElement("div")
  divMsgCont.innerText = message.body
  let span = document.createElement("span")
  divMsgCont.append(span)
  let imgCont = document.createElement("div")
  let img = document.createElement("img")
  imgCont.className = "img_cont_msg"
  img.className = "rounded-circle user_img_msg"
  img.src = message.icon
  imgCont.append(img)
  if (message.sender === self.name){
    divCont.className = "d-flex justify-content-end mb-4"
    divMsgCont.className = "msg_cotainer_send"
    span.className = "msg_time_send"
    divCont.append(divMsgCont, imgCont)
    span.innerText = `sent at: ${(new Date(message.created)).toLocaleString()}`
  }
  else{
    divCont.className = "d-flex justify-content-start mb-4"
    divMsgCont.className = "msg_cotainer"
    span.className = "msg_time"
    divCont.append(imgCont, divMsgCont)
    span.innerText = `${message.sender} sent at: ${(new Date(message.created)).toLocaleString()}`
  }
  messageContainer.append(divCont)
 }

let loadChannels = (json) => {
    let activeChats = Array.from(channel_list.querySelectorAll("li"))
    json.channels.forEach(channel => {
      let li = activeChats.find(item => item.id == `channel${channel.id}`)
      if (!li){
        displayChannel(channel)
      }
      activeChats = Array.from(channel_list.querySelectorAll("li"))
    })
    activeChats.forEach(li =>{
      let ch_id = li.id.replace('channel','')
      if (!(json.channels.find(chan => chan.id == ch_id))){
        li.remove()
      }
    })
}

let displayChannel = (channel) => {
  const messagesDiv = document.createElement("div")
  messagesDiv.className = "card-body msg_card_body"
  messagesDiv.id = `channel${channel.id}`
  messagesDiv.style.display = "none"
  channelCard.insertBefore(messagesDiv, footer)
  const li = document.createElement("li")
  li.id = `channel${channel.id}`
  li.addEventListener("click", () => setActivechat(li))
  const divCont = document.createElement("div")
  divCont.className = "d-flex bd-highlight"
  const imgCont = document.createElement("div")
  imgCont.className = "img_cont"
  const img = document.createElement("img")
  img.src = channel.image
  img.className = "rounded-circle user_img"
  imgCont.append(img)
  chnlInfo = document.createElement("div")
  chnlInfo.className = "user_info"
  span = document.createElement("span")
  span.innerText = channel.title
  p = document.createElement("p")
  p.innerText = `${channel.owner} created this channel`
  chnlInfo.append(span, p)
  divCont.append(imgCont, chnlInfo)
  li.append(divCont)
  channel_list.append(li)
}


let getActiveChat = () => {
  let activeChat = Array.from(channel_list.querySelectorAll("li")).find(item => item.className == `active`)
  if (!activeChat) {activeChat = channel_list.querySelector("li"); activeChat.className = ""}
  return activeChat
}

let getActiveChatId = () => parseInt(getActiveChat().id.replace('channel',''))
  

let resetActiveChat = () => {
  let activeChat = Array.from(channel_list.querySelectorAll("li")).find(item => item.className == `active`)
  if (!!activeChat) { activeChat.className = ""}
}

let setActivechat = (li) => {
  resetActiveChat()
  li.className = "active"
  let allChats = channelCard.querySelectorAll("div.card-body.msg_card_body")
  allChats.forEach(chatDiv => {
    if (chatDiv.id != li.id){
      chatDiv.style.display = "none"
    }
    else {chatDiv.style.display = ""}
  })
  // Updates the message header to display current channel
  updateMessageHeader(li)
}

let updateMessageHeader = (currentChannelListItem = undefined) => {
  let msgHeader = document.querySelector(".card-header.msg_head")
  let msgHeaderContent = msgHeader.querySelector(".d-flex.bd-highlight")
  let msgHeaderImg = msgHeaderContent.querySelector(".rounded-circle.user_img")
  let msgHeaderChannel = msgHeaderContent.querySelector(".user_info span")

  if(currentChannelListItem == undefined) {
    msgHeaderImg.src = "http://picsum.photos/202"
    msgHeaderChannel.innerText = "Select a Channel"
  }
  else {
    msgHeaderImg.src = currentChannelListItem.querySelector("img").src
    msgHeaderChannel.innerText = currentChannelListItem.querySelector("span").innerText
  }
}

// Run once here to set to defaults
updateMessageHeader()


// Define variable
let actionMenuBtn = document.querySelector("span#action_menu_btn")
let actionMenu = document.querySelector(".action_menu")
let actionMenuItem = actionMenu.querySelector("li")
let toggleInviteBox = () => {
    actionMenu.style.display == "none" ? actionMenu.style.display = "block" : actionMenu.style.display = "none"
}

actionMenuBtn.addEventListener("click", () => {toggleInviteBox()})


let getDivFromChannelId = (id) => Array.from(channelCard.querySelectorAll("div.card-body.msg_card_body")).find(chatDiv => chatDiv.id == `channel${id}`)


let getSecretIdFromUrl = (url) => {
  let arr = url.split('/')
  return arr[arr.length -1]
}