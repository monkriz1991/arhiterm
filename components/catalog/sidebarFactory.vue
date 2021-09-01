<template>
<div class="cat-filter-section">
        <div class="cat-filter">
            <div class=" cat-filter-img">
              <el-image :src="categoriesNested.img"></el-image>
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
                    v-for="(checkbox,idx) in category.chice"
                    :key="idx"
                    :label="`${checkbox.id}||${category.id}`"
                    v-show="idx<=6&&adaptivSidebar==true  || adaptivSidebar==false"
                    @change="checkFil()"
                    >{{checkbox.value}}
                    </el-checkbox>
                      <el-popover
                        placement="right"
                        popper-class="popover-filter"
                        trigger="click"
                        v-if="category.chice.length>7&&adaptivSidebar==true"
                        >
                          <div class="cat-filter cat-filter-all">
                            <el-checkbox
                            v-model="checkList"
                            v-for="(checkbox,idx) in category.chice"
                            :key="idx"
                            :label="`${checkbox.id}||${category.id}`"
                            v-show="idx>6"
                            @change="checkFil()"
                            >{{checkbox.value}}
                            </el-checkbox>
                          </div>
                        <el-button slot="reference" 
                        icon="el-icon-arrow-right"
                        >
                        Показать больше</el-button>
                      </el-popover>

            </ul>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  //name: "sidebarFactory",
  props:['categoriesNested','adaptivSidebar'],
  data(){
    return{
      checkList:[],
      checkFilId:[],
      checkListManuf:[],
    }
  },
  computed:{
        // ...mapGetters({
        //   categoriesNested: 'category/categoryNestedFactory',
        // })
    },
  beforeRouteUpdate(to,from,next){

  },
   watch:{
      $route (to, from){
      //console.log(this.checkList,'mount')
      if(to.query.card_filter!==undefined) {
        this.checkList = JSON.parse(decodeURI(to.query.card_filter))
      }else{
        this.checkList = []
      }
      this.updateData()
      }
  },
   async mounted(){
     console.log(this.categoriesNested)
      if(this.$route.query.card_filter!==undefined) {
        this.checkList = JSON.parse(decodeURI(this.$route.query.card_filter))
      }else{
        this.checkList = []
      }
    },
  methods:{
      updateData(){
            setTimeout(this.sendUpdate(),100);
      },
      sendUpdate(){
        this.$emit('updateData')
      },
        checkFil(){
          if(this.$route.query.page!=1){
          try{
            this.$addQueryFactory('page',1,this.$route,this.$route.params.id);
          }catch (e){

          }
        }
          if(this.checkList.length){
              this.addParam('card_filter',JSON.stringify(this.checkList));
          }else{
               this.delParam('card_filter');
          }
        },
    addParam(key,val){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        params[key] = val;
        this.setUrl(params)
    },
    delParam(key){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        delete params[key];
        this.setUrl(params)
    },
    setUrl(params){
        this.$router.replace({path:'/catalog/factory/'+this.$route.params.id,'query':params});
    }
  },
}
</script>

<style>

</style>
