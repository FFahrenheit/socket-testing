const { Socket } = require('./sockets');

module.exports = (app) => {
    app.route('/testing')
    .get(
        (req, res) => {
            const message = req.query.message || 'Hola mundo';

            console.log(req.query);
            Socket.emit('test', {
                message: message
            });

            console.log('request');
            res.json({
                ok: 'Hola!',
                message: message
            });
        }
    )
};