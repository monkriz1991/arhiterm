<template>
  <div>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      class="question-text"
      v-for="(item,idx) in manufacturer.results"
      :key="idx"
      :title="item.name" :name="idx">
      <div
      v-for="(itemImg,idx) in item.docs_factories"
      :key="idx"
      >
        <div class="sertif-block">
          <el-image 
              :src="itemImg.doc" 
              @click="onClick(itemImg)"
              :preview-src-list="srcList">
          </el-image>
          <el-button 
          class="sertif-download"
          size="mini"
          circle
          icon="el-icon-download"
          @click="downloadWithAxios(itemImg.doc)"></el-button>
        </div>
      </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  mounted(){
    this.imgGalery()
  },
  data() {
    return {
        srcList:[],
        activeName:'',
    }
  },
  computed:{
    ...mapGetters({
        manufacturer: 'category/manufacturer',
    })
  },
  components:{

  },
  methods:{
    imgGalery(){
        for (let i in this.manufacturer.results) {
            for(let ins in this.manufacturer.results[i].docs_factories){
                this.srcList.push(this.manufacturer.results[i].docs_factories[ins].doc)
            }               
        }     
             console.log(this.srcList)
    },
    forceFileDownload(response){
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'certificate.jpg') //or any other extension
        document.body.appendChild(link)
        link.click()
    },           
    downloadWithAxios(url){
      this.$axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer'
      })
      .then(response => {
        this.forceFileDownload(response)
      })
      .catch(()=> console.log('response'))
    },
    onClick(arr){
        this.srcList = []
        this.srcList.push(arr.doc)
    }
  },

}
</script>
<style>

</style>
