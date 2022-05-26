<template>
    <div class="cat-filter-section">
        <div class="cat-filter">
              <h1 class="cat-filter-title">
                  {{ categoriesNested.name }}
              </h1>
            <ul>
                <el-checkbox-group v-model="checkList"
                v-for="filters in categoriesNested.list_filter"
                :key="filters.id"
                >
                   <label class="cat-filter-check">
                       <span>{{filters.name}}</span>
                    </label>
                    <el-checkbox
                    v-for="(checkbox,idx) in even(filters.chice)"
                    :key="idx"
                    :label="`${checkbox.id}||${filters.id}`"
                    v-show="idx<=7&&adaptivSidebar==true  || adaptivSidebar==false"
                    @change="checkFil()"
                    :disabled="isDisabled"
                    >{{checkbox.value}}
                    </el-checkbox>

                      <el-popover
                        placement="right"
                        popper-class="popover-filter"
                        trigger="click"
                        v-if="filters.chice.length>8&&adaptivSidebar==true"
                        v-model="visibleCheck[filters.id]">
                          <div class="cat-filter cat-filter-all">
                            <el-checkbox
                            v-for="(checkbox,idx) in even(filters.chice)"
                            :key="idx"
                            :label="`${checkbox.id}||${filters.id}`"
                            v-show="idx>7"
                            @change="checkFil()"
                            :disabled="isDisabled"
                            >{{checkbox.value}}
                            </el-checkbox>
                          </div>
                        <el-button slot="reference" 
                        icon="el-icon-arrow-right"
                        @click="visibleCheck[filters.id]=!visibleCheck[filters.id]">
                        Показать больше</el-button>
                      </el-popover>

                </el-checkbox-group>

                <el-checkbox-group v-model="checkListManuf">
                    <label class="cat-filter-check">
                       <span>Производители 
                        <span v-if="categoriesNested.id=='1'|| categoriesNested.id=='2'||categoriesNested.id=='3'">/ Серия</span></span>
                    </label>
                    <el-checkbox
                    v-for="(checkbox,idx) in categoryManuf.results"
                    :key="idx"
                    :label="checkbox.id"
                    v-show="idx<=5&&adaptivSidebar==true  || adaptivSidebar==false"
                    @change="filterByManufacturer"
                    :disabled="isDisabled"
                    >{{checkbox.name}}
                    </el-checkbox>

                      <el-popover
                        placement="right"
                        trigger="click"
                        popper-class="popover-filter"
                        v-if="categoryManuf.results.length>6&&adaptivSidebar==true"
                        >
                          <div class="cat-filter cat-filter-all">
                            <el-checkbox
                            v-for="(checkbox,idx) in categoryManuf.results"
                            :key="idx"
                            :label="checkbox.id"
                            v-show="idx>5&&adaptivSidebar==true"
                            @change="filterByManufacturer"
                            :disabled="isDisabled"
                            >{{checkbox.name}}
                            </el-checkbox>
                          </div>
                        <el-button icon="el-icon-arrow-right" slot="reference" >
                        Показать больше</el-button>
                      </el-popover>

                </el-checkbox-group>
            </ul>
        </div>

    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  props:['categoriesNested','categoryManuf','adaptivSidebar'],
    created() {

    },
    data() {
        return {

            //categoriesNested:[]
            checkList:[],
            checkFilId:[],
            checkListManuf:[],
            visibleCheck:[],
            isDisabled:false
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
        setTimeout(() => {
          this.isDisabled = false
        }, 1500);

      },
      sendUpdate(){
        this.$emit('updateData')
      },
        checkFil(){
          this.isDisabled = true
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
          this.isDisabled = true
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
          even: function(arrays) {
            // Set slice() to avoid to generate an infinite loop!
            return arrays.slice().sort(function(a, b) {
              return a.position - b.position;
            });
          }

    },
}
</script>
