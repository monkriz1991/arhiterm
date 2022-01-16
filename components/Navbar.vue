<template>
  <header class="header-tempalte">
    <div class="container">
      <div class="contents clearfix">
        <div class="header-cat-desc">
          <el-popover
            v-if="width>991"
            popper-class="popover-nav"
            v-model="visible"
            placement="bottom"
            width="auto"
            right="0"
            trigger="click"
          >
            <el-button slot="reference"
              class="header-cat"
              @click="drawerMeny = true"
            >
            <svg id="book-svg" xmlns="http://www.w3.org/2000/svg" width="25.013" height="20.255" viewBox="0 0 25.013 20.255">
              <path id="Path_587" data-name="Path 587" d="M3.586,7.691,7.908,9.144a8.071,8.071,0,0,0,5.042.031c3.785-.939,11.98-2.565,12.063-2.583l-.305-1.54-.054.011-7.811-1.1a11.21,11.21,0,0,0-3.1.08L3.3,6.068a3.06,3.06,0,0,0-2.122,5.41,3.05,3.05,0,0,0-.015,4.813,3.066,3.066,0,0,0,.968,5.326l7.528,2.407a3.369,3.369,0,0,0,1.514.064L24.392,21.06s-.079-.342-.175-.765a.785.785,0,0,0-.941-.59L11.245,22.46A3.387,3.387,0,0,1,9.731,22.4L2.614,20.121a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972c0-.007,4.355,1.384,6.138,1.952a3.369,3.369,0,0,0,1.514.064l13.215-3.027s-.079-.343-.175-.765a.785.785,0,0,0-.941-.59L11.245,17.658a3.4,3.4,0,0,1-1.514-.064L2.614,15.318a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972s4.414,1.408,6.211,1.982a3.366,3.366,0,0,0,1.513.064l13.215-3.028s-.079-.342-.175-.765a.785.785,0,0,0-.941-.589L11.318,12.883A3.37,3.37,0,0,1,9.8,12.82L2.686,10.545a1.5,1.5,0,0,1,.9-2.854Z" transform="translate(0 -3.891)"/>
            </svg>
            <span class="button-nav-text">Каталог</span>
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
                  <el-image :src="category.img"></el-image>
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
                <el-image :src="item.img"></el-image>
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
            <div
            v-on:click="visibleNav=!visibleNav"
            class="header-nav-refresh">
            <span v-if="visibleNav==true" >Бренды</span>
            <span v-else>Каталог</span>
            </div>
          </el-popover>  
        </div>  
        <div class="logotip">
          <nuxt-link to="/">
            <img src="~/static/logotip.png" alt="logotip">
          </nuxt-link>
        </div>
        <div class="header-nav">
          <nuxt-link
          hidden
          v-if="width>991"
          class="link-navbar" :to="`/mounters`">
            Монтажники
          </nuxt-link>
            <div>
              <el-drawer
              class="darwer-meny"
              :visible.sync="drawer"
              :direction="direction"
              :with-header="true">
                <MenyuserMobail 
                :width.sync = "width"
                :visible.sync ="drawer" />
              </el-drawer>
              <el-button
              @click="drawer = true"
              class="drawer-button-meny"
              icon="el-icon-more"
              size="small"
              >
              </el-button>
            </div>
            <div  v-if="$auth.loggedIn">
              <Menyuser/>
            </div>
            <div v-else>
            <no-ssr>
              <ModalLogout />
            </no-ssr>
            </div>
            <no-ssr>
              <BasketModal  
              @clickModal = "toggleModal"
              @closeBasket = "closeBasket"
              :dialogFormVisibleModal="dialogFormVisibleModal"/>
              <div class="nav-button-basket button-nav-meny">
                <el-button  type="text" @click="dialogFormVisibleModal=true">
                  <i class="el-icon-shopping-cart-full"></i>
                  <span class="button-nav-text">Корзина</span>
              </el-button>
              </div>
            </no-ssr>
            <div class="top-phone button-nav-meny">
              <el-button
              icon="el-icon-phone"
              @click="dialogVisible = true">
              <span class="button-nav-text">Контакты</span>
              </el-button>
            </div>
            <el-dialog
              title="Контакты"
              :visible.sync="dialogVisible"
              width="30%"
              >
              <div class="phone-modal-block">
                <div class="phone-modal-block-el">
                  <span>Менеджер</span>
                  <p v-for="(phone,k) in phones" :key="k">
                    <a href="">{{phone.phone_number}}</a>
                    <strong>{{phone.operator}}</strong>
                  </p>
                </div>
              </div>
            </el-dialog>
            <div class="search-navbar">
              <el-button
              @click="showButton()"
              v-if="show==true&&width>991"
              class="button-search"
              icon="el-icon-close"
              circle>
              </el-button>
              <el-button
              @click="showButton()"
              v-else
              v-show="width>991"
              class="button-search"
              icon="el-icon-search"
              circle>
              </el-button>
              <transition name="el-fade-in-linear">
                <div v-show="show" class="block-search">
                  <el-autocomplete
                    v-show="width>991"
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    :trigger-on-focus="false"
                    placeholder="Введите запрос..."
                    @change="handleSelect"
                    popper-class="block-search-input"
                  >
                    <template slot-scope="{ item }">
                  <nuxt-link :to="'/product/'+item.id">
                  <div class="search-block">
                    <div class="search-block-img">
                      <img :src="item.img" alt="" />
                    </div>  
                    <div class="search-block-desc">
                      <span>
                        <i class="el-icon-office-building"></i>
                        {{ item.manufacturername }}
                      </span>
                      {{ item.name }}
                    </div>
                  </div>
                  </nuxt-link>
                </template>
                  </el-autocomplete>
                </div>
              </transition>
            </div>
        </div>
      </div>
      <div
      v-if="width<991"
      class="contents-mobail">
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
              @click="drawerMeny = true"
            >
            <svg id="book-svg" xmlns="http://www.w3.org/2000/svg" width="25.013" height="20.255" viewBox="0 0 25.013 20.255">
              <path id="Path_587" data-name="Path 587" d="M3.586,7.691,7.908,9.144a8.071,8.071,0,0,0,5.042.031c3.785-.939,11.98-2.565,12.063-2.583l-.305-1.54-.054.011-7.811-1.1a11.21,11.21,0,0,0-3.1.08L3.3,6.068a3.06,3.06,0,0,0-2.122,5.41,3.05,3.05,0,0,0-.015,4.813,3.066,3.066,0,0,0,.968,5.326l7.528,2.407a3.369,3.369,0,0,0,1.514.064L24.392,21.06s-.079-.342-.175-.765a.785.785,0,0,0-.941-.59L11.245,22.46A3.387,3.387,0,0,1,9.731,22.4L2.614,20.121a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972c0-.007,4.355,1.384,6.138,1.952a3.369,3.369,0,0,0,1.514.064l13.215-3.027s-.079-.343-.175-.765a.785.785,0,0,0-.941-.59L11.245,17.658a3.4,3.4,0,0,1-1.514-.064L2.614,15.318a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972s4.414,1.408,6.211,1.982a3.366,3.366,0,0,0,1.513.064l13.215-3.028s-.079-.342-.175-.765a.785.785,0,0,0-.941-.589L11.318,12.883A3.37,3.37,0,0,1,9.8,12.82L2.686,10.545a1.5,1.5,0,0,1,.9-2.854Z" transform="translate(0 -3.891)"/>
            </svg>
            <span class="button-nav-text">Каталог</span>
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
                  <el-image :src="category.img"></el-image>
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
                  <el-image :src="item.img"></el-image>
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
            <div
            v-on:click="visibleNav=!visibleNav"
            class="header-nav-refresh">
              <font-awesome-icon v-if="visibleNav==true" :icon="['fab','whmcs']" />
              <font-awesome-icon v-else :icon="['fas','stream']" />
            </div>
          </el-popover>
          <nuxt-link
          class="link-navbar" :to="`/mounters`">
            Монтажники
          </nuxt-link>
          <el-button
          @click="showButton()"
          v-if="show==true"
          class="button-search"
          icon="el-icon-close"
          circle>
          </el-button>
          <el-button
          @click="showButton()"
          v-else
          class="button-search"
          icon="el-icon-search"
          circle>
          </el-button>
          <transition name="el-fade-in-linear">
            <div v-show="show" class="block-search">
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                :trigger-on-focus="false"
                placeholder="Введите запрос..."
                @change="handleSelect"
                popper-class="block-search-input"
              >
                 <template slot-scope="{ item }">
                  <nuxt-link :to="'/product/'+item.id"><div class="value">{{ item.name }}</div></nuxt-link>
                </template>

              </el-autocomplete>
            </div>
          </transition>
      </div>
    </div>
    <div class="header-bg"></div>
  </header>
