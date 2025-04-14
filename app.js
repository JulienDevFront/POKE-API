const express = require("express");
const morgan = require('morgan');
const favicon = require('serve-favicon');
const { pokemonsAPI } = require("./pokemons.js");
const { success } = require("./helper.js");

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'));

app.get('/', (req,res) => res.send("Hello , Express ! 👋"));

app.get('/api/pokemons', (req, res) => {
    const message = `${pokemonsAPI.length} ${pokemonsAPI.length > 1 ? 'pokémons' : 'pokémon'} on bien été trouvé`
    res.json(success(message, pokemonsAPI))
})
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemonsAPI.find(pokemon => pokemon.id === id);
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon));
});


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));