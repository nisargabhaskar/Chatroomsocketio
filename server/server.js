const {instrument } = require('@socket.io/admin-ui')
const io =  require("socket.io")(3000,{
    cors:{
        origin:['http://localhost:8080',"https://admin.socket.io"]
    }
})

const userio = io.of('/user')
userio.on('connection',socket => {
    console.log("connected to user namespace")
})

io.on("connection", socket => {
    console.log(socket.id)
    socket.on("send-message",(message,room)=>{
        if (room === '') {
            socket.broadcast.emit('broadcast-message',message)
        }
        else{
            socket.to(room).emit('broadcast-message',message)
        }
        console.log(message)
    })
    socket.on('join-room',(room,cb) => {
        socket.join(room)
        cb(`joined ${room}`)
    })
})

instrument(io,{auth: false})//need to change auth to true