<template>
    <div class="cat-filter-section">
        <div class="cat-filter">
            <!-- <h3>{{categoriesNested.name}}</h3> -->
            <ul>
                <li class="cat-filter-title">
                    {{ categoriesNested.name }}
                </li>
                <el-checkbox-group v-model="checkList"
                v-for="filters in categoriesNested.list_filter"
                :key="filters.id"
                >
                   <label class="cat-filter-check">
                       <span>{{filters.name}}</span>
                    </label>
                    <el-checkbox
                    v-for="checkbox in filters.chice"
                    :key="checkbox.id"
                    :label="checkbox.id"
                    @change="checkFil()"
                    >{{checkbox.value}}
                    </el-checkbox>
                </el-checkbox-group>

                <el-checkbox-group v-model="checkListManuf">
                    <label class="cat-filter-check">
                       <span>Производители</span>
                    </label>
                    <el-checkbox
                    v-for="checkbox in categoryManuf.results"
                    :key="checkbox.id"
                    :label="checkbox.id"
                    @change="filterByManufacturer"
                    >{{checkbox.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  props:['categoriesNested','categoryManuf'],
    created() {

    },
    data() {
        return {

            //categoriesNested:[]
            checkList:[],
            checkFilId:[],
            checkListManuf:[],
        };
    },
    computed:{
        ...mapGetters({
           // categoriesNested: 'category/categoryNested',
            //categoryManuf: 'category/categoryManuf',
        })
    },
    async mounted(){
      if(this.$route.query.manuf!==undefined) {
        this.checkListManuf = JSON.parse(decodeURI(this.$route.query.manuf))
      }
      if(this.$route.query.card_filter!==undefined) {
        this.checkList = JSON.parse(decodeURI(this.$route.query.card_filter))
      }
    },
  watch:{
      $route (to, from){
        if(to.query.manuf!==undefined) {
        this.checkListManuf = JSON.parse(decodeURI(to.query.manuf))
      }else{
        this.checkListManuf = []
        }
      if(to.query.card_filter!==undefined) {
        this.checkList = JSON.parse(decodeURI(to.query.card_filter))
      }else{
        this.checkList = []
      }
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
            this.$addQuery('page',1,this.$route,this.$route.params.catalog);
          }catch (e){

          }
        }
          if(this.checkList.length){
              this.$addQuery('card_filter',JSON.stringify(this.checkList),this.$route,this.$route.params.catalog);
          }else{
               this.$delQuery('card_filter',this.$route.params.catalog);
          }
          setTimeout(this.updateData,100)
        },
        filterByManufacturer(){
        if(this.$route.query.page!=1){
          try{
            this.$addQuery('page',1,this.$route,this.$route.params.catalog);
          }catch (e){

          }
        }
          if(this.checkListManuf.length){
              this.$addQuery('manuf',JSON.stringify(this.checkListManuf),this.$route,this.$route.params.catalog);
          }else{
               this.$delQuery('manuf',this.$route.params.catalog);
          }
          setTimeout(this.updateData,100)
      },
        toggleActive(idx) {
            if (this.show.includes(idx)) {
                this.show = this.show.filter(entry => entry !== idx);
                return;
            }else{
                //this.show =[]
            }
            this.show.push(idx);
        },
    },
}
</script>
