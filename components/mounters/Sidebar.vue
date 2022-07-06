<template>
    <div class="mount-filter-section cat-filter">
            <ul>
                <h1 class="cat-filter-title">
                    Монтажники
                </h1>
                <el-checkbox-group v-model="checkList"
                >
                   <label class="cat-filter-check">
                       <span>Специализация</span>
                    </label>
                    <el-checkbox v-for="(v,k) in tags" :key="k"
                    :label="v.id"
                    @change="checkFil()"
                    >{{v.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            checkList:[],
            tags:[],
        }
    },
    methods:{
      async getTags(){
          let data = await this.$axios.get(`mounters/all_tags/?limit=9999999`);
          this.tags = data.data.results;
      },
        checkFil(){
        this.addOnlyParam('page',1);
        setTimeout(this.updateData,100);
               if(this.checkList.length){
              this.addParam('tags',JSON.stringify(this.checkList));
          }else{
               this.delParam('tags');
          }

               setTimeout(this.updateData,100);
        },
      updateData(){
          this.$emit('updateData')
      },
      addParam(key,val){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        params[key] = val;
        this.setUrl(params)
    },
      addOnlyParam(key,val){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        params[key] = val;
        this.$route.query[key] = val ;
    },
    delParam(key){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        delete params[key];
        this.setUrl(params)
    },
    setUrl(params){
          this.$router.replace({path:'/mounters/','query':params}).catch(f=>console.log("erorr repalce"));
    },
      checkCheckers(){
        let params = JSON.parse(JSON.stringify(this.$route.query));
        if(params.tags!==undefined){
          this.checkList = JSON.parse(params.tags);
        }
      }
    },
  mounted() {
      this.getTags();
      this.checkCheckers();
  }
}
</script>
<style>
.mount-filter-section{

}
.mount-filter-section ul{
    margin: 0;
    padding: 0;
    float: left;
    width: 100%;
}
.mount-filter-section ul>li{
    list-style:none ;
}
.mount-filter-section .cat-filter-check{
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
}
</style>
