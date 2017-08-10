'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'network'
});
connection.connect();
server.connection({
    host: '0.0.0.0',
    port: 8000,
    routes: {
        cors: true
    }
});

// Add the route
server.route({
    method: 'POST',
    path: '/add',
    handler: function(request, reply) {
        var payload = request.payload
        connection.query("INSERT INTO address(name,mac,valid) VALUES('" + payload.name + "','" + payload.mac + "',0)", function(error, results, fields) {
            if (error) throw error;
            //console.log('The solution is: ', results[0].solution);
        });

        return reply(payload);
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});