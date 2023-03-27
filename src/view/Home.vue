<template>
    <div class="container ">
      <div class="text-2xl text-gray-700 font-bold pb-10">
        Welcome !
        <span class="text-gray-500 text-lg">
          To Pokemon search web site
        </span>
      </div>
      <div class="flex items-center justify-between pb-4">
        <div>
          <select class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  v-model="search_type">
            <option value=""><label>Search by type </label></option>
            <option v-for="(type,key) in types" v-bind:key="key" :value="type.name"><span>{{type.name}}</span></option>
          </select>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
            </svg>
          </div>
          <input type="text" id="table-search" v-model="search_text"
                 class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Search by name">
        </div>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table-component :data="pokemon"></table-component>
      </div>
      <div class="flex items-center justify-between pt-5">
        <div class="text-gray-500">
          Show
          <select class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  v-model="show">
            <option value="5"><label>5</label></option>
            <option value="10"><label>10</label></option>
            <option value="15"><label>15</label></option>
          </select>
          Items by page
        </div>
        <ul class="shadow-md inline-flex ">
          <li>
            <a v-on:click="setCurrentPage(1)" href="#" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">First</a>
          </li>
          <li>
            <a v-on:click="previousPage" href="#"
               class="px-3 py-2 border border-gray-300 bg-white  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">Previous</a>
          </li>
          <li v-for=" (page,key) in pagination" v-bind:key="key+page">
            <a v-on:click="setCurrentPage(page)" :class="key === 'current'?' text-blue-600 bg-blue-50':'bg-white'" aria-current="page"
               class="px-3 py-2 border border-gray-300  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" v-text="page"></a>
          </li>

          <li>
            <a v-on:click="nextPage "
               class="px-3 py-2 border border-gray-300 bg-white hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">Next</a>
          </li>
          <li>
            <a v-on:click="setCurrentPage(pages)" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Last</a>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import TableComponent from "@/components/Table.vue";
import {api} from "@/helpers/http-common";

export default {
  name: 'home-view',
  components: {TableComponent},
  props: [

  ],
  data() {
    return {
      pokemon:{},
      types:{},
      show:10,
      pages:1,
      pagination :{
        first : 1,
        current : 2,
        last : 3
      },
      search_text:"",
      search_type:""
    }
  },
  computed: {},
  beforeMount() {
    this.getType()
    this.searchPokemon()
  },
  mounted() {
    this.getType()
    this.searchPokemon()
  },
  methods: {
    previousPage(){
      if(this.pagination.current > 1){
        this.pagination.first-=1
        this.pagination.current-=1
        this.pagination.last-=1
      }
    },
    setCurrentPage(page){
      this.pagination.first= page-1<0 ? 0 : page-1
      this.pagination.current=page <=0 ? 1 : page
      this.pagination.last= page+1 > this.pages ? this.pages : page+1
    },
    nextPage(){
      if(this.pagination.last < this.pages){
        this.pagination.first+=1
        this.pagination.current+=1
        this.pagination.last+=1
      }
    },
    async searchPokemon() {
      let searchData = {}
      if(this.search_text.length>0){
        searchData['name'] = this.search_text
      }
      if(this.search_type.length>0){
        searchData['type'] = this.search_type
      }
      searchData['show'] = this.show
      searchData['page'] = this.pagination.current
      await api.post("/pokemon",searchData).then(response => {
        this.pokemon = response.data.pokemon
        this.pages = response.data.pages
      }).catch(errors =>{
        return errors
      })
    },
    async getType(){
      await api.get("/type").then(response => {
        console.log(response)
        this.types = response.data.types
      }).catch(errors =>{
        return errors
      })
    }
  },
  watch: {
    'pagination.current': function() {
      // If "pageData" ever changes, then we will console log its new value.
      this.searchPokemon()
    },
    search_text: function() {
      // If "pageData" ever changes, then we will console log its new value.
      this.searchPokemon()
    },
    search_type: function() {
      // If "pageData" ever changes, then we will console log its new value.
      this.searchPokemon()
    },
    show: function() {
      // If "pageData" ever changes, then we will console log its new value.
      this.searchPokemon()
    }
  }
}
</script>