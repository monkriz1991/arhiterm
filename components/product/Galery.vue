<template>
    <div class="galery">
        <Photoswipe>
        <div class="galery-index" :class="{ 'galery-index-one': srcList.length=='' }">
            <nuxt-img 
                provider="twicpics"
                loading="lazy"
                width="400" height="400"
                itemprop="image"
                :src="productItems.img"
                :data-pswp-src="'https://new.arhiterm.by'+productItems.img"
                :alt="productItems.name+' - изображение товара '"
                :title="productItems.name+' - изображение товара '"
            />
            <div class="catalog-list-img-bg"></div>
        </div>
        <div class="galery-extra" :class="{ 'galery-index-one-none': srcList.length=='' }">
            <div 
            v-for="(img,index) in srcList.slice(1)" :key="img.id"
            class="galery-extra-block">
                <nuxt-img 
                provider="twicpics"
                loading="lazy" 
                width="160" height="160"
                :src="img"
                :data-pswp-src="'https://new.arhiterm.by'+img"
                :alt="productItems.name+' - изображение товара '+index"
                :title="productItems.name+' - изображение товара '+index"
                />
                <div class="catalog-list-img-bg"></div>
            <!-- <div class="galery-extra-plus" v-if="index == 1 && srcList.length > 2">
                <strong>{{ srcList.length-2 }}</strong>
                <span>+</span>
            </div> -->
            </div>
        </div>
        </Photoswipe>
    </div>
</template>

<script>
export default {
    props:['productItems'],
    components: {
        
    },
    data() {
        return {
            srcList:[],
        };
    },
    computed:{
    },
    methods:{
        imgGalery(){
            this.srcList = this.productItems.images.map((key)=>key.img);
            this.srcList.unshift(this.productItems.img);
            if(this.srcList.length==1){
                this.srcList = []
            }
        },
    },
    created() {
        this.imgGalery()
    }, 
}
</script>
