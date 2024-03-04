import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { dirname, join } from 'path'
import  { fileURLToPath } from 'url'

import { PORT } from './config.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const server = http.createServer(app)

const io = new SocketServer(server)

io.on('connection', socket => {
    console.log('User connected' )
    
    socket.on('message', (body) => {
        console.log(body);
        //store message in database

        //send message to all clientes
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6)
        })
    })
})

app.use(express.static(join(__dirname, '../fronted/dist')))

server.listen(PORT)
console.log('Server on por', PORT);