<template>
  <header>
    <div class="container">
      <div class="contents clearfix">
        <div class="logotip">
          <nuxt-link to="/">
            <img src="~/static/logotip.png" alt="logotip">
          </nuxt-link>
        </div>
        <div class="header-nav">
          <el-popover
            popper-class="popover-nav"
            v-model="visible"
            placement="bottom"
            width="auto"
            right="0"
            trigger="click"
          >
            <el-button slot="reference"
              class="header-cat"
              @click="drawer = true"
            >Каталог
            <i class="el-icon-menu"></i>
            </el-button>
            <ul
              v-if="visibleNav"
              class="transition-box">
              <li
                v-for="category in categoryNavbar"
                :key="category.id"
                size="mini" @click="visible = false"
              >
                <nuxt-link :to="`/catalog/${category.id}`">
                  <i class="el-icon-picture-outline-round"></i>
                  {{ category.name }}
                </nuxt-link>
              </li>
            </ul>
            <ul
              v-else
              class="transition-box manufacturer-navbar-ul">
              <li
                v-for="item in manufacturer.results"
                :key="item.id"
                size="mini" @click="visible = false"
              >
                <nuxt-link :to="`/catalog/factory/${item.id}`">
                  <!-- <i class="el-icon-picture-outline-round"></i>  -->
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
            <div
            v-on:click="visibleNav=!visibleNav"
            class="header-nav-refresh">
              <i class="el-icon-refresh"></i>
            </div>
          </el-popover>
          <nuxt-link class="link-navbar" :to="`/mounters`">
            Монтажники
          </nuxt-link>
            <div v-if="$auth.loggedIn">
              <Menyuser/>
            </div>
            <div v-else>
            <no-ssr>
              <ModalLogout />
            </no-ssr>
            </div>
            <no-ssr>
              <BasketModal />
            </no-ssr>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ModalLogout from '~/components/aut/ModalLogout.vue'
import BasketModal from '~/components/BasketModal.vue'
import Menyuser from '~/components/aut/Menyuser.vue'
import {mapGetters,mapActions} from 'vuex'
  export default {
    components:{
      ModalLogout,
      BasketModal,
      Menyuser,
    },
    data() {
      return {
        visible: false,
        visibleNav:true,
      };
    },
    computed:{
      ...mapGetters({
        categoryNavbar: 'category/categoryNavbar',
        manufacturer: 'category/manufacturer',
      })
    },
    methods: {
      ...mapActions({
        getCategory:'category/getCategory',
        getManufacturer:'category/getManufacturer'
      })
    },
    mounted(){
      this.getCategory(),
      this.getManufacturer()
    },


  }
</script>

<style scoped>

</style>
