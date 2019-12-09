
const hostname = '127.0.0.1';
const port = 8000;

const server = require('./controller.js');

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});