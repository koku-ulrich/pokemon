<template>
    <div  class="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <PokemonCard :pokemon="pokemon"></PokemonCard>
    </div>
</template>
<script>
import PokemonCard from "@/components/PokemonCard.vue";
import {api} from "@/helpers/http-common";

export default {
  name: 'detail-component',
  components: {PokemonCard},
  data() {
    return {
      pokemon: {}
    }
  },
  beforeMount() {
    this.getPokemonById(this.$route.params.id)
  },
  mounted() {
    this.getPokemonById(this.$route.params.id)
  },
  methods: {
    // function to get pokemon detail by Id
    async getPokemonById(id){
      await api.get("/pokemon/"+id).then(response => {
        this.pokemon =  response.data.pokemon
      }).catch(errors =>{
        // todo: perform errors
        return errors
      })
    }
  }
}
</script>