const express = require("express");
const morgan = require('morgan');
const favicon = require('serve-favicon');
const { pokemonsAPI } = require("./pokemons.js");
const bodyParser = require('body-parser');
const { success, getUniqueId } = require("./helper.js");

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req,res) => res.send("Hello , Express ! 👋"));

app.get('/api/pokemons', (req, res) => {
    const message = `${pokemonsAPI.length} ${pokemonsAPI.length > 1 ? 'pokémons' : 'pokémon'} on bien été trouvé`
    res.json(success(message, pokemonsAPI))
});

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemonsAPI.find(pokemon => pokemon.id === id);
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon));
});

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemonsAPI)
    const createPokemon = {...req.body, ...{id: id, created: new Date()}};
    pokemonsAPI.push(createPokemon);
    const message = `Le pokémon ${createPokemon.name} a bien été crée.`;
    res.json(success(message, createPokemon));
});

app.put("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = pokemonsAPI.findIndex(p => p.id === id);
    if (index === -1) res.status(404).json({ message: "Pokémon non trouvé." });

    const updatedPokemon = { ...pokemonsAPI[index], ...req.body, id: id };
    pokemonsAPI[index] = updatedPokemon;

    const message = `Le pokémon ${updatedPokemon.name} a bien été modifié.`;
    res.json(success(message, updatedPokemon));
});

app.delete("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = pokemonsAPI.findIndex(pokemon => pokemon.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Pokémon non trouvé." });
    }

    const deletedPokemon = pokemonsAPI[index];
    pokemonsAPI.splice(index, 1);

    const message = `Le pokémon ${deletedPokemon.name} a bien été supprimé.`;
    res.json(success(message, deletedPokemon));
});


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));