<template>
    <div class="catalog-list">
        <el-row :gutter="20">
            <el-col 
            :xs="12" :sm="12" :md="12" :lg="12" :xl="12" 
            v-for="(product,idx) in productsList" :key="idx"
            >
                <div class="catalog-list-block" :class="{ activeImgBlock: show.includes(idx) }">
                    <div class="catalog-list-img" :class="{ activeImgCat: show.includes(idx) }">
                        <el-image
                        :src="product.img"
                        fit="contain"
                        lazy
                        >
                        </el-image>
                        <div class="catalog-list-block-button" :class="{ activeButCat: show.includes(idx) }">
                            <el-button 
                            v-on:click="toggleActive(idx)"
                            type="danger" plain  size="mini" circle
                            >
                                <i class="el-icon-setting"></i>
                            </el-button>
                        </div>
                    </div>
                    <div class="catalog-list-block-desc"> 
                        <nuxt-link :to="`/product/${product.id}`">
                            {{product.name}}
                        </nuxt-link> 
                    <div class="catalog-list-block-price">
                        <strong>315.53</strong>
                         <span>руб/м2</span>
                        <div class="catalog-list-block-cost">
                            <strong>315.53 - 1103.10</strong>
                            <span>руб/м2</span>
                        </div>
                    </div>
                    </div> 
                    <div 
                    v-if="show.includes(idx)"
                    class="catalog-list-input">
                        <CartTovarInput :id_product="product.id" :product="product.product" :n="idx"/>
                        <CartTovarChar/>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import CartTovarInput from '~/components/catalog/CartTovarInput.vue'
import CartTovarChar from '~/components/catalog/CartTovarChar.vue'
export default {
    data() {
        return {
            show:[],
            num: 1,
            radio: '1',
            id_product:0
        };
    },
    components:{
        CartTovarInput,
        CartTovarChar,
    },
    computed:{
        productsList(){
            return this.$store.getters['product/productList']
        }
    },
    async mounted(){
        
    },
    methods : {
        toggleActive(idx) {
            if (this.show.includes(idx)) {
                this.show = this.show.filter(entry => entry !== idx);
                return; 
            }else{
                this.show =[]
            }
            this.show.push(idx);
        },
    }    
}
</script>