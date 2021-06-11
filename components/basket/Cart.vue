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
                    <el-input-number 
                    size="mini" 
                    :min="1"
                    v-model="item.count_el"
                    @change="changeQuantyty(item.id,item.count_el,item.product[0].price)"
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
            cost_product:''
        }
    },
    methods:{
        cartDell(idx){
            this.$emit('cartDell',idx)
        },
        changeQuantyty(id,val,price){
            this.cost_product = Math.floor(price*val*100)/100
            this.$emit('cartUpdate',{'id':id,'count_el':val,'cost':this.cost_product})
        },
        
    }
}
</script>
