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
            <i class="el-icon-s-data"></i>
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
                  <!-- <font-awesome-icon
                  v-if="category.title!=''"
                   :icon="['fas',category.title]" /> -->
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
                  <!-- <i class="el-icon-picture-outline-round"></i>  -->
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
            <div
            v-on:click="visibleNav=!visibleNav"
            class="header-nav-refresh">
            <span v-if="visibleNav==true" >Бренды</span>
            <span v-else>Каталог</span>
              <!-- <font-awesome-icon v-if="visibleNav==true"  :icon="['fab','whmcs']" />
              <font-awesome-icon v-else :icon="['fas','stream']" /> -->
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
                  <nuxt-link :to="'/product/'+item.id"><div class="value">{{ item.name }}</div></nuxt-link>
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
          console.log(result.data.results)
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
