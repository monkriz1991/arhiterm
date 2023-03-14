<template>
    <div class="navbar-user-mobail">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      ref="menu">
      <el-menu-item hidden v-if="width<991" index="2"  @click="closeMeny">
           <nuxt-link :to="`/mounters`">
            Монтажники
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="3"  @click="closeMeny">
           <nuxt-link :to="`/info/contacts`">
            Контакты
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="4"  @click="closeMeny">
           <nuxt-link :to="`/info/about`">
            О нас
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="5"  @click="closeMeny">
           <nuxt-link :to="`/info/dostavka`">
            Доставка
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="6"  @click="closeMeny">
           <nuxt-link :to="`/info/payment`">
            Условия оплаты / заказа / возврата
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="7"  @click="closeMeny">
           <nuxt-link :to="`/info/discount_order`">
            Скидки в Архитерм
          </nuxt-link>
      </el-menu-item>

    </el-menu>

    </div>
</template>


<script>
  export default {
    props:['visible','width'],
    data() {
      return {
      };
    },
    methods: {
        logout(){
            this.$auth.logout();
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
            console.log(key)
        },
        closeMeny(){
            this.$refs.menu.close('1');
            this.$emit('update:visible', false)
            this.$emit('toggleModal')  
        },
    },
    
  }
</script>

<style scoped>
.el-dropdown-menu__item{
    display: flex;
}
.avatar-meny-user{
    float: left;
    margin: 8px 14px 0 0;
}
</style>