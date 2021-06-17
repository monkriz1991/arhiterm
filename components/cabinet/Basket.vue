<template>
    <div class="cab-user-colaps">
        
        <el-collapse accordion>
            <el-collapse-item name="idx">
                <template slot="title">
                Позиций в корзине: {{basket_for.length}}
                <span>На сумму:
                    <strong>{{allCost}} руб.</strong>
                </span>
                </template>
                <div
                v-for="(item,idx) in basket_for" :key="idx"
                >
                <div class="cab-block-basket">
                    <div class="cab-block-basket-img">
                        <img :src="item.img">
                    </div>
                    <div class="cab-block-basket-left">
                        <strong>{{item.name}}</strong>
                        <div class="basket-left-item">
                            <span>{{item.product[0].count_el}} м2</span>
                            <span><span>Стоимость:</span>{{item.product[0].cost}}руб.</span>
                        </div>
                        <div class="basket-left-item">
                            <span>{{item.product[0].name}}</span>
                            <span>{{item.product[0].filter_show_name}}</span>
                            <span>{{item.product[0].filter_show_value}}</span>
                        </div>   
                    </div>
                </div>
                </div>
            </el-collapse-item>
        </el-collapse>            
    </div>
</template>

<script>
export default {
    props:['basket_for'],
    data() {
        return{
            allCost:0
        }
    },
    beforeMount(){
        this.amount()
    },
    components:{
    },
    methods:{
        amount(){
            console.log(this.basket_for)
            for(let i in this.basket_for){
                this.allCost += this.basket_for[i].product[0].cost
            }
            this.allCost = Math.floor(this.allCost*100)/100
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
</style>