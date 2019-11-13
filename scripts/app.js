// DOM queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const nameForm = document.querySelector('.new-name')
const updateMssg = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')

//update chat

newChatForm.addEventListener('submiit', e=>{
    e.preventDefault()
    const message = newChatForm.message.value.trim()
    chatroom.addChat(message)
        .then(()=>{
            newChatForm.reset()
        })
        .catch(err=>{
            console.log(err)
        })
})

//update name

nameForm.addEventListener('submit', e=>{
    e.preventDefault()
    //update name via chatroom class

    const newName = nameForm.name.value.trim()
    chatroom.updateName(newName)
    //reset form
    nameForm.reset();
    updateMssg.innerHTML = `your username have been updated to ${newName}`
    setTimeout(()=>updateMssg.innerText='', 3000)
})

//switch rooms

rooms.addEventListener('click', e=>{
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChats(chat=>chatUI.render(chat))
    }
})

//check if username is in local storage

const username = localStorage.username ? localStorage.userName: 'annonymous'


//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render

chatroom.getChats((data)=>{
   chatUI.render(data)
})
