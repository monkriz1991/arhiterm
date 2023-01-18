<template>
    <div class="popover-nav" :class="[visible==true?'popover-nav-block':'']">
        <div class="container">
            <div @click="buttonClose" class="header-nav-meny-close">
                <i  class="el-icon-close"></i>
            </div>
            <div class="popover-nav-button">
                <div
                class="header-nav-refresh">
                    <div v-on:click="visibleNav=true" class="popover-nav-button-item" :class="[visibleNav==true?'button-item-activ':'']">
                        <div class="button-svg-meny-brand"></div>
                        <span>каталог</span>
                    </div>
                    <div v-on:click="visibleNav=false" class="popover-nav-button-item" :class="[visibleNav==false?'button-item-activ':'']">
                        <div class="button-svg-meny-cat"></div>
                        <span>Бренды</span>
                    </div>
                </div>
            </div>
            <nav class="popover-nav-nav">
                <ul
                v-show="visibleNav==true"
                class="transition-box">
                    <li
                    v-for="(category,idx) in categoryNavbar" :key="idx"
                    size="mini"
                    >
                        <nuxt-link @click.native="handlerLoading" :to="{ name: 'catalog-catalog', params: {catalog:`${category.kirilica_name}`,id:`${category.id}`} }" >
                            <nuxt-img 
                            provider="twicpics"
                            sizes="sm:200px md:400px lg:800px"
                            loading="lazy" 
                            :src="category.img.substring(24)" 
                            :alt="'Изображение категории - '+ category.name"
                            width="1024"
                            height="800"
                            quality="75"
                            />
                            {{ category.name }}
                        </nuxt-link>
                    </li>
                </ul>
                <ul
                v-show="visibleNav==false"
                class="transition-box manufacturer-navbar-ul">
                    <li
                    v-for="item in manufacturer.results"
                    :key="item.id"
                    size="mini"
                    >
                        <nuxt-link @click.native="handlerLoading" :to="{ name: 'factory-factory', params: {factory:`${item.kirilica_name}`,id:`${item.id}`} }" >
                            <nuxt-img 
                            provider="twicpics"
                            sizes="sm:200px md:400px lg:800px"
                            loading="lazy" 
                            :src="item.img.substring(24)" 
                            :alt="'Изображение бренда - '+ item.name"
                            width="1024"
                            height="800"
                            quality="75"
                            />
                            {{ item.name }}
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
  props:['categoryNavbar','manufacturer','visible'],
  data() {
    return {
        visibleNav:true,
    };
  },
  methods:{
    handlerLoading(item){
        this.$emit('update:setLoading', true)
        this.$emit('update:visible', false)
    },
    buttonClose(){
       this.$emit('update:visible', false) 
    },
  },
};
</script>