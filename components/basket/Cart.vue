<template>
    <div>
        <div 
        class="basket-tov"
        v-for="(item,idx) in cart_data" :key="idx"
        >
            <div class="basket-tov-img">
                <img :src="item.img">
            </div>
            <div class="basket-tov-desk">
                <div class="basket-tov-desk-left">
                    <strong>{{item.name}}</strong>
                    <div class="basket-tov-desk-kod">
                        <strong>Код товара</strong>
                        <span>{{item.product[0].name}}</span>
                    </div>
                    <div class="basket-tov-desk-type">
                        <strong>Диаметр мм.</strong>
                        <span>16<span></span></span>
                    </div>
                </div>
                <div class="basket-tov-cost">
                    <strong>{{item.product[0].price}}</strong>
                    <span>руб.</span>
                </div>
                <div class="basket-tov-calc">
                    <el-input-number size="mini" 
                    v-model="item.count_el"
                    ></el-input-number>
                </div>
                <div class="basket-tov-summ">
                    <strong>{{item.cost}}</strong>
                    <span>руб.</span>
                </div>
                <div class="basket-tov-dell">
                    <i
                    @click="cartDell(idx)" 
                    class="el-icon-delete"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:['cart_data'],
    data() {
        return{
            num4:1,
        }
    },
    methods:{
        cartDell(idx){
            this.$emit('cartDell',idx)
        }
    }
}
</script>
