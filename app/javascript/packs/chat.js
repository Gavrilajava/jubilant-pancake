const BASE_URL = window.location.href 
const IMAGES = [".jpg",".png","jpeg", ".gif"]
let last_message_id = 0
const channel_list = document.querySelector("ui.contacts")
const footer = document.querySelector("div#footer_that_needed")
const channelCard = document.querySelector("div.card#card_that_needed")
const chatCard = document.querySelectorAll("div.card")[1]
const sendBtn = document.querySelector(".input-group-text.send_btn")
const newChannelBtn = document.querySelector("i.fa-plus")
const newChannelName = document.querySelector("input.form-control.search")
let currentUserId
let msgHeader = document.querySelector(".card-header.msg_head")
let msgHeaderContent = msgHeader.querySelector(".d-flex.bd-highlight")
let msgHeaderImg = msgHeaderContent.querySelector(".rounded-circle.user_img")
let msgHeaderChannel = msgHeaderContent.querySelector(".user_info span")
let msgHeaderMsgCount = msgHeaderContent.querySelector(".user_info p")
const message_counter = document.querySelector("p#message_counter")
const newSound = document.querySelector("#messageSound")


document.addEventListener("DOMContentLoaded", () => {

  loadAll()
  sendBtn.addEventListener("click", () => sendMessage())

  window.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
      e.preventDefault()
      sendMessage()
    }
  }, false);

  newChannelBtn.addEventListener("click", () => {
    params = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        type: "channel",
        title: newChannelName.value,
      })
    }
    fetch(BASE_URL, params)
      .then(resp => resp.json())
      .then(newChannelName.value = null)

    
  })
  setInterval(() => loadAll(), 500);
})

let loadAll = () => {
  fetch(BASE_URL+'/'+last_message_id)
    .then(resp => resp.json())
    .then(json => {
      currentUserId = json.self.id
      loadChannels(json)
      loadMessages(json)
      setActiveChat(getActiveChat())
      // playSound(json)
    })
}

let loadMessages = (json) => {
  json.channels.forEach(ourChannel => ourChannel.messages.forEach(message => createMessage(message, json.self, getDivFromChannelId(ourChannel.id))))
}

let playSound = (json) => {
  if (json.channels.some(channel => (channel.id != getActiveChatId() && channel.messages.length > 0))){
    try{
    newSound.play()
    }
    catch {
      console.log("Something happened")
    }
  }
}

let sendMessage = () => {
  if (document.querySelector("textarea.form-control.type_msg").value.length > 0){
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
    document.querySelector("textarea.form-control.type_msg").value = null
    
  }
}


let createMessage = (message, self, messageContainer) => {
  if (!document.getElementById(`message${message.id}`)){
    let divCont = document.createElement("div")
    divCont.id = `message${message.id}`
    let divMsgCont = document.createElement("div")
    divMsgCont.innerHTML = addImageTags(message.body)
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
    if (messageContainer.id == getActiveChat().id){
      messageContainer.scrollTop = messageContainer.scrollHeight
    }
    appendGreenSpan(messageContainer.id)
    last_message_id = message.id
  }
}

