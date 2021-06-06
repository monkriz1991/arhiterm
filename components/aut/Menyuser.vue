<template>
    <div class="navbar-user">
        <el-menu
        :default-active="activeIndex"
        mode="vertical"
        menu-trigger="click"
        @select="handleSelect"
        text-color="#333"
        ref="menu">
        <el-submenu index="1" ref="submenu">
            <template slot="title">
                <div class="demo-type">
                    <div>
                        <el-avatar icon="el-icon-user-solid"></el-avatar> 
                    </div>
                </div>
                <span>{{$auth.user.username}}</span>
            </template>
            <el-menu-item index="1-1" class="navbar-user-item">
                <nuxt-link :to="`/cabinet/${$auth.user.id}`">
                <i class="el-icon-user"></i>
                Профиль</nuxt-link>
            </el-menu-item>
            <el-menu-item index="1-2" class="navbar-user-item">
                <nuxt-link to="/myBasket">
                <i class="el-icon-shopping-cart-full"></i>
                Мои покупки</nuxt-link>
            </el-menu-item>
            <el-menu-item index="1-2" class="navbar-user-item">
                <span @click="logout">
                <i class="el-icon-arrow-left"></i>
                Выход</span>
            </el-menu-item>
        </el-submenu>

        </el-menu>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$refs["menu"].close("1");
        },
        handleOpen(key, keyPath) {
            
        },
        handleClose(key, keyPath) {
        },
        logout(){
            this.$auth.logout();
        },
    },
    
  }
</script>