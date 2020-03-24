const BASE_URL = window.location.href 
let last_message_id = 0
const channel_list = document.querySelector("ui.contacts")

document.addEventListener("DOMContentLoaded", () => {
  setInterval(loadAll(), 5000);
})

function loadAll() {
  fetch(BASE_URL+'/'+last_message_id)
    .then(resp => resp.json())
    .then(json => {
      // loadMessages(json)
      loadChannels(json)
    })
}
























































































let loadChannels = (json) => {
    activeChats = Array.from(channel_list.querySelectorAll("li"))
    json.forEach(channel => {
      let li = activeChats.find(item => item.id == `channel${channel.id}`)
      if (!li){
        displayChannel(channel)
      }
    })
    activeChats.forEach(li =>{
      let ch_id = li.id.replace('channel','')
      if (!(json.find(chan => chan.id == ch_id))){
        li.remove()
      }
    })
}

let displayChannel = (channel) => {
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
  activeChat = Array.from(channel_list.querySelectorAll("li")).find(item => item.className == `active`)
  if (!activeChat) {activeChat = channel_list[0]; activeChat.className = ""}
  return activeChat
}

let resetActiveChat = () => {
  activeChat = Array.from(channel_list.querySelectorAll("li")).find(item => item.className == `active`)
  if (!!activeChat) { activeChat.className = ""}
}

let setActivechat = (li) => {
  resetActiveChat()
  li.className = "active"
}