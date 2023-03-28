<template>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Id
        </th>
        <th scope="col" class="px-6 py-3">
          Image
        </th>
        <th scope="col" class="px-6 py-3">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
          Type 1
        </th>
        <th scope="col" class="px-6 py-3">
          Type 2
        </th>
      </tr>
      </thead>
      <tbody v-if="Object.keys(data).length>0">
      <tr v-for=" (pokemon,key) in data" v-bind:key="key" v-on:click="openDetail(pokemon.id)"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 group hover:shadow dark:hover:bg-gray-600">
        <th v-for=" (val,key) in pokemon" v-bind:key="key" scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <img v-if="key === 'image_url'" class="w-7 h-7 rounded-full" :src="val" alt="image not found">
          <p v-else>{{ val != 'nan' ? val : '' }}</p>
        </th>
      </tr>
      </tbody>
      <tbody v-else>
      <tr class="px-6 py-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 group hover:shadow dark:hover:bg-gray-600">
        <th colspan="6" class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
          No data available
        </th>
      </tr>
      </tbody>
    </table>
</template>
<script>
export default {
  name: 'table-component',
  components: {},
  props: ["data"],
  data() {
    return {}
  },
  computed: {},
  mounted() {

  },
  methods: {
    openDetail: function(id){
      window.location.href = 'pokemon/'+id;
    }
  }
}
</script>