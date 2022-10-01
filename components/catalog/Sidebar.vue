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
                :key="checkbox.id"
                :label="`${checkbox.kirilica}`"
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
                      :key="checkbox.id"
                      :label="`${checkbox.kirilica}`"
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
                    :key="checkbox.id"
                    :label="checkbox.kirilica"
                    v-show="idx<=5&&adaptivSidebar==true  || adaptivSidebar==false"
                    @change="filterByManufacturer()"
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
                            :key="checkbox.id"
                            :label="checkbox.kirilica"
                            v-show="idx>5&&adaptivSidebar==true"
                            @change="filterByManufacturer()"
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
          checkList:this.$store.state.product.tabs.card_filter!=undefined?this.$store.state.product.tabs.card_filter!=0?this.$store.state.product.tabs.card_filter:[]:[],
          checkFilId:[],
          checkListManuf:[],
          visibleCheck:[],
          FilterItem:[],
          ManufItem:[],
          isDisabled:false
      };
    },
    computed:{
      ...mapGetters({
          tabsArr:'product/tabs'
      }),
    },
    mounted(){
      this.handler()
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
          this.FilterItem = []
        }
        if(this.tabsArr.manuf!=undefined){
          this.checkListManuf = this.tabsArr.manuf
          this.ManufItem = this.checkListManuf.join(',')
        }else{
          this.checkListManuf = []
          this.ManufItem = []
        }
      },
      updateData(){
        setTimeout(() => {
            this.isDisabled = false
          }, 400);
        },
        checkFil(){
          this.isDisabled = true
          if(this.$route.query.page!=1 && this.$route.query.page!=undefined){
            this.$addQuery('page',undefined,this.$route,this.$route.params.catalog);
          }
          
          if(this.checkList.length){
            this.checkList = this.checkList.join(',')
            this.FilterItem = this.checkList
            this.checkFilRoute(this.checkList,this.ManufItem)
          }else{
            this.FilterItem = undefined
            this.checkFilRoute(undefined,this.ManufItem)
          }
          setTimeout(this.updateData,100)
        },
        filterByManufacturer(){
          this.isDisabled = true
          if(this.$route.query.page!=1 && this.$route.query.page!=undefined){
            this.$addQuery('page',undefined,this.$route,this.$route.params.catalog);
          }

          if(this.checkListManuf.length){
            this.checkListManuf = this.checkListManuf.join(',')
            this.ManufItem = this.checkListManuf
            this.checkFilRoute(this.FilterItem,this.ManufItem)
          }else{
            this.ManufItem = undefined
            this.checkFilRoute(this.FilterItem,this.ManufItem)
          }
          setTimeout(this.updateData,100)
      },
      checkFilRoute(FilterItem,ManufItem){
        this.$router.replace({ name: "catalog-catalog", params: {catalog:this.$route.params.catalog}, query: {card_filter:FilterItem,manuf:ManufItem} })
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
        return arrays.slice().sort(function(a, b) {
          return a.position - b.position;
        });
      }
    },
}
</script>
