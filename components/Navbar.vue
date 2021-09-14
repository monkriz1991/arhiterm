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
                  <fa icon="enevelope" />
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
              <i v-if="visibleNav==true" class="el-icon-download"></i>
              <i v-else class="el-icon-upload2"></i>
            </div>
          </el-popover>
          <nuxt-link
          v-if="width>991"
          class="link-navbar" :to="`/mounters`">
            Монтажники
          </nuxt-link>
            <div v-if="$auth.loggedIn">
              <div v-if="adaptivSidebar">
                <Menyuser/>
              </div>
              <el-drawer
              v-else
              class="darwer-meny"
              :visible.sync="drawer"
              :direction="direction"
              :with-header="true">
                <MenyuserMobail :visible.sync="drawer" />
              </el-drawer>
              <el-button
              v-if="!adaptivSidebar"
              @click="drawer = true"
              class="drawer-button-meny"
              icon="el-icon-more"
              size="small"
              >
              </el-button>
            </div>
            <div v-else>
            <no-ssr>
              <ModalLogout />
            </no-ssr>
            </div>
            <no-ssr>
              <BasketModal />
            </no-ssr>
            <div class="top-phone">
              <el-button
              icon="el-icon-phone"
              @click="dialogVisible = true">
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
              <i v-if="visibleNav==true" class="el-icon-download"></i>
              <i v-else class="el-icon-upload2"></i>
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
        show: false
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
.drawer-button-meny{
  float: right;
}
.darwer-meny .el-drawer{
  width: 100% !important;
}
.drawer-button-meny{
  padding: 7px 12px;
  margin: 0 0 0 5px;
}
.top-phone{

}
.contents-mobail{
  float: left;
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  padding: 5px 0;
  margin: 10px 0 5px;
  position: relative;
}
.el-drawer__header {
    padding: 20px 15px 0;
}
.contents-mobail .header-cat{
  float: left;
  padding: 7px 12px;
  border: none;
}
.contents-mobail .button-search{
    float: right;
    padding: 8px 8px 7px;
    font-size: 11px;
}
.block-search{
  position: absolute;
  right: 35px;
  left: 0;
}
.block-search .el-autocomplete{
  width: 100%;
}
.block-search .el-input input{
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}
.block-search-input .el-scrollbar__view li{
  font-size: 11px;
}
.search-navbar{
    float: right;
    position: relative;
}
.search-navbar>button{
    padding: 9px !important;
    margin: 0 30px 0 0;
}
.search-navbar .block-search{
    top: 0px;
    right: 70px;
    width: 420px;
    left: auto;
}
.search-navbar .block-search .el-input__inner{
    height: 33px;
    line-height: 32px;
    font-size: 13px;
}
</style>
