const socket = require('socket.io');
let io;

const Socket = {
    emit: function (event, data) {
        console.log(event, data);
        io.sockets.emit(event, data);
    }
};


exports.io = io;
exports.Socket = Socket;

exports.attach = (app) => {
    io = socket(app);

    const clients = {};

    io.on("connection", (socket) => {
        console.log("User connected - " + socket.id);
        clients[socket.id] = {
            connectedSince: new Date()
        }
        console.log(clients);

        socket.on('hour', data => {
            console.log('la hora es: ');
            console.log(data);
        })
        
    });
}