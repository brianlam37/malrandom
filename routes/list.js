const { default: Axios } = require('axios');

const listRouter = require('express').Router();
const axios = require('axios');
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

listRouter.get('/random', async (request, response) => {
    axios.get('https://myanimelist.net/mangalist/MonkeyShell/load.json?offset=0&status=6').then(
        res => {
            const random = getRandomInt(res.data.length);
            console.log(random);
            response.send({...res.data[random], number: random+1});
        }
    );
});

listRouter.get('/all', async (request, response) => {
    axios.get('https://myanimelist.net/mangalist/MonkeyShell/load.json?offset=0&status=6').then(
        res => response.send(res.data)
    );
});

listRouter.get('/:id', async (request, response) => {
    axios.get('https://myanimelist.net/mangalist/MonkeyShell/load.json?offset=0&status=6').then(
        res => {
            response.send({...res.data[request.params.id-1], number:request.params.id});
        }
    );
});
module.exports = listRouter;