<template>
    <div class="basket-tov">
        <div class="basket-tov-img">
            <img src="~/static/logotip.png">
        </div>
        <div class="basket-tov-desk">
            <div class="basket-tov-desk-left">
                <strong>Труба многослойная металлопластиковая PERT/AL/PERT</strong>
                <div class="basket-tov-desk-kod">
                    <strong>Код товара</strong>
                    <span>PERTTRK016</span>
                </div>
                <div class="basket-tov-desk-type">
                    <strong>Диаметр мм.</strong>
                    <span>16<span></span></span>
                </div>
            </div>
            <div class="basket-tov-cost">
                <strong>2.04</strong>
                <span>руб.</span>
            </div>
            <div class="basket-tov-calc">
                <el-input-number size="mini" 
                v-model="num4"
                ></el-input-number>
            </div>
            <div class="basket-tov-summ">
                <strong>102</strong>
                <span>руб.</span>
            </div>
            <div class="basket-tov-dell">
                <i class="el-icon-delete"></i>
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
    metodts:{
    }
}
</script>
