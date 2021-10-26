const express = require('express')
const server = express();
 
server.all('/', (req, res) => {
    res.send('El bot sigue encendido.');
});
 
module.exports = () => {
    server.listen(8094, () => {
        console.log('Puerto Listo.');
    });
    return true;
}
 
