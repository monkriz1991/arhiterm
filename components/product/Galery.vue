<template>
    <div class="galery">
        <div class="galery-index">
             <nuxt-picture loading="lazy"
                :src="productItems.img.substring(24)" 
                :preview-src-list="srcList" />

        </div>
        <div class="galery-extra">
            <div 
            v-for="(img,index) in srcList.slice(1, 3)" :key="img.id"
            class="galery-extra-block">
            <nuxt-picture loading="lazy"
                :src="img.substring(24)" 
                :preview-src-list="srcList"/>
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
            this.srcList = this.productItems.images.map((key)=>key.img);
            this.srcList.unshift(this.productItems.img);
        },
    },
    mounted(){
        this.imgGalery()
    },
    created() {

    },
    
}
</script>