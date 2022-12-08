<template>
    <div class="galery">
        <Photoswipe>
        <div class="galery-index" :class="{ 'galery-index-one': srcList.length=='' }">
            <img 
                itemprop="image"
                :src="'https://new.arhiterm.by'+productItems.img"
                :data-pswp-src="'https://new.arhiterm.by'+productItems.img"
                :alt="productItems.name"
            />
        </div>
        <div class="galery-extra" :class="{ 'galery-index-one-none': srcList.length=='' }">
            <div 
            v-for="(img,index) in srcList.slice(1)" :key="img.id"
            class="galery-extra-block">
                <img 
                    itemprop="image"
                    :src="img"
                    :data-pswp-src="img"
                    :alt="productItems.name"
                />
            <div class="galery-extra-plus" v-if="index == 1 && srcList.length > 2">
                <strong>{{ srcList.length }}</strong>
                <span>+</span>
            </div>
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
            this.srcList = this.productItems.images.map((key)=>'https://new.arhiterm.by'+key.img);
            this.srcList.unshift('https://new.arhiterm.by'+this.productItems.img);
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
