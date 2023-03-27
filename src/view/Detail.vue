<template>
    <div  class="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <PokemonCard :id="$route.params.id"></PokemonCard>
    </div>
</template>
<script>
import PokemonCard from "@/components/PokemonCard.vue";

export default {
  name: 'detail-component',
  components: {PokemonCard},
  props: [],
  data() {
    return {
      pokemon:{}
    }
  },
  computed: {

  },
}
</script>