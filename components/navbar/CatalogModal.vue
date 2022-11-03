<template>
    <div>
        <ul
            v-if="visibleNav"
            class="transition-box">
            <li
            v-for="(category,idx) in categoryNavbar" :key="idx"
            v-show="category.show_in_start==true"
            size="mini" @click="visible = false"
            >
            <nuxt-link @click.native="handlerLoading" :to="{ name: 'catalog-catalog', params: {catalog:`${category.kirilica}`,id:`${category.id}`} }" >
                <nuxt-img 
                provider="twicpics"
                sizes="sm:200px md:400px lg:800px"
                loading="lazy" 
                :src="category.img.substring(24)" 
                :alt="category.name"
                width="1024"
                height="800"
                quality="75"
                />
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
            <nuxt-link @click.native="handlerLoading" :to="{ name: 'factory-factory', params: {factory:`${item.kirilica}`,id:`${item.id}`} }" >
                <nuxt-img 
                provider="twicpics"
                sizes="sm:200px md:400px lg:800px"
                loading="lazy" 
                :src="item.img.substring(24)" 
                :alt="item.name"
                width="1024"
                height="800"
                quality="75"
                />
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
    </div>
</template>


<script>
export default {
  props:['categoryNavbar','manufacturer','visible','dialogCatalogVisible'],
  data() {
    return {
        visibleNav:true,
    };
  },
  methods:{
    handlerLoading(item){
        this.$emit('update:setLoading', true)
        this.$emit('update:visible', false)
        this.$emit('update:dialogCatalogVisible', false)
      },
  },

};
</script>