const { Socket, getClientsWatchingId } = require('./sockets');

module.exports = (app) => {
    app.route('/testing')
    .get(
        (req, res) => {
            const message = req.query.message || 'Hola mundo';
            const id = req.query.id || null;

            console.log(req.query);
            
            if(id){
                console.log('Searching for watchers...')
                const watchers = getClientsWatchingId(id);

                console.log(watchers);
                watchers.forEach(w => {
                    Socket.emitSpecific(w.SocketId, 'test', { message: `Message to ${w.id} (${w.SocketId}) connected on ${w.connectedSince}` });
                });

            }else{
                Socket.emit('test', {
                    message: message
                });
            }

            console.log('request');
            res.json({
                ok: 'Hola!',
                message: message
            });
        }
    )
};