</template>

<script>
import ModalLogout from '~/components/aut/ModalLogout.vue'
import BasketModal from '~/components/BasketModal.vue'
import Menyuser from '~/components/aut/Menyuser.vue'
import MenyuserMobail from '~/components/aut/MenyuserMobail.vue'
import {mapGetters,mapActions} from 'vuex'
  export default {
    components:{
      ModalLogout,
      BasketModal,
      Menyuser,
      MenyuserMobail,
    },
    data() {
      return {
        drawerMeny:false,
        visible: false,
        visibleNav:true,
        adaptivSidebar:true,
        drawer: false,
        direction: 'rtl',
        width:0,
        dialogVisible: false,
        links: [],
        phones:[],
        state: '',
        timeout:  null,
        show: false,
        dialogFormVisibleModal: false,
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
      }),
      toggleModal(val,noCloseNotify) { 
          this.dialogFormVisibleModal = val;
          if(noCloseNotify==false){
              this.$notify.closeAll()
          }
      },
      closeBasket(val){ 
        if(val==true){
            this.openNotify()
        }
      },
      openNotify() {
          this.$notify({
          type: 'success',
          title: 'Заказ успешно оформлен',
          dangerouslyUseHTMLString: true,
          duration:4500,
          message: 'На Вашу почту была выслана информация о заказе!',
          // offset: 100
          });
      }, 
      updateWidth() {
        this.width = window.innerWidth;
        if(window.innerWidth>991){
            this.adaptivSidebar = true
        }else{
          this.adaptivSidebar = false

        }
      },
      loadAll() {
        return [
          { "value": "vue", "link": "https://github.com/vuejs/vue" },
         ];
      },
      querySearchAsync(queryString, cb) {
        var links = this.links;
        let results = [ { "value":'По данному запросу ничего не найдено'}];
        this.$axios.get(`/catalog/search/?search=${queryString}&limit=9999999`).then(function (result){
            cb(result.data.results);
          // console.log(result.data.results)
        }).catch(function (e){results = [ { "value":'По данному запросу ничего не найдено'}];})
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.state=''
        this.show = false
      },
      showButton(){
        this.show =!this.show
        this.state=''
      },
      async getPhones(){
        let data = await this.$axios.get(`/users/phones/?limit=9999`);
        this.phones = data.data.results;
      }
    },
    mounted(){
      this.getPhones();
      this.getCategory()
      this.getManufacturer()
      this.links = this.loadAll()
      if (process.browser){
        window.addEventListener('resize', this.updateWidth);
        this.updateWidth()
      }
    },

  }
</script>

<style>

</style>
