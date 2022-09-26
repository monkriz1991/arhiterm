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
                    :key="idx"
                    :label="checkbox.kirilica"
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
                            :label="checkbox.kirilica"
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
            checkList:[],
            checkListString:[],
            checkListStringManuf:[],
            checkFilId:[],
            checkListManuf:[],
            visibleCheck:[],
            isDisabled:false
        };
    },
    computed:{
    },
    async mounted(){
      if(this.$route.query.manuf!==undefined) {
        this.checkListManuf = JSON.parse(decodeURI(this.$route.query.manuf))
        this.checkListManuf = this.checkListManuf.split(',')
      }
      if(this.$route.query.card_filter!==undefined) {
        this.checkList = JSON.parse(decodeURI(this.$route.query.card_filter))
        this.checkList = this.checkList.split(',')
      }
    },
  watch:{
  },
    methods:{
      updateData(){
        setTimeout(this.sendUpdate(),100); 
        setTimeout(() => {
          this.isDisabled = false
        }, 700);

      },
      sendUpdate(){
        this.$emit('updateData')
      },
        checkFil(){
          this.isDisabled = true
          if(this.$route.query.page!=1 && this.$route.query.page!=undefined){
            this.$addQuery('page',undefined,this.$route,this.$route.params.catalog);
          }
             this.checkListString = this.checkList
          if(this.checkListString.length){
              this.checkListString = this.checkListString.join(',')
              this.checkListString = JSON.stringify(this.checkListString)
              //this.checkListString = this.checkListString.slice(1,-1);
            //this.$router.replace({ query: { 'card_filter': this.checkListString } })
            this.$addQuery('card_filter',this.checkListString,this.$route,this.$route.params.catalog);
          }else{
              this.$delQuery('card_filter',this.$route.params.catalog);
          }
          setTimeout(this.updateData,100)
        },

        filterByManufacturer(){
          this.isDisabled = true
        if(this.$route.query.page!=1 && this.$route.query.page!=undefined){
            this.$addQuery('page',undefined,this.$route,this.$route.params.catalog);
        }
        this.checkListStringManuf = this.checkListManuf
          if(this.checkListStringManuf.length){
             this.checkListStringManuf = this.checkListStringManuf.join(',')
             this.checkListStringManuf = JSON.stringify(this.checkListStringManuf)

              this.$addQuery('manuf',this.checkListStringManuf,this.$route,this.$route.params.catalog);
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
