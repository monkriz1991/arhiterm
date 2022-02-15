<template>
    <div class="navbar-user-mobail">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      ref="menu">
      <el-submenu  v-if="$auth.loggedIn&&width<991" index="1">
        <template slot="title">
            <div class="avatar-meny-user">
                <el-avatar :src="$auth.user.img"></el-avatar> 
            </div>
          <span>Кабинет</span>
        </template>
            <el-menu-item index="1-1"  @click="closeMeny">
                <nuxt-link :to="`/cabinet`">
                <i class="el-icon-user"></i>
                Профиль
                </nuxt-link>
            </el-menu-item>
            <el-menu-item index="1-2"  @click="closeMeny">
                <nuxt-link to="/userCabinet/store">
                <i class="el-icon-shopping-cart-full"></i>
                Мои покупки
                </nuxt-link>
            </el-menu-item>
            <!-- <el-menu-item index="1-3"  @click="closeMeny">
                <nuxt-link to="/userCabinet/mounter">
                <i class="el-icon-eleme"></i>
                Страница монтажника
                </nuxt-link>
            </el-menu-item> -->
            <el-menu-item index="1-4">
                <div class="menu-item-exit" @click="logout">
                  <i class="el-icon-arrow-left"></i>
                  <span>Выход</span>
                </div>
            </el-menu-item>
      </el-submenu>
      <el-menu-item hidden v-if="width<991" index="2"  @click="closeMeny">
           <nuxt-link :to="`/mounters`">
            Монтажники
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="3"  @click="closeMeny">
           <nuxt-link :to="`/info/about`">
            О нас
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="4"  @click="closeMeny">
           <nuxt-link :to="`/info/dostavka`">
            Доставка
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="5"  @click="closeMeny">
           <nuxt-link :to="`/info/payment`">
            Оплата
          </nuxt-link>
      </el-menu-item>
      <el-menu-item hidden index="6"  @click="closeMeny">
           <nuxt-link :to="`/info/rassrochka`">
            Рассрочка
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="7"  @click="closeMeny">
           <nuxt-link :to="`/info/certificates`">
            Сертификаты
          </nuxt-link>
      </el-menu-item>
      <el-menu-item index="8"  @click="closeMeny">
           <nuxt-link :to="`/info/contacts`">
            Контакты
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