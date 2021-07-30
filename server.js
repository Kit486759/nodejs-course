const http = require('http');
const port = 3333;

const fs = require('fs')

const routes = require('./routes')

const server = http.createServer(routes)

server.listen(port)