let addImageTags = (str) => {
  return str.split(" ").map(word => {
    if (word.substring(0, 4) === "http" && IMAGES.includes(word.substring(word.length-4))){
      word = `<br><img src ="${word}" class="image_msg"><br>`
    }
    return word
  }).join(" ")
}

 let appendGreenSpan = (id) => {
   let channelLine = checkIfItAlreadyThere(id)
   if (!!channelLine){
      let span = document.createElement("span")
      span.className = "online_icon"
      channelLine.append(span)
   }
 }

 let checkIfItAlreadyThere = (id) => {
   let li = channel_list.querySelector(`li#${id}`)
   if (li.querySelector("span.online_icon")){
     return null
   }
   else {
     return li.querySelector("div.img_cont")
   }
 }

 let deleteGreenSpan = (li) => {
   let span = li.querySelector("span.online_icon")
    if (!!span) {
      span.remove()
    }
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

  li.addEventListener("click", () => {setActiveChat(li); actionMenu.style.display = "none";})

  const divCont = document.createElement("div")
  divCont.className = "d-flex bd-highlight"
  const imgCont = document.createElement("div")
  imgCont.className = "img_cont"
  const img = document.createElement("img")
  img.src = channel.image
  img.id = channel.owner_id
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
//
  let nonMembers = document.querySelector(`#channel_${channel.id}_nonmembers`)
  if(nonMembers == undefined){
    nonMembers = document.createElement("p")
    nonMembers.style.display = "none"
    nonMembers.id = `#channel_${channel.id}_nonmembers`
    li.append(nonMembers)
  }
  if (nonMembers.innerText != channel.nonMembers){
    nonMembers.innerText = channel.nonMembers
  }
// 
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

let setActiveChat = (li) => {
  resetActiveChat()
  li.className = "active"
  deleteGreenSpan(li)
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

let updateMessageHeader = (currentChannelListItem) => {

  if(currentChannelListItem == undefined) {
    msgHeaderImg.src = "http://picsum.photos/202"
    msgHeaderChannel.innerText = "Select a Channel"
  }
  else {
    msgHeaderImg.src = currentChannelListItem.querySelector("img").src
    msgHeaderChannel.innerText = currentChannelListItem.querySelector("span").innerText
    let activeChannelId = getActiveChat().id
    let activeMsgBody = document.querySelectorAll(`#${activeChannelId}.card-body.msg_card_body`)
    let messageCount = activeMsgBody[0].childElementCount
    msgHeaderMsgCount.innerText = `${messageCount} messages`
    message_counter.innerText = `${countMessages(currentChannelListItem.id)} Messages`
    if (currentUserId == currentChannelListItem.querySelector("img").id){
      actionMenuBtn.style.display = "block"
    }
    else{
      actionMenuBtn.style.display = "none"
    }
  }
}

let countMessages = (channel_id) => {
  let chan = channelCard.querySelector(`#${channel_id}`)
  return chan.querySelectorAll("div.d-flex.mb-4").length
}




// Select action menu elements
let actionMenuBtn = document.querySelector("span#action_menu_btn")
let actionMenu = document.querySelector(".action_menu")
let actionMenuItem = actionMenu.querySelector("li")

let toggleInviteBox = () => {
    actionMenu.style.display == "block" ? actionMenu.style.display = "none" : actionMenu.style.display = "block"
}

let inviteBtn = document.querySelector("i#invite-user")
let inviteSelect = document.querySelector("#invite-select")
let inviteDataList = document.querySelector("#inviteDataList")

let listChannelUsers = () => {
  let nonMemberString = document.querySelectorAll(".active p")[1].innerText
  let nonMembers = nonMemberString.split(",")
  inviteDataList.innerHTML = ""
  if(nonMembers.length > 1) {
    inviteSelect.placeholder = "Invite a user"
    inviteBtn.style.display = "inline-block"
    nonMembers.forEach(nonMember => {
      let option = document.createElement("option")
      option.value = nonMember
      option.innerText = nonMember
      inviteDataList.append(option)
    })
  }
  else{
    inviteSelect.placeholder = "Everyone is here!"
    inviteBtn.style.display = "none"
  }
}
inviteBtn.addEventListener("click", () => {
  let params = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      type: "invite",
      user: inviteSelect.value,
      channel: getActiveChatId()
    })
  }
  fetch(BASE_URL, params)
    .then(resp => resp.json())
    .then(message => {
      debugger
      createMessage(message, message.self, getDivFromChannelId(getActiveChatId()))
      let options = Array.from(inviteSelect.querySelectorAll("option"))
      let invited = options.find(option => option.value == message.sender)
      let nonMembers = document.querySelectorAll(".active p")[1]
      nonMembers.innerText = message.channel.nonMembers
      listChannelUsers()
      invited.remove()
    })
    inviteSelect.value = ""
    actionMenu.style.display = "none"
})

actionMenuBtn.addEventListener("click", () => {listChannelUsers(); toggleInviteBox(); })

let getDivFromChannelId = (id) => Array.from(channelCard.querySelectorAll("div.card-body.msg_card_body")).find(chatDiv => chatDiv.id == `channel${id}`)


let getSecretIdFromUrl = (url) => {
  let arr = url.split('/')
  return arr[arr.length -1]
}

