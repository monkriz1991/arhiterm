<template>
  <header ref="header" 
    class="header-tempalte"
  :class="{ 'header-container--sticky': isHeaderSticky }"
  >
    <div class="container">
      <div class="contents">
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
                v-for="category in even(categoryNavbar)"
                :key="category.id"
                v-show="category.show_in_start==true"
                size="mini" @click="visible = false"
              >
                <nuxt-link @click.native="handlerLoading" :to="`/catalog/${category.id}`">
                  <nuxt-picture loading="lazy" :src="category.img.substring(24)"/>
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
                <nuxt-link @click.native="handlerLoading" :to="`/catalog/factory/${item.id}`">
                <nuxt-picture loading="lazy" :src="item.img.substring(24)"/>
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
            <div
            v-on:click="visibleNav=!visibleNav"
            class="header-nav-refresh">
            <span v-if="visibleNav==true" >
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 260.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,412.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M1905 3843 c-28 -10 -71 -30 -96 -45 -57 -34 -155 -138 -204 -217 l-38 -61 -83 0 -84 0 0 -695 0 -695 235 0 235 0 0 695 0 695 -72 0 c-70 0 -71
                0 -53 20 55 60 219 72 360 26 44 -14 197 -85 340 -156 192 -96 282 -136 342
                -150 271 -66 562 -66 738 1 83 31 167 115 189 189 63 210 -78 387 -292 367
                -82 -8 -153 -41 -262 -122 -226 -169 -332 -167 -693 13 -246 121 -307 143
                -422 148 -70 4 -101 1 -140 -13z"/>
                <path d="M2060 1990 l0 -730 870 0 870 0 0 730 0 730 -870 0 -870 0 0 -730z
                m440 245 l0 -245 -75 0 -75 0 0 245 0 245 75 0 75 0 0 -245z m340 0 l0 -245
                -75 0 -75 0 0 245 0 245 75 0 75 0 0 -245z m330 0 l0 -245 -75 0 -75 0 0 245
                0 245 75 0 75 0 0 -245z m340 0 l0 -245 -75 0 -75 0 0 245 0 245 75 0 75 0 0
                -245z"/>
                <path d="M1320 1640 l0 -380 315 0 315 0 0 380 0 380 -315 0 -315 0 0 -380z"/>
                </g>
                </svg>
              Бренды</span>
            <span v-else>
            <svg id="book-svg" xmlns="http://www.w3.org/2000/svg" width="25.013" height="20.255" viewBox="0 0 25.013 20.255">
              <path id="Path_587" data-name="Path 587" d="M3.586,7.691,7.908,9.144a8.071,8.071,0,0,0,5.042.031c3.785-.939,11.98-2.565,12.063-2.583l-.305-1.54-.054.011-7.811-1.1a11.21,11.21,0,0,0-3.1.08L3.3,6.068a3.06,3.06,0,0,0-2.122,5.41,3.05,3.05,0,0,0-.015,4.813,3.066,3.066,0,0,0,.968,5.326l7.528,2.407a3.369,3.369,0,0,0,1.514.064L24.392,21.06s-.079-.342-.175-.765a.785.785,0,0,0-.941-.59L11.245,22.46A3.387,3.387,0,0,1,9.731,22.4L2.614,20.121a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972c0-.007,4.355,1.384,6.138,1.952a3.369,3.369,0,0,0,1.514.064l13.215-3.027s-.079-.343-.175-.765a.785.785,0,0,0-.941-.59L11.245,17.658a3.4,3.4,0,0,1-1.514-.064L2.614,15.318a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972s4.414,1.408,6.211,1.982a3.366,3.366,0,0,0,1.513.064l13.215-3.028s-.079-.342-.175-.765a.785.785,0,0,0-.941-.589L11.318,12.883A3.37,3.37,0,0,1,9.8,12.82L2.686,10.545a1.5,1.5,0,0,1,.9-2.854Z" transform="translate(0 -3.891)"/>
            </svg>
              Каталог</span>
            </div>
          </el-popover>
        </div>
        <div class="logotip">
          <nuxt-link to="/">
            <nuxt-img provider="static" loading="lazy" v-if="width>991" src="/logotip.png" alt="logotip" title="Logotip arhiterm"/>
            <nuxt-img provider="static" loading="lazy" v-else src="/logotip_orange.png" alt="logotip" title="Logotip arhiterm"/>
          </nuxt-link>
        </div>
              <div
      v-if="width<991"
      class="contents-mobail">
        <el-button slot="reference"
          class="header-cat"
          @click="dialogCatalogVisible = true"
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
            <ul
              v-if="visibleNav"
              class="transition-box">
              <li
                v-for="category in even(categoryNavbar)"
                :key="category.id"
                size="mini" @click="dialogCatalogVisible = false"
              >
                <nuxt-link @click.native="handlerLoading" :to="`/catalog/${category.id}`">
                  <nuxt-picture loading="lazy" :src="category.img.substring(24)"/>
                  <span>{{ category.name }}</span>
                </nuxt-link>
              </li>
            </ul>
            <ul
              v-else
              class="transition-box manufacturer-navbar-ul">
              <li
                v-for="item in manufacturer.results"
                :key="item.id"
                size="mini" @click="dialogCatalogVisible = false"
              >
                <nuxt-link @click.native="handlerLoading" :to="`/catalog/factory/${item.id}`">
                  <nuxt-picture loading="lazy" :src="item.img.substring(24)"/>
                  <span>{{ item.name }}</span>
                </nuxt-link>
              </li>
            </ul>
            <div
            v-on:click="visibleNav=!visibleNav"
            class="header-nav-refresh">
              <div v-if="visibleNav==true">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 260.000000"
                  preserveAspectRatio="xMidYMid meet">

                  <g transform="translate(0.000000,412.000000) scale(0.100000,-0.100000)"
                  fill="#000000" stroke="none">
                  <path d="M1905 3843 c-28 -10 -71 -30 -96 -45 -57 -34 -155 -138 -204 -217 l-38 -61 -83 0 -84 0 0 -695 0 -695 235 0 235 0 0 695 0 695 -72 0 c-70 0 -71
                  0 -53 20 55 60 219 72 360 26 44 -14 197 -85 340 -156 192 -96 282 -136 342
                  -150 271 -66 562 -66 738 1 83 31 167 115 189 189 63 210 -78 387 -292 367
                  -82 -8 -153 -41 -262 -122 -226 -169 -332 -167 -693 13 -246 121 -307 143
                  -422 148 -70 4 -101 1 -140 -13z"/>
                  <path d="M2060 1990 l0 -730 870 0 870 0 0 730 0 730 -870 0 -870 0 0 -730z
                  m440 245 l0 -245 -75 0 -75 0 0 245 0 245 75 0 75 0 0 -245z m340 0 l0 -245
                  -75 0 -75 0 0 245 0 245 75 0 75 0 0 -245z m330 0 l0 -245 -75 0 -75 0 0 245
                  0 245 75 0 75 0 0 -245z m340 0 l0 -245 -75 0 -75 0 0 245 0 245 75 0 75 0 0
                  -245z"/>
                  <path d="M1320 1640 l0 -380 315 0 315 0 0 380 0 380 -315 0 -315 0 0 -380z"/>
                  </g>
                  </svg> 
              </div>
              <div v-else>
                <svg id="book-svg" xmlns="http://www.w3.org/2000/svg" width="25.013" height="20.255" viewBox="0 0 25.013 20.255">
                  <path id="Path_587" data-name="Path 587" d="M3.586,7.691,7.908,9.144a8.071,8.071,0,0,0,5.042.031c3.785-.939,11.98-2.565,12.063-2.583l-.305-1.54-.054.011-7.811-1.1a11.21,11.21,0,0,0-3.1.08L3.3,6.068a3.06,3.06,0,0,0-2.122,5.41,3.05,3.05,0,0,0-.015,4.813,3.066,3.066,0,0,0,.968,5.326l7.528,2.407a3.369,3.369,0,0,0,1.514.064L24.392,21.06s-.079-.342-.175-.765a.785.785,0,0,0-.941-.59L11.245,22.46A3.387,3.387,0,0,1,9.731,22.4L2.614,20.121a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972c0-.007,4.355,1.384,6.138,1.952a3.369,3.369,0,0,0,1.514.064l13.215-3.027s-.079-.343-.175-.765a.785.785,0,0,0-.941-.59L11.245,17.658a3.4,3.4,0,0,1-1.514-.064L2.614,15.318a1.5,1.5,0,0,1-.97-1.881,1.5,1.5,0,0,1,1.882-.972s4.414,1.408,6.211,1.982a3.366,3.366,0,0,0,1.513.064l13.215-3.028s-.079-.342-.175-.765a.785.785,0,0,0-.941-.589L11.318,12.883A3.37,3.37,0,0,1,9.8,12.82L2.686,10.545a1.5,1.5,0,0,1,.9-2.854Z" transform="translate(0 -3.891)"/>
                </svg>
              </div>
            </div>
          </el-dialog>
          <nuxt-link
          class="link-navbar" :to="`/mounters`">
            Монтажники
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
            <div v-if="$auth.loggedIn">
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
              @openBasketNotify = "closeBasket"
              :dialogFormVisibleModal.sync="dialogFormVisibleModal"/>


              <div class="nav-button-basket button-nav-meny">
                <el-button  type="text" @click="toggleModal(true)">
                  <i class="el-icon-shopping-cart-full"></i>
                  <span v-if="width>991" class="button-nav-text">Корзина</span>
              </el-button>
              </div>
            </no-ssr>



            <div v-if="width>991" class="top-phone button-nav-meny">
              <el-button 
              circle
              icon="el-icon-phone-outline"
              @click="dialogVisible=true">
              </el-button>
                <el-popover
                  placement="bottom"
                  title="График работы"
                  width="200"
                  popper-class="work-poper"
                  trigger="click">
                  <el-button 
                  icon="el-icon-time"
                  slot="reference">
                  </el-button>
                  <div>
                    <div 
                    class="work-div"
                    v-for="(work,k) in worktime" :key="k"
                    v-if="work.week_day==0&&work.week_day<=4"
                    >
                      <strong class="work-day">Понедельник - Четверг</strong>
                      <span class="work-time">{{work.start_time.substring(0,5)}}</span>
                      <b>-</b>
                      <span class="work-time">{{work.end_time.substring(0,5)}}</span>
                      <strong class="work-comment">{{work.comment}}</strong>
                    </div> 
                    <div 
                    class="work-div"
                    v-for="(work,k) in worktime" :key="k"
                    v-if="work.week_day==4"
                    >
                      <strong class="work-day">Пятница</strong>
                      <span class="work-time">{{work.start_time.substring(0,5)}}</span>
                      <b>-</b>
                      <span class="work-time">{{work.end_time.substring(0,5)}}</span>
                      <strong class="work-comment">{{work.comment}}</strong>
                    </div> 
                    <div>
                      <strong class="work-day">Суббота / Воскресенье</strong>
                      <strong class="work-comment">Выходной</strong>
                    </div>
                  </div>
                </el-popover>
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
                  <nuxt-link @click.native="handlerLoading" :to="'/product/'+item.id">
                  <div class="search-block">
                    <div class="search-block-img">
                      <nuxt-picture loading="lazy" :src="item.img.substring(24)" alt="" />
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
    </div>
    <div v-if="width>991" class="header-bg"></div>
    <div v-if="width>991"  :class="[visible==true?'header-bg-popover':'']" ></div>
      <no-ssr>
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
              <div v-if="$auth.loggedIn">
                <Menyuser/>
              </div>
              <div v-else>
              <no-ssr>
                <ModalLogout />
              </no-ssr>
              </div>
              
              
              <el-button 
              circle
              icon="el-icon-phone-outline"
              @click="dialogVisible=true">
              </el-button>


              <el-button 
              circle
              icon="el-icon-more-outline"
              @click="open()">
              </el-button>
                <el-popover
                  placement="bottom"
                  title="График работы"
                  width="200"
                  popper-class="work-poper"
                  trigger="click">
                  <el-button 
                  icon="el-icon-time"
                  slot="reference">
                  </el-button>
                  <div>
                    <div 
                    class="work-div"
                    v-for="(work,k) in worktime" :key="k"
                    v-if="work.week_day==0&&work.week_day<=4"
                    >
                      <strong class="work-day">Понедельник - Четверг</strong>
                      <span class="work-time">{{work.start_time.substring(0,5)}}</span>
                      <b>-</b>
                      <span class="work-time">{{work.end_time.substring(0,5)}}</span>
                      <strong class="work-comment">{{work.comment}}</strong>
                    </div> 
                    <div 
                    class="work-div"
                    v-for="(work,k) in worktime" :key="k"
                    v-if="work.week_day==4"
                    >
                      <strong class="work-day">Пятница</strong>
                      <span class="work-time">{{work.start_time.substring(0,5)}}</span>
                      <b>-</b>
                      <span class="work-time">{{work.end_time.substring(0,5)}}</span>
                      <strong class="work-comment">{{work.comment}}</strong>
                    </div> 
                    <div>
                      <strong class="work-day">Суббота / Воскресенье</strong>
                      <strong class="work-comment">Выходной</strong>
                    </div>
                  </div>
                </el-popover>

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

                  <!-- <i class="el-icon-search icon-search-mobail"></i> -->
                  <el-autocomplete
                    ref="autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    :trigger-on-focus="false"
                    placeholder="Введите запрос..."
                    @select="handleSelect"
                    clearable
                    popper-class="block-search-input "
                  >
                    <template slot-scope="{ item }">
                      <nuxt-link @click.native="handlerLoadingMobail" :to="'/product/'+item.id">
                        <div class="search-block">
                        <div class="search-block-img">
                          <nuxt-picture loading="lazy" :src="item.img.substring(24)" alt="" />
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

            </vue-bottom-sheet>

            </div>
          </div>
        </div>
        </no-ssr>
        <el-dialog
          title=""
          class="modal-contact"
          append-to-body
          :visible.sync="dialogVisible"
          width="30%"
          >
          <div class="phone-modal-block">
            <div class="phone-modal-block-el">
              <span>Консультация / помощь в оформлении</span>
              <p v-for="(phone,k) in phones" :key="k">
                <a :href="`tel:${phone.phone_number}`">
                {{phone.phone_number.substring(0,4)+" "}}
                ({{phone.phone_number.substring(4,6)}})
                {{phone.phone_number.substring(6,35)}}
                </a> 
                <b>|</b>
                <strong>{{phone.operator}}</strong>
              </p>
              <p>
                <a href="viber://chat?number=%2B375293431616">
                <i class="el-icon-edit"></i></a>
                <strong>Viber</strong>
              </p>
            </div>
          </div>
        </el-dialog>
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
        dialogCatalogVisible: false,
        adaptivSidebar:true,
        drawer: false,
        direction: 'rtl',
        width:0,
        dialogVisible: false,
        links: [],
        phones:[],
        state: '',
        timeout:  null,
        show: true,
        dialogFormVisibleModal: false,
        scrollY: null,
        stateSearh:false,
        headerTop: 0,
        isHeaderSticky: false,
        clearable:true,
      };
    },
    computed:{
      ...mapGetters({
        categoryNavbar: 'category/categoryNavbar',
        manufacturer: 'category/manufacturer',
        worktime: 'main/worktime',
      })
    },
    methods: {
      ...mapActions({
        getCategory:'category/getCategory',
        getManufacturer:'category/getManufacturer',
        setLoading: 'main/newLoadingItem',
        getWorktime: 'main/getWorktime',
      }),
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
        console.log(val)
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
        // this.state=''
        // this.show = false
      },
      showButton(){
        // this.show =!this.show
        // this.state=''
      },
      async getPhones(){
        let data = await this.$axios.get(`/users/phones/?limit=9999`);
        this.phones = data.data.results;
      },
      even: function(arrays) {
        return arrays.slice().sort(function(a, b) {
            return a.position - b.position;
        });
      },
    },
    mounted(){
      this.getPhones();
      this.getCategory()
      this.getManufacturer()
      this.getWorktime()
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

<style>
</style>
