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
                    :key="checkbox.id"
                    :label="`${checkbox.kirilica}`"
                    v-show="idx<=6&&adaptivSidebar==true  || adaptivSidebar==false"
                    @change="checkFil()"
                    :disabled="isDisabled"
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
                            :key="checkbox.id"
                            :label="`${checkbox.kirilica}`"
                            v-show="idx>6"
                            @change="checkFil()"
                            :disabled="isDisabled"
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
      isDisabled:false,
      checkListString:[],
    }
  },
  computed:{
    },
  beforeRouteUpdate(to,from,next){
  },
   watch:{
  },
   async mounted(){
      if(this.$route.query.card_filter!==undefined) {
        this.checkList = JSON.parse(decodeURI(this.$route.query.card_filter))
        this.checkList = this.checkList.split(',')
      }
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
            this.$addQueryFactory('page',undefined,this.$route,this.$route.params.factory);
          }
             this.checkListString = this.checkList
          if(this.checkListString.length){
              this.checkListString = this.checkListString.join(',')
              this.checkListString = JSON.stringify(this.checkListString)
            this.$addQueryFactory('card_filter',this.checkListString,this.$route,this.$route.params.factory);
          }else{
              this.$delQueryFactory('card_filter',this.$route.params.factory);
          }
          setTimeout(this.updateData,100)
        },
  },
}
</script>

<style>

</style>
