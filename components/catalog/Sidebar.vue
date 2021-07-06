<template>
    <div class="cat-filter-section">
        <div class="cat-filter">
            <!-- <h3>{{categoriesNested.name}}</h3> -->
            <ul
            v-for="category in categoriesNested.child"
            :key="category.id"
            >
                <li class="cat-filter-title">
                    {{ category.name }}
                </li>
                <el-checkbox-group v-model="checkList"
                v-for="filters in category.filters"
                :key="filters.id"
                >
                   <label class="cat-filter-check">
                       <span>{{filters.name}}</span>
                    </label>
                      <el-collapse-transition>
                        <div v-show="show.includes(filters.id)">
                          <el-checkbox
                          v-for="checkbox in filters.filter_value"
                          :key="checkbox.id"
                          :label="checkbox.id"
                          @change="checkFil()"
                          >{{checkbox.value}}
                          </el-checkbox>
                        </div>
                      </el-collapse-transition>
                    <el-button
                    v-show="buttonDown"
                    @click="toggleActive(filters.id)" type="text"
                    icon="el-icon-arrow-down"></el-button>
                </el-checkbox-group>
                
                <el-checkbox-group v-model="checkListManuf">
                    <label class="cat-filter-check">
                       <span>Производители</span>
                    </label>
                    <el-collapse-transition>
                        <div v-show="show.includes('manuf')">
                          <el-checkbox
                          v-for="checkbox in categoryManuf.results"
                          :key="checkbox.id"
                          :label="checkbox.id"
                          @change="filterByManufacturer"
                          >{{checkbox.name}}
                          </el-checkbox>
                        </div>
                      </el-collapse-transition>
                    <el-button 
                    v-show="buttonDown"
                    @click="toggleActive('manuf')" type="text"
                    icon="el-icon-arrow-down"></el-button>
                </el-checkbox-group>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    created() {
      //this.showArr()
      if (process.browser){
        
        if(window.innerWidth>991){
            
        }else{
          
        }
      
      }
      
    },
    data() {
        return {
            //categoriesNested:[]
            checkList:[],
            checkFilId:[],
            checkListManuf:[],
            show: [],
            width:0,
            buttonDown:false
        };
    },
    computed:{
        ...mapGetters({
            categoriesNested: 'category/categoryNested',
            categoryManuf: 'category/categoryManuf',
        })
    },
    async mounted(){
      if(this.$route.query.manuf!==undefined) {
        this.checkListManuf = JSON.parse(decodeURI(this.$route.query.manuf))
      }
      if(this.$route.query.card_filter!==undefined) {
        this.checkList = JSON.parse(decodeURI(this.$route.query.card_filter))
      }
      if (process.browser){
        window.addEventListener('resize', this.updateWidth);

        this.updateWidth()
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
        updateWidth() {
          this.width = window.innerWidth;
          if(this.width<=991){
            this.show = []
            this.buttonDown = true 
          }else{
            this.showArr()
          }
        },
        showArr(){
          for(let i in this.categoriesNested.child[0].filters){
              this.show[i] = this.categoriesNested.child[0].filters[i].id;   
          }
          this.show.push('manuf');    
          this.buttonDown = false    
        }
    },
}
</script>
