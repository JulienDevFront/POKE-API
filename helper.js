module.exports.success = (message, data) => {
    return { message, data }
};

module.exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(i => i.id);
    const maxId = pokemonsIds.reduce((a,b) => Math.max(a,b));
    const uniqueId = maxId + 1;
    return uniqueId;
};