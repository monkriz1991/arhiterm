<template>
    <div>
        <div
        class="basket-tov"
        v-for="(item,idx) in cart_data_tov" :key="idx"
        >
            <div class="basket-tov-img">
                <img :src="item.img">
                    <el-popover
                    v-if="item.product[0].count==0"
                    placement="top"
                    width="200"
                    trigger="click"
                    content="Данной позиции нет на складе!">
                    <el-button
                    type="danger"
                    slot="reference"
                    icon="el-icon-warning-outline"
                    size="mini"
                    circle
                    ></el-button>
                    </el-popover>
            </div>
            <div class="basket-tov-desk">
                <div class="basket-tov-desk-left">
                    <strong>{{item.name}}</strong>
                    <div class="basket-tov-desk-kod">
                        <strong>Код товара</strong>
                        <span>{{item.product[0].name}}</span>
                    </div>
                    <div class="basket-tov-desk-type">
                        <strong>{{item.product[0].filter_show_name?item.product[0].filter_show_name:''}}</strong>
                        <span>{{item.product[0].filter_show_value?item.product[0].filter_show_value:''}}<span></span></span>
                    </div>
                </div>
                <div class="basket-tov-cost">
                    <strong>{{item.product[0].price}}</strong>
                    <span>руб.</span>
                        <div class="basket-block-discount">
                            <strong>{{item.product[0].discont}}</strong>
                        </div>
                </div>
                <div class="basket-tov-calc">
                    <el-input-number
                    size="mini"
                    :min="1"
                    v-model="item.product[0].count_el"
                    @change="changeQuantyty(item.id,item.product[0].id,item.product[0].count_el,item.product[0].discont!=null?item.product[0].discont:item.product[0].price)"
                    ></el-input-number>
                </div>
                <div class="basket-tov-summ">
                    <strong>{{item.product[0].cost}}</strong>
                    <span>руб.</span>
                </div>
                <div class="basket-tov-dell">
                    <i
                    @click="cartDell(idx)"
                    class="el-icon-delete"></i>
                </div>
            </div>
        </div>
        <div class="basket-itog">
            <div class="basket-itog-summ">
                <span>Товаров на:</span>
                <strong>{{for_amount}}<span>руб.</span></strong>
            </div>
            <div v-if="for_amount_discount_persent>0" class="basket-itog-summ">
                <span>Скидка:</span>
                <strong>{{for_amount_discount}}<span>руб.</span></strong>
                <strong>{{for_amount_discount_persent}}<span>%</span></strong>
            </div>
            <div class="basket-itog-summ">
                <div v-if="for_amount_none>0" class="basket-itog-summ-none">
                    <span>Сумма заказаных позиций</span>
                    <strong>{{for_amount_none}}<span>руб.</span></strong>
                </div>
                <span
                v-if="for_amount_none===0"
                >Итого:</span>
                <span v-else>Итого с уётом заказных позиций:</span>
                <strong>{{for_amount_itog}}<span>руб.</span></strong>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:['cart_data'],
    data() {
        return{
            for_amount:0,
            for_amount_discount:0,
            for_amount_discount_persent:0,
            for_amount_none:0,
            for_amount_itog:0,
            discount_arr:{
                '100': 2,
                '200': 3,
                '500': 5,
                '1000': 7,
                '2000': 10,
            },
            cost_product:'',

        }
    },
    beforeMount(){
        this.amount()
    },
    mounted(){

    },
    computed:{
      cart_data_tov(){
        this.amount()
        return JSON.parse(JSON.stringify(this.cart_data))
      }
    },
    methods:{
        cartDell(idx){
          this.amount()
            this.$emit('cartDell',idx)
        },
        changeQuantyty(id,id_cart,val,price){
            this.cost_product = Math.floor(price*val*100)/100
            this.$emit('cartUpdate',{'id':id,'id_cart':id_cart,'count_el':val,'cost':this.cost_product})
            this.amount()
        },
        amount(){
            this.for_amount = 0
            this.for_amount_discount_persent = 0
            this.for_amount_none = 0
            for(let i in this.cart_data){
                this.for_amount += this.cart_data[i].product[0].cost
                if(this.cart_data[i].product[0].count===0){
                    this.for_amount_none += this.cart_data[i].product[0].cost
                }
            }
            this.for_amount = Math.floor(this.for_amount*100)/100
            this.for_amount_none = Math.floor(this.for_amount_none*100)/100

          for(let i in this.discount_arr){
              if(this.for_amount>=Number([i])){
                this.for_amount_discount_persent = this.discount_arr[i]
                this.for_amount_discount = this.for_amount*this.for_amount_discount_persent/100
                this.for_amount_discount = Math.floor(this.for_amount_discount*100)/100
               }
          }
          this.for_amount_itog = this.for_amount - this.for_amount_discount
          this.for_amount_itog = Math.floor(this.for_amount_itog*100)/100
        }

    }
}
</script>
<style scoped>
.basket-itog{
    float: left;
    width: 100%;
    margin: 0 0 20px;
}
.basket-itog-summ{
    float: right;
    width: 100%;
    text-align: right;
    margin: 0 0 0px;
}
.basket-itog-summ>span{
    margin: 0 10px 0 0;
    font-size: 13px;
}
.basket-itog-summ>strong{
    font-size: 18px;
}
.basket-itog-summ>strong>span{
    font-size: 12px;
    font-weight: 600;
    margin: 0 0 0 2px;
}
.basket-itog-summ-none{

}
.basket-itog-summ-none>span{
    margin: 0 10px 0 0;
    font-size: 13px;
}
.basket-itog-summ-none>strong{
    font-size: 18px;
}
.basket-itog-summ-none>strong>span{
    font-size: 12px;
    font-weight: 600;
    margin: 0 0 0 2px;
}
.basket-tov-img>span{
    position: absolute;
    left: -10px;
    bottom: -10px;
}
</style>
