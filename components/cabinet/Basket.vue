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
                  <span> {{ '   ' + new Date(basket_for.date_upd).toLocaleString('ru')}}</span>
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
                            <span><strong>{{item.count}}<span> - едениц кратно упаковке</span></strong></span>
                            <span><span>Стоимость:</span>
                            <strong>{{item.price}}<span>руб.</span></strong></span>
                        </div>
                        <div class="basket-left-item">
                            <span>{{item.product_data.name}}</span><b>/</b>
                            <span>на складе {{item.product_data.count}}</span>
                          <br>
                          <el-badge style="margin-left: 40px;" 
                          v-for="(i,k) in item.product_data.filter_dict" 
                          :key="k"  :value="i.value" >
                            <el-button size="small">{{i.name}}</el-button>
                          </el-badge>
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
.cab-user-colaps{
    float: left;
    width: 100%;
}
.cab-block-basket{
    float: left;
    width: 100%;
    margin: 0 0 5px;
}
.cab-block-basket-img{
    float: left;
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.cab-block-basket-img img{
    max-height: 100%;
    max-width: 100%;
}
.cab-block-basket-left{
    margin: 0 0 0 90px;
}
.cab-block-basket-left>strong{
    float: left;
    width: 100%;
    margin: 0 0 5px;
    height: 26px;
    overflow: hidden;
    line-height: 1.2;
    font-weight: 600;
    font-size: 12px;
}
.basket-left-item{
    float: left;
    margin: 0 20px 2px 0;
    font-weight: 500;
    width: 100%;
}
.basket-left-item>span{
    margin: 0 10px 0 0;
}
.basket-left-item>span>strong{
font-size: 13px;
}
.basket-left-item>span>strong>span{
    font-size: 12px;
    margin: 0 0 0 1px;
}
.basket-left-item b{
    font-size: 9px;
    margin: 0 10px 0 0;
    opacity: 0.4;
}
.cab-block-basket-templ{
    float: left;
}
.cab-block-basket-templ>span{
    font-size: 13px;
    margin: 0px 0px 0 0px;
    float: left;
}
.cab-block-basket-templ>span>strong{
    margin: 0 0 0 4px;
    font-size: 15px;
}
.cab-block-basket-templ>span>strong>span{
    font-size: 12px;
    margin: 0 0 0 2px;
}
.basket-templ-status{
    float: left;
    margin: 0 30px 0 0;
}
.basket-templ-status>span{
    float: left;
    margin: 0 30px 0 0;
    padding: 3px 5px;
    border-radius: 3px;
    background: #ff8d2a;
    font-size: 11px;
    color: #fff;
}
</style>
