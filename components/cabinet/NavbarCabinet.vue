<template>
    <div class="nav-cabinet">
        <nuxt-link :to="`/cabinet`" exact active-class="activ-link-cab">
        <i class="el-icon-user"></i>Профиль</nuxt-link>
        <nuxt-link :to="`/userCabinet/store`" active-class="activ-link-cab">
        <i class="el-icon-shopping-cart-full"></i>Мои покупки</nuxt-link>
        <nuxt-link v-if="$auth.user?$auth.user.is_maunter:false" :to="`/userCabinet/mounter`" active-class="activ-link-cab">
        <i class="el-icon-eleme"></i>Монтажник</nuxt-link>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style>
.nav-cabinet{
    float: left;
    width: 100%;
    margin: 0 0 20px;
}
.nav-cabinet a{
    text-decoration: none;
    margin: 0 0px 0 0;
    color: #333;
    padding: 8px 20px;
    /* border-radius: 4px; */
    /* background: #f6f6f6; */
    float: left;
    border-bottom: 2px solid #e2e2e2;
    font-size: 13px;
    font-weight: 400;
    position: relative;
}
.nav-cabinet a i{
    padding: 0 4px 0 0;
}
.nav-cabinet a:hover{
    color: #000;
}
.nav-cabinet .activ-link-cab{

}
.activ-link-cab:before{
    content: "";
    display: inline-block;
    position: absolute;
    bottom: -2px;
    left: calc(50% - 15px);
    width: 30px;
    height: 2px;
    background: #ff7e40;
}
</style>
