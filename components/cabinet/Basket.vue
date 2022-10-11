<template>
    <div class="cab-user-colaps">
        <div class="basket-templ-status">
            <!-- <el-button 
            class="basket-templ-status-button"
            @click="RepeatOrder(basket_for.id)"
            :disabled="Buttondisabled">
            Повторить заказ
            </el-button>
            <el-popconfirm
            confirm-button-text='Закрыть'
            cancel-button-text='.'
            icon="el-icon-info"
            icon-color="red"
            title="Удалите товары из корзины для повтора заказа!"
            >
                <el-button  v-show="Buttondisabled==true" slot="reference" type="danger" circle icon="el-icon-info"></el-button>
            </el-popconfirm> -->

            <!-- <span>{{status}}</span> -->
        </div>
        <el-collapse accordion>
            <el-collapse-item name="idx">
                <template slot="title">
                <div class="cab-block-basket-templ">
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
        <BasketModal
            @clickModal = "toggleModal"
            :dialogFormVisibleModal.sync="dialogFormVisibleModal"/>
    </div>
</template>

<script>
import BasketModal from '~/components/BasketModal.vue'
import {mapGetters, mapActions} from "vuex";
export default {
    props:['basket_for'],
    data() {
        return{
            status:'заказ',
            allCost:0,
            Buttondisabled :false,
            dialogFormVisibleModal:false,
        }
    },
    beforeMount(){
        this.amount()
    },
    components:{
        BasketModal
    },
    computed:{
        ...mapGetters({
            basket:'crate/basket',
            allBaskets:'main/allBaskets',
        })
    },
    watch:{
        allBaskets(){
            this.amount()
        },
        '$store.state.crate.basket': function() {
            if(this.basket.length!=0){
                this.Buttondisabled = true
            }else{
                this.Buttondisabled = false
            }
        }
    },
    methods:{
        ...mapActions({
            REPEAT_BASKET: 'crate/REPEAT_BASKET',
        }),
        toggleModal() {
          this.dialogFormVisibleModal = true;
        },
        RepeatOrder(id){
            this.REPEAT_BASKET(id)
            this.toggleModal()
        },
        amount(){
          this.allCost = 0;
            if(this.basket.length!=0){
                this.Buttondisabled = true
            }
          if(!this.basket_for.closed){
            this.status = "заказ"
          }else{
            this.status = "заказ"
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
