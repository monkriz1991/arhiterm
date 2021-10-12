<template>
    <div class="navbar-user">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <div class="demo-type">
                    <div>
                        <el-avatar :src="$auth.user.img" icon="el-icon-user-solid"></el-avatar> 
                    </div>
                </div>
                <span class="demo-type-span">Моё меню</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="navbar-user-item">
                    <nuxt-link :to="`/cabinet`">
                    <i class="el-icon-user"></i>
                    Профиль</nuxt-link>
                </el-dropdown-item>
                <el-dropdown-item class="navbar-user-item">
                    <nuxt-link to="/userCabinet/store">
                    <i class="el-icon-shopping-cart-full"></i>
                    Мои покупки</nuxt-link>
                </el-dropdown-item>
                <el-dropdown-item class="navbar-user-item">
                    <nuxt-link to="/userCabinet/mounter">
                    <i class="el-icon-eleme"></i>
                    Страница монтажника</nuxt-link>
                </el-dropdown-item>
                <el-dropdown-item class="navbar-user-item">
                    <span @click="logout">
                    <i class="el-icon-arrow-left"></i>
                    Выход</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>


<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
        logout(){
            this.$auth.logout();
        },
    },
    
  }
</script>

<style scoped>
.el-dropdown-menu__item{
    display: flex;
}
</style>