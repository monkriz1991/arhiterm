<template>
  <header ref="header"
  class="header-tempalte"
  :class="{ 'header-container--sticky': isHeaderSticky }"
  >
    <div class="container">
      <div class="contents">
        <el-skeleton       
        :loading="loadingFirst"
        class="skeleton-navbar">
        <template slot="template" >
            <el-skeleton-item
                variant="rect"
                style="width: 20;float: left; height: 35px;border-radius: 10px;"
              />
        </template>
        </el-skeleton>
        <div style="display: contents;" v-show="showFirst" >
        <div v-if="width>991" class="header-cat-desc">
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
              @click="menyCat(true)"
          >
          <svg id="book-svg" xmlns="http://www.w3.org/2000/svg" width="25.013" height="20.255" viewBox="0 0 25.013 20.255">
              <path id="Path_587" data-name="Path 587" d="M3.586,7.691,7.908,9.144a8.071,8.071,0,0,0,5.042.031c3.785-.939,11.98-2.565,12.063-2.583l-.305-1.54-.054.011-7.811-1.1a11.21,11.21,0,0,0-3.1.08L3.3,6.068a3.06,3.06,0,0,0-2.122,5.41,3.05,3.05,0,0,0-.015,4.813,3.066,3.066,0,0,0,.968,5.326l7.528,2.407a3.369,3.369,0,0,0,1.514.064L24.392,21.06s-.079-.342-.175-.765a.785.785,0,0,0-.941-.59L11.245,22.46A3.387,3.387,0,0,1,9.731,22.4L2.614,20.121a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972c0-.007,4.355,1.384,6.138,1.952a3.369,3.369,0,0,0,1.514.064l13.215-3.027s-.079-.343-.175-.765a.785.785,0,0,0-.941-.59L11.245,17.658a3.4,3.4,0,0,1-1.514-.064L2.614,15.318a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972s4.414,1.408,6.211,1.982a3.366,3.366,0,0,0,1.513.064l13.215-3.028s-.079-.342-.175-.765a.785.785,0,0,0-.941-.589L11.318,12.883A3.37,3.37,0,0,1,9.8,12.82L2.686,10.545a1.5,1.5,0,0,1,.9-2.854Z" transform="translate(0 -3.891)"/>
          </svg> 
          <span class="button-nav-text">Каталог</span>
          </el-button>
            <CatalogModal
            :categoryNavbar.sync="categoryNavbar"
            :manufacturer.sync="manufacturer"
            :visible.sync="visible"
            />
          </el-popover>
        </div>
        <div class="logotip">
          <nuxt-link to="/">
            <div class="logotip-img">
              <img 
                v-if="width>991"
                sizes="sm:130px md:130px lg:130px"
                provide="imgix"
                loading="lazy" 
                src="/logotip.webp" 
                alt="logotip" 
                title="Logotip arhiterm" />
              <img v-else src="/logotip_orange.webp" alt="logotip" title="Logotip arhiterm"/>
            </div>
          </nuxt-link>
        </div>
        <div
        v-if="width<991"
        class="contents-mobail">
          <el-button slot="reference"
          class="header-cat"
          @click=dialogCatalog()
          >
            <svg id="book-svg" xmlns="http://www.w3.org/2000/svg" width="25.013" height="20.255" viewBox="0 0 25.013 20.255">
              <path id="Path_587" data-name="Path 587" d="M3.586,7.691,7.908,9.144a8.071,8.071,0,0,0,5.042.031c3.785-.939,11.98-2.565,12.063-2.583l-.305-1.54-.054.011-7.811-1.1a11.21,11.21,0,0,0-3.1.08L3.3,6.068a3.06,3.06,0,0,0-2.122,5.41,3.05,3.05,0,0,0-.015,4.813,3.066,3.066,0,0,0,.968,5.326l7.528,2.407a3.369,3.369,0,0,0,1.514.064L24.392,21.06s-.079-.342-.175-.765a.785.785,0,0,0-.941-.59L11.245,22.46A3.387,3.387,0,0,1,9.731,22.4L2.614,20.121a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972c0-.007,4.355,1.384,6.138,1.952a3.369,3.369,0,0,0,1.514.064l13.215-3.027s-.079-.343-.175-.765a.785.785,0,0,0-.941-.59L11.245,17.658a3.4,3.4,0,0,1-1.514-.064L2.614,15.318a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972s4.414,1.408,6.211,1.982a3.366,3.366,0,0,0,1.513.064l13.215-3.028s-.079-.342-.175-.765a.785.785,0,0,0-.941-.589L11.318,12.883A3.37,3.37,0,0,1,9.8,12.82L2.686,10.545a1.5,1.5,0,0,1,.9-2.854Z" transform="translate(0 -3.891)"/>
            </svg>
          </el-button>
          <el-dialog
          class="header-cat-nav"
          append-to-body
          :visible.sync="dialogCatalogVisible"
          width="36%">
            <CatalogModal
            :categoryNavbar.sync="categoryNavbar"
            :manufacturer.sync="manufacturer"
            :dialogCatalogVisible.sync="dialogCatalogVisible"
            :visible.sync="visible"
            />
          </el-dialog>
        </div>
        <div class="header-nav">
            <div>
              <el-drawer
              v-if="width>991"
              class="darwer-meny"
              :visible.sync="drawer"
              :direction="direction"
              :with-header="true">
                <MenyuserMobail
                :width.sync = "width"
                :visible.sync ="drawer" />
              </el-drawer>
              <el-button
              v-if="width>991"
              @click="drawer = true"
              class="drawer-button-meny"
              icon="el-icon-more"
              size="small"
              >
              </el-button>
            </div>
            <client-only>
              <div v-if="$auth.loggedIn">
                <Menyuser/>
              </div>
              <div v-else>
                <ModalLogout />
              </div>
            </client-only>
            <client-only>
             <BasketModal
              @clickModal = "toggleModal"
              @openBasketNotify = "closeBasket"
              :dialogFormVisibleModal.sync="dialogFormVisibleModal"/>
              <div class="nav-button-basket button-nav-meny">
                <el-button  type="text" @click="toggleModal(true)">
                  <i class="el-icon-shopping-cart-full"></i>
                  <span v-if="width>991" class="button-nav-text">Корзина</span>
              </el-button>
              </div>
            </client-only>
            <div v-if="width>991" class="top-phone button-nav-meny">
              <el-button
              circle
              icon="el-icon-phone-outline"
              @click=dialogVisiblePhone()>
              </el-button>
                <TimelineModal
                :worktime.sync="worktime"
                />
            </div>
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
                  <i class="el-icon-search"></i>
                  <Search/>
                </div>
              </transition>
            </div>
        </div>
      </div>
      </div>
    </div>
    <div class="header-bg"></div>
    <div v-if="width>991"  :class="[visible==true?'header-bg-popover':'']" ></div>
      <client-only>
        <vue-bottom-sheet
        max-width="400px"
        max-height="90%"
        :overlay="true"
        :click-to-close="true"
        :swipe-able="true"
        :rounded="true"
        :background-scrollable="false"
        :is-full-screen="false"
        :background-clickable="true"
         ref="myBottomSheet">
          <MenyuserMobail />
        </vue-bottom-sheet>
        <div v-if="width<991" class="bottom-bar">
          <div class="container">
            <div class="bottom-bar-con">
              <client-only>
              <div v-if="$auth.loggedIn">
                  <Menyuser/>
              </div>
              <div v-else>
                  <ModalLogout />
              </div>
               </client-only>
              <el-button
              circle
              icon="el-icon-phone-outline"
              @click=dialogVisiblePhone()>
              </el-button>
              <el-button
              circle
              icon="el-icon-more-outline"
              @click="open()">
              </el-button>
                <TimelineModal
                :worktime.sync="worktime"
                />

              <el-button
              @click="openSearch()"
              class="button-search"
              icon="el-icon-search"
              circle>
              </el-button>

              <vue-bottom-sheet
                max-width="1080px"
                max-height="90%"
                :overlay="true"
                :click-to-close="true"
                :swipe-able="false"
                :rounded="true"
                :background-scrollable="false"
                :is-full-screen="false"
                :background-clickable="true"
                @closed="hideBottomSheet"
                ref="dialogSearch">
                  <Search @toggleModal="closeSearch"/>
              </vue-bottom-sheet>
            </div>
          </div>
        </div>
        </client-only>
        <PhoneModal
        :dialogVisible.sync="dialogVisible"
        :phones.sync="phones"
        />
  </header>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
  export default {
    components:{
      'ModalLogout': () => import('~/components/aut/ModalLogout.vue'),
      'BasketModal': () => import('~/components/BasketModal.vue'),
      'Menyuser': () => import('~/components/aut/Menyuser.vue'),
      'MenyuserMobail': () => import('~/components/aut/MenyuserMobail.vue'),
      'PhoneModal': () => import('~/components/navbar/PhoneModal.vue'),
      'TimelineModal': () => import('~/components/navbar/TimelineModal.vue'),
      'CatalogModal': () => import('~/components/navbar/CatalogModal.vue'),
      'Search': () => import('~/components/navbar/Search.vue'),
    },
    data() {
      return {
        drawerMeny:false,
        visible: false,
        visibleNav:true,
        dialogCatalogVisible: false,
        adaptivSidebar:true,
        drawer: false,
        direction: 'rtl',
        width:0,
        dialogVisible: false,
        links: [],
        timeout:  null,
        show: true,
        dialogFormVisibleModal: false,
        scrollY: null,
        stateSearh:false,
        headerTop: 0,
        isHeaderSticky: false,
        clearable:true,
        loadingFirst:true,
        showFirst:false,
      };
    },
    computed:{
      ...mapGetters({
        categoryNavbar: 'category/categoryNavbar',
        manufacturer: 'category/manufacturer',
        worktime: 'main/worktime',
        phones: 'main/phones',
      }),
    },
    methods: {
      ...mapActions({
        setLoading: 'main/newLoadingItem',
        DELL_CART_BASKET_ALL: 'crate/DELL_CART_BASKET_ALL',
        Actions_categoryManuf:'category/getManufacturer',
        Actions_categoryNavbar:'category/getCategory',
        Actions_worktime:'main/getWorktime',
        Actions_phones:'main/getPhones'

      }),
      setLoadingSkeleton() {
        setTimeout(() => (
          this.loadingFirst = false,
          this.showFirst = true
          ), 1000)
      },
      dialogVisibleWork(){
        //this.Actions_worktime()
      },
      dialogVisiblePhone(){
        this.dialogVisible=true
        this.Actions_phones()
      },
      dialogCatalog(){
        this.Actions_categoryManuf()
        this.Actions_categoryNavbar()
        this.dialogCatalogVisible = true
      },
      menyCat(){
        this.Actions_categoryManuf()
        this.Actions_categoryNavbar()
        this.drawerMeny = true
      },
      categoryKirilica (item) {
      },
      open() {
        this.$refs.myBottomSheet.open();
      },
      openSearch() {
        this.$refs.dialogSearch.open();
        this.stateSearh = false
      },
      closeSearch() {
        this.$refs.dialogSearch.close();
      },
      close() {
       this.$refs.myBottomSheet.close();
      },
      hideBottomSheet(){
        this.stateSearh = true
      },

      handlerLoading(item){
        this.setLoading(true)
      },
      handlerLoadingMobail(){
        this.setLoading(true)
        this.closeSearch()
      },
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
        duration:5500,
        message: 'На Вашу почту была выслана информация о заказе! В ближайшее время с Вами свяжется менеджер для уточнения деталей заказа.',
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
         ];
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      showButton(){
      },
      even: function(arrays) {
        return arrays.slice().sort(function(a, b) {
            return a.position - b.position;
        });
      },
    },
    mounted(){
      this.setLoadingSkeleton()
      this.Actions_worktime()
      this.links = this.loadAll()
      if (process.browser){
        window.addEventListener('resize', this.updateWidth);
        this.updateWidth()
      }
      window.addEventListener('load', () => {
        window.addEventListener('scroll', () => {
          this.scrollY = Math.round(window.scrollY);
        });
        this.headerTop = this.$refs.header.getBoundingClientRect().top;
      });
    },
    watch: {
      scrollY(newValue) {
        if (newValue > this.headerTop) {
          this.isHeaderSticky = true;
        } else {
          this.isHeaderSticky = false;
        }
      },
    }
  }
</script>