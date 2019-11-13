// addng new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;

    }
    //format chat object
    async addChat(message){
        const now = new Date()
        const chat = {
            message,
            username:this.username,
            room:this.room,
            created_at:firebase.firestore.Timestamp.fromDate(now)
        }

        // save the chat
        const response = await this.chats.add(chat)
        console.log(response)
        return response;
    }

    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshoot=>{
                snapshoot.docChanges().forEach(change=>{
                    if(change.type==='added'){
                        //update ui

                        callback(change.doc.data())
                    }
                })
            })
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username)

    }
    updateRoom(room){
        this.room = room;
        console.log('room updated')
        if(this.unsub){
            this.unsub();
        }
    }


}

