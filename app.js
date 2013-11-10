var _ = require('underscore'),
    server = require('./server/server'),
    io = require('socket.io').listen(server);
    Ship = require('./server/objects/ship');

/*
 * ships registry { id: Ship }
 */
var ships = {};

io.sockets.on('connection', function(socket) {
    var id = null;

    socket.on('identify', function(data) {
        id = data.id || _.max(_.keys(ships)) + 1;

        var ship = ships[id];

        if (!ship) {
            ship = new Ship(id);
            ships[id] = ship;
        }

        ship.isActive = true;

        socket.emit('register', ship.toClientData());

        socket.broadcast.emit('create', ship.toClientData());

        _.each(ships, function(ship) {
            if (id != ship.id && ship.isActive) {
                socket.emit('create', ship.toClientData());
            }
        });
    });

    socket.on('disconnect', function() {
        if (ships[id]) {
            ships[id].isActive = false;
        }

        socket.broadcast.emit('remove', { id: id });
    });

    socket.on('shift', function(data) {
        socket.broadcast.emit('shift', _.extend(data, { id: id }));
    });

    socket.on('move', function(data) {
        ships[id].move(data.coords);
    });
});