const express = require('express');

const io = require('./sockets');
const otherRoute = require('./otherRoute');

const port = process.env.PORT || 4000;

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', true);

let server = app.listen(port, () => {
    console.log('Running server on port ' + port);
});

io.attach(server);

otherRoute(app);

app.use((req, res, next) => {
    let ip = req.ip;
    ip = ip.substr(ip.lastIndexOf(':') + 1);
    console.table([{ Timestamp: new Date().toLocaleString(), Method: req.method, Request: req.originalUrl, Client: ip }]);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// let io = socket(server);
// let connectedCount = 0;

// io.on('connection', (socket) => {
//     console.log('New connection: ' + socket.id);
//     connectedCount += 1;
//     io.sockets.emit('connections', connectedCount);

//     //Chat event
//     // socket.on('chat', data => {
//     //     io.sockets.emit('chat', data);
//     // });

//     // socket.on('typing', data => {
//     //     socket.broadcast.emit('typing', data);
//     // });

//     // socket.on('disconnect', () => {
//     //     console.log('DisconnectedCount :(');
//     //     connectedCount -= 1;
//     //     io.sockets.emit('connections', connectedCount);
//     // });
// });