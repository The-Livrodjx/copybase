<template>
  <main>
    <div class="content">
      <div class="image">
        <img src="../assets/logo.png" />
      </div>
      <input
        v-model="query"
        @input="changeInput(query)"
        placeholder="Digite o nome do Pokémon"
      />
    </div>

    <div class="pokemons">
      <div class="pokemon-card" v-for="pokemon in pokemons" :key="pokemon.name">
        <Pokemon
          :name="pokemon.name"
          :image="pokemon.image"
          :habilities="pokemon.habilities"
        />
      </div>
    </div>
  </main>
</template> 

<script>
import api from "../services/api";
import Pokemon from "./PokemonComponent.vue";

export default {
  data() {
    return {
      query: "",
      pokemons: [],
    };
  },
  components: {
    Pokemon,
  },
  methods: {
    changeInput(e) {
      /*
        Caso a busca seja menor que três ou o usuário apague, a lista de pokémons reseta
      */
      if (e.length < 3) {
        this.pokemons = [];
        return;
      }

      // Consulta do pokémon digitado
      api.get(`/pokemon/${e.toLowerCase()}`).then(async (res) => {
        const data = res.data;

        let queryPokemon = data.name;

        // Pega a URL da Evolution Chain
        let evolutionChainURL = (await api.get(`/pokemon-species/${data.id}`))
          .data.evolution_chain.url;

        // Adiciona o nome, foto e habilidades do Pokémon digitado na lista
        this.pokemons.push({
          name: data.name,
          image: data.sprites.front_default,
          habilities: data.stats,
        });

        // Consulta a Evolution Chain
        api.get(evolutionChainURL).then(async (res) => {
          const data = res.data.chain;

          /* 
            Verifica se o primeiro species da API é diferente do Pokémon que o 
            usuário digitou, caso for, ele trará informações desse pokémon e adicionará
            na lista
          */
          if (queryPokemon !== data.species.name) {

            // Pega o ID do pokémon, ex: https://pokeapi.co/api/v2/pokemon-species/172 => 172
            let firstEvolveId = data.species.url.split("species/")[1];
            let firstEvolve = (await api.get(`/pokemon/${firstEvolveId}`)).data;

            this.pokemons.push({
              name: firstEvolve.name,
              image: firstEvolve.sprites.front_default,
              habilities: firstEvolve.stats,
            });
          }
          
          /* 
            Verifica se o species do array evolves_to da API é diferente do Pokémon que o 
            usuário digitou, caso for, ele trará informações desse pokémon e adicionará
            na lista
          */
          if (queryPokemon !== data.evolves_to[0].species.name) {
            let secondEvolveId =
              data.evolves_to[0].species.url.split("species/")[1];
            let secondEvolve = (await api.get(`/pokemon/${secondEvolveId}`))
              .data;

            this.pokemons.push({
              name: secondEvolve.name,
              image: secondEvolve.sprites.front_default,
              habilities: secondEvolve.stats,
            });
          }

          /* 
            Verifica se a species do objeto presente no array evolves_to da API é 
            diferente do Pokémon que o usuário digitou, caso for, ele 
            trará informações desse pokémon e adicionará na lista
          */
          if (queryPokemon !== data.evolves_to[0].evolves_to[0].species.name) {
            let thirdEvolveId =
              data.evolves_to[0].evolves_to[0].species.url.split("species/")[1];
            let thirdEvolve = (await api.get(`/pokemon/${thirdEvolveId}`)).data;
            this.pokemons.push({
              name: thirdEvolve.name,
              image: thirdEvolve.sprites.front_default,
              habilities: thirdEvolve.stats,
            });
          }

          /* 
            Essas condições evitam que o usuário digite um Pokémon e ele se repita na listagem 
            pois também aparece na Evolution Chain

            Exemplo da lista de Pokémons após a Evolution Chain

            this.pokemons = [
              0: {
                name: "pichu",
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
                pokemon/172.png",
                habilities: Array(6)
              },
              1: {
                name: "pikachu",
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
                pokemon/25.png",
                habilities: Array(6)
              },
              2: {
                name: "raichu",
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/
                pokemon/26.png",
                habilities: Array(6)
              }
            ]
          */
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div.image {
      width: 300px;
      margin: 30px 0px;
      overflow-y: hidden;

      img {
        object-fit: cover;
        max-width: 100%;
        overflow-y: hidden;
      }
    }

    input {
      width: 300px;
      padding: 8px 15px;
      border: 1px solid #c5c5c5;
      border-radius: 3px;
    }
  }

  div.pokemons {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    div.pokemon-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: auto;
      margin: 0 20px;
    }
  }

  @media(max-width: 710px) {
    div.content {
      height: 500px;
    }
  }

  @media(max-width: 475px) {
    div.content {
      height: 700px;
    }
  }
}
</style>