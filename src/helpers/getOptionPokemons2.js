import pokemonApi from "../api/pokemonAPI"

let pokemonsStorage = {}

const getPokemons = () => {

    const pokemonsArr = Array.from( Array(648) )
    return pokemonsArr.map( ( _ , index ) => index + 1 )

}

export const loadPokemons = async() => {

    pokemonsStorage = await pokemonApi.get(`?limit=649`)
    
}

export const getPokemonOptions = async() => {

    const mixedPokemons = getPokemons()
                            .sort( () => Math.random() - 0.5 )

    const pokemons = getPokemonNames( mixedPokemons.splice(0,4) )

    return pokemons

}

const getPokemonNames = async ( [a,b,c,d] = [] ) => {

    return[
        { name: pokemonsStorage.data.results[a].name, id: a + 1 },
        { name: pokemonsStorage.data.results[b].name, id: b + 1 },
        { name: pokemonsStorage.data.results[c].name, id: c + 1 },
        { name: pokemonsStorage.data.results[d].name, id: d + 1 },
    ]

}