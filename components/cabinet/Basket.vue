<template>
    <div class="cab-user-colaps">
        <el-collapse 
        v-for="(item,idx) in basket_for" :key="idx"
        accordion>
            <el-collapse-item name="idx">
                <template slot="title">
                {{idx}} Корзина
                </template>
                {{item.id}}
            </el-collapse-item>
        </el-collapse>            
    </div>
</template>

<script>
export default {
    props:['basket_for'],
    data() {
        return{

        }
    },
    components:{
    }
}
</script>

<style>
.cab-user-colaps{
    float: left;
    width: 100%;
}
</style>