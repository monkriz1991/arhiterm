<template>
    <div class="cat-filter-section">
      <div class="cat-filter">
        <div class=" cat-filter-img">
          <el-image :alt="'Логотип производителя ' + categoriesNested.name" :src="categoriesNested.img"></el-image>
          <h1  class="cat-filter-title">{{categoriesNested.name}}</h1>
        </div>
        <ul
        v-for="(category,idx)  in categoriesNested.filters"
        :key="idx"
        >
          <li class="cat-filter-check">
            <span>{{ category.name }}</span>
          </li>
          <el-checkbox
          v-model="checkList"
          v-for="checkbox in category.chice"
          :key="checkbox.id"
          :label="`${checkbox.kirilica}`"
          @change="checkFil()"
          :disabled="isDisabled"
          >{{checkbox.value}}
          </el-checkbox>
        </ul>
      </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  props:['categoriesNested','adaptivSidebar'],
  data(){
    return{
      checkList:this.$store.state.product.tabs.card_filter!=undefined?this.$store.state.product.tabs.card_filter!=0?this.$store.state.product.tabs.card_filter:[]:[],
      checkFilId:[],
      isDisabled:false,
      checkListString:[],
    }
  },
  computed:{
    ...mapGetters({
      tabsArr:'product/tabs'
    }),    
  },
   watch:{
    $route (to, from){
      this.handler()
    },   
  },
  methods:{
    handler(){
        if(this.tabsArr.card_filter!=undefined){
          this.checkList = this.tabsArr.card_filter
          this.FilterItem = this.checkList.join(',')
        }else{
          this.checkList = []
        }
      },
      updateData(){
        setTimeout(() => {
            this.isDisabled = false
          }, 400);
        },
        checkFil(){
          this.isDisabled = true          
          if(this.checkList.length){
            this.checkList = this.checkList.join(',')
            this.FilterItem = this.checkList
            this.checkFilRoute(this.checkList)
          }else{
            this.FilterItem = undefined
            this.checkFilRoute(undefined)
          }
          setTimeout(this.updateData,100)
        },
      checkFilRoute(FilterItem){
        this.$router.replace({ name: "factory-factory", params: {factory:this.$route.params.factory}, query: {card_filter:FilterItem} })
      },
      even: function(arrays) {
        return arrays.slice().sort(function(a, b) {
          return a.position - b.position;
        });
      }
  },
}
</script>