<template>
    <div class="cab-user-colaps">

        <el-collapse accordion>
            <el-collapse-item name="idx">
                <template slot="title">
                <div class="cab-block-basket-templ">
                    <div class="basket-templ-status">
                        <span>{{status}}</span>
                    </div>
                    <span hidden>Позиций:<strong>{{basket_for!==undefined?basket_for.length:0}}</strong></span>
                </div>
                <div class="cab-block-basket-templ">
                    <span>Итого:
                        <strong>{{allCost}}<span>руб.</span></strong>
                    </span>
                  <span class="cab-block-basket-data"> {{ '   ' + new Date(basket_for.date_upd).toLocaleString('ru')}}</span>
                </div>
                </template>
                <div
                v-for="(item,idx) in basket_for.cart_prodicts" :key="idx"
                >
                <div class="cab-block-basket">
                    <div class="cab-block-basket-img">
                        <img :src="baseUrl()+item.card_data.img">
                    </div>
                    <div class="cab-block-basket-left">
                        <strong>{{item.card_data.name}}</strong>
                        <div class="basket-left-item">
                            <span hidden>
                                <strong>{{item.count}}<span> - едениц кратно упаковке</span>
                                </strong>
                            </span>
                            <span><span>Стоимость:</span>
                            <strong>{{item.price}}<span>руб.</span></strong></span>
                        </div>
                        <div class="basket-left-item">
                            <span>{{item.product_data.name}}</span><b>/</b>
                            <span>на складе {{item.product_data.count}}</span>
                            <div class="cost-product-char">
                                <p
                                    v-for="(i,k) in item.product_data.filter_dict" :key="k"
                                >
                                    <strong>{{i.name}}</strong>
                                    <span>{{i.value}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    props:['basket_for'],
    data() {
        return{
          status:'не закрыта',
            allCost:0
        }
    },
    beforeMount(){
        this.amount()
    },
    components:{
    },
    computed:{
        ...mapGetters({
            basket:'main/basket',
            allBaskets:'main/allBaskets',
        })
    },
  watch:{
    allBaskets(){
      this.amount()
    }
  },
    methods:{
        amount(){
          this.allCost = 0;
          console.log(this.basket_for)
          if(!this.basket_for.closed){
            this.status = "в обработке"
          }else{
            this.status = "готово"
          }
            for(let i of this.basket_for.cart_prodicts){
                this.allCost += i.sum_price-0
            }
            this.allCost = Math.floor(this.allCost*100)/100
        },
        baseUrl(){
          return this.$axios.defaults.baseURL
        }
    }

}
</script>

<style>

</style>
