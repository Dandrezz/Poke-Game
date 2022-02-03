<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonPicture 
      :pokemon-id="pokemon.id" 
      :show-pokemon="showPokemon"/>
    <PokemonOptions 
      :pokemons="pokemonArr"
      @selection="checkAnswer"/>

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button
        class="btn-success"
        @click="newGame">
        Siguiente
      </button>
    </template>
    <template v-else>
      <h2 class="correcto" v-if="countRightAnswers!==0">{{ messageRightAnswers }}</h2>
    </template>
    
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";

import { loadPokemons, getPokemonOptions } from '@/helpers/getOptionPokemons2';

export default {
  components: { PokemonPicture, PokemonOptions },
  data(){
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      mesage: '',
      countRightAnswers: 0,
      messageRightAnswers: ''
    }
  },
  methods: {
    async loadPokemonsPage() {

      await loadPokemons()
      this.mixPokemonsArray()
    },
    async mixPokemonsArray() {

      this.pokemonArr = await getPokemonOptions()

      const rndInt = Math.floor( Math.random() * 4 )

      this.pokemon = this.pokemonArr[ rndInt ]

    },
    checkAnswer( selectedId ) {

      this.showPokemon = true
      this.showAnswer = true

      if( selectedId === this.pokemon.id ){
        this.message = `Correcto, ${ this.pokemon.name }`
        this.countRightAnswers += 1;
        this.messageRightAnswers = `${ this.countRightAnswers } ${this.countRightAnswers===1 ? 'correcta' : 'correctas seguidas' }`
      } else {
        this.message = `Oops, era ${ this.pokemon.name }`
        this.countRightAnswers = 0;
        this.messageRightAnswers = ''
      }
      
    },
    async newGame() {

      this.showPokemon = false
      this.showAnswer = false
      this.pokemonArr = []
      this.pokemon = null

      this.mixPokemonsArray()

    }
  },
  mounted() {

    this.loadPokemonsPage()

  }
};

</script>

<style scoped>
  .correcto{
    color: #28a745;
  }


</style>
