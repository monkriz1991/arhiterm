<template>
    <div class="galery">
        <div class="galery-index">
             <el-image 
                :src="'https://new.arhiterm.by'+productItems.img" 
                :preview-src-list="srcList">
            </el-image>
        </div>
        <div class="galery-extra">
            <div 
            v-for="(img,index) in srcList.slice(1, 3)" :key="img.id"
            class="galery-extra-block">
            <el-image 
                :src="img" 
                :preview-src-list="srcList">
            </el-image>
            <div class="galery-extra-plus" v-if="index == 1 && srcList.length > 3">
                <strong>{{ srcList.length }}</strong>
                <span>+</span>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    async fetch(){
    },
    data() {
        return {
            srcList:[]
        };
    },
    computed:{
        ...mapGetters('tovar',{
            productItems : 'productItem'
        })
    },

    methods:{
        imgGalery(){
            this.srcList = this.productItems.images.map((key)=>'https://new.arhiterm.by'+key.img);
            this.srcList.unshift('https://new.arhiterm.by'+this.productItems.img);
        },
    },
    mounted(){
        this.imgGalery()
    },
    created() {

    },
    
}
</script>