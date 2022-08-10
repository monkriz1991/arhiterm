<template>
    <no-ssr>
        <div class="container">
            <!-- <NavbarCabinet/>  -->
            <div class="succes-block">
                <h2><i class="el-icon-check"></i> 
                Ваш заказ принят. Благодарим вас.</h2>
                <h3>На Вашу почту была выслана информация о заказе.</h3>
                <h3>В ближайшее время с вами свяжется менеджер для уточнения деталей заказа.</h3>
                <p>Обращаем ваше внимание, что заказы обрабатываются в будние дни в рабочее время: 
                    <span>Понедельник - Четверг</span>
                    <strong>с 8:30 до 17:30</strong>
                    <span>Пятница</span> 
                    <strong>с 8:30 до 17:00</strong>
                </p>
                <h4>Информация о закзе</h4>
                <div class="succes-block-inf">
                    <div>
                        <strong>Номер заказа</strong>
                        <span>{{SuccessBaskets.id}}</span>
                    </div>   
                    <div>
                        <strong>Контактный телефон</strong>
                        <span>{{SuccessBaskets.user_data.phone_number}}</span>
                    </div>  
                    <div>
                        <strong>Информация о доставке</strong>
                        <span>{{SuccessBaskets.type_delevery}}</span>
                        <span>/ {{SuccessBaskets.delevery}}</span>
                    </div>
                    <div>
                        <strong>Комментарий к заказу</strong>
                        <span>{{SuccessBaskets.description}}</span>
                    </div>                 
                </div>
                <div class="succes-block-desc">
                    <p>
                        <span>Товаров на сумму:</span>
                        <strong>{{SuccessBaskets.for_amount}}<span>руб.</span></strong>
                    </p>
                    <p v-if="SuccessBaskets.for_amount_discount!=''">
                        <span>Скидка:</span>
                        <strong>{{SuccessBaskets.for_amount_discount_persent}}<span>%</span></strong>
                        <strong>{{SuccessBaskets.for_amount_discount}}<span>руб.</span></strong>
                    </p>
                    <p>
                        <span>Итого:</span>
                        <strong>{{SuccessBaskets.for_amount_itog}}<span>руб.</span></strong>
                    </p>
                </div>
                <h4>Заказанные позиции</h4>
                <div
                v-for="(item,idx) in SuccessBaskets.cart_prodicts" :key="idx"
                >
                <div class="cab-block-basket">
                    <div class="cab-block-basket-img">
                        <img :src="baseUrl()+item.card_data.img">
                    </div>
                    <div class="cab-block-basket-left">
                        <strong>{{item.card_data.name}}</strong>
                        <div class="basket-left-item">
                            <span><span>Стоимость:</span>
                            <strong>{{item.price}}<span>руб.</span></strong></span>
                            <span><span>Кол.:</span>
                            <strong>{{item.count}}</strong><span>{{item.card_data.units}}</span></span>
                            <span><span>На сумму:</span>
                            <strong>{{item.sum_price}}<span>руб.</span></strong></span>
                        </div>
                        <div class="basket-left-item">
                            <span>Код товара:</span>
                            <span>{{item.product_data.name}}</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </no-ssr>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import NavbarCabinet from '~/components/cabinet/NavbarCabinet.vue'
export default {
    middleware: ['auth'],
    data() {
      return{
      }  
    },
      components:{
        NavbarCabinet,
    },
    computed:{
        ...mapGetters({
            SuccessBaskets:'main/SuccessBaskets',
        })
    },
    methods:{
        redirect(){
            if(this.SuccessBaskets.length == 0){
                this.$router.push('/userCabinet/store/')
            }
        },
        baseUrl(){
          return this.$axios.defaults.baseURL
        }
    },
    mounted(){
        this.redirect()
    }
}
</script>