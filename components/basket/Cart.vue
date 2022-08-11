<template>
    <div class="basket-tov-block">
        <div
        class="basket-tov"
        v-for="(item,idx) in cart_data_tov" :key="idx"
        >
            <div class="basket-tov-img">
                <img :src="item.img">
                <div class="pod-zak-form" v-if="item.product[0].count==0">
                    Позиция под заказ!
                </div>
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
                    <span>руб./{{item.units}}</span>
                        <div class="basket-block-discount">
                            <strong>{{item.product[0].discont}}</strong>
                        </div>
                </div>
                <div class="basket-tov-calc">
                  
                    <el-input-number
                    size="mini"
                    :min="item.product[0].multiplicity"
                    :step="item.product[0].multiplicity"
                    v-model="item.product[0].count_el"
                    @change="changeQuantyty(item.id,item.product[0].id,item.product[0].count_el,item.product[0].discont!=null?item.product[0].discont:item.product[0].price)"
                    ></el-input-number>                   
                    <span class="units"><b>|</b>{{item.units}}</span> 
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
            <div v-if="for_amount_discount_persent==0" class="basket-itog-summ">
                <span>Скидка:</span>
                <strong>0<span>руб.</span></strong>
                <strong>0<span>%</span></strong>
            </div>
            <div v-if="for_amount_discount_persent>0" class="basket-itog-summ">
                <span>Скидка:</span>
                <strong>{{for_amount_discount}}<span>руб.</span></strong>
                <strong>{{for_amount_discount_persent}}<span>%</span></strong>
            </div>
            <div class="basket-diskont">
            <el-collapse accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                    <span class="basket-diskont-inf">
                    Как получить скидку <i class="header-icon el-icon-info"></i>
                    </span>
                    </template>
                    <div class="basket-diskont-inf-block dis-block">
						<h5>В Архитерм действует система скидок за объем суммы заказа.</h5>
						<span>Чем на большую сумму вы совершаете заказ – тем большую скидку на него вы получаете! </span>
						<p>
							<span>от<strong>100</strong>руб.</span>
							<strong>-2<span>%</span></strong>
						</p>
						<p>
							<span>от<strong>300</strong>руб.</span>
							<strong>-3<span>%</span></strong>
						</p>
						<p>
							<span>от<strong>500</strong>руб.</span>
							<strong>-5<span>%</span></strong>
						</p>
						<p>
							<span>от<strong>1000</strong>руб.</span>
							<strong>-7<span>%</span></strong>
						</p>
						<p>
							<span>от<strong>2000</strong>руб.</span>
							<strong>-10<span>%</span></strong>
						</p>
					</div>
                </el-collapse-item>
            </el-collapse>
            </div>
            <div class="basket-itog-summ">
                <div v-if="for_amount_none>0" class="basket-itog-summ-none">
                    <span>Сумма заказаных позиций</span>
                    <strong>{{for_amount_none}}<span>руб.</span></strong>
                </div>
                <span
                v-if="for_amount_none===0"
                >Итого:</span>
                <span v-else>Итого с учётом заказных позиций:</span>
                <strong>{{for_amount_itog}}<span>руб.</span></strong>
            </div>
        </div>
        <div class="none-block">
            <span>test</span>
        </div>
    </div>
</template>



<script>

export default {
    props:['cart_data'],
    data() {
        return{
            user_discount:this.$store.state.auth.user?this.$auth.user.discount:0,
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
            cost_product:0,

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
            this.amount()
            this.$emit('basketCostUpdate',{'for_amount':this.for_amount,'for_amount_discount':this.for_amount_discount,'for_amount_discount_persent':this.for_amount_discount_persent,'for_amount_none':this.for_amount_none,'for_amount_itog':this.for_amount_itog})
        },
        changeQuantyty(id,id_cart,val,price){
            this.cost_product = Math.ceil(price*val*100)/100
            this.$emit('cartUpdate',{'id':id,'id_cart':id_cart,'count_el':val,'cost':this.cost_product})
            this.amount()
            this.$emit('basketCostUpdate',{'for_amount':this.for_amount,'for_amount_discount':this.for_amount_discount,'for_amount_discount_persent':this.for_amount_discount_persent,'for_amount_none':this.for_amount_none,'for_amount_itog':this.for_amount_itog})
        },
        amount(){
            
            this.for_amount = 0
            this.for_amount_discount_persent = 0
            this.for_amount_discount = 0
            this.for_amount_none = 0
            for(let i in this.cart_data){
                this.for_amount += Number(this.cart_data[i].product[0].cost)
                if(this.cart_data[i].product[0].count===0){
                    this.for_amount_none += this.cart_data[i].product[0].cost
                }
            }
            this.for_amount = Math.ceil(this.for_amount*100)/100
            this.for_amount_none = Math.ceil(this.for_amount_none*100)/100
          for(let i in this.discount_arr){

              if(this.for_amount>=Number([i])){
                if(this.user_discount!=0&&this.user_discount>this.discount_arr[i]){
                    this.for_amount_discount_persent = this.user_discount
                }else{
                    this.for_amount_discount_persent = this.discount_arr[i]
                }
                
                this.for_amount_discount = this.for_amount*this.for_amount_discount_persent/100
                this.for_amount_discount = Math.ceil(this.for_amount_discount*100)/100
               }else if(this.for_amount>=Number([i]&&this.user_discount!=0)){
                    if(this.user_discount!=0&&this.user_discount>this.discount_arr[i]){
                        this.for_amount_discount_persent = this.user_discount
                    }
                    this.for_amount_discount = this.for_amount*this.for_amount_discount_persent/100
                    this.for_amount_discount = Math.ceil(this.for_amount_discount*100)/100
               }
          }
          this.for_amount_itog = this.for_amount - this.for_amount_discount
          this.for_amount_itog = Math.ceil(this.for_amount_itog*100)/100
            this.$emit('basketCostUpdate',{'for_amount':this.for_amount,'for_amount_discount':this.for_amount_discount,'for_amount_discount_persent':this.for_amount_discount_persent,'for_amount_none':this.for_amount_none,'for_amount_itog':this.for_amount_itog})
         
        }

    }
}
</script>
<style>

</style>
