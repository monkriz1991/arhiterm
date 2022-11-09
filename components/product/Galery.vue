<template>
    <div class="galery">
        <div class="galery-index" :class="{ 'galery-index-one': srcList.length==1 }">
             <el-image 
                :src="'https://new.arhiterm.by'+productItems.img" 
                :alt="productItems.name"
                lazy
                :preview-src-list="srcList">
            </el-image>
        </div>
        <div class="galery-extra" :class="{ 'galery-index-one-none': srcList.length==1 }">
            <div 
            v-for="(img,index) in srcList.slice(1, 3)" :key="img.id"
            class="galery-extra-block">
            <el-image 
                :src="img" 
                lazy
                :alt="productItems.name"
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
export default {
    props:['productItems'],
    data() {
        return {
            srcList:[]
        };
    },
    computed:{
    },
    methods:{
        imgGalery(){
            this.srcList = this.productItems.images.map((key)=>'https://new.arhiterm.by'+key.img);
            this.srcList.unshift('https://new.arhiterm.by'+this.productItems.img);
        },
    },
    created() {
        this.imgGalery()
    }, 
}
</script>