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
                    <nuxt-link @click.native="handlerLoading" :to="{ name: 'catalog-catalog', params: {catalog:`${category.kirilica_name}`,id:`${category.id}`} }" >
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
                <nuxt-link @click.native="handlerLoading" :to="{ name: 'factory-factory', params: {factory:`${item.kirilica_name}`,id:`${item.id}`} }" >
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
                <div v-if="visibleNav==true" >
                    <div class="button-svg-meny-cat"></div>
                    <span>Бренды</span>
                </div>
                <div class="button-svg-meny" v-else>
                    <div class="button-svg-meny-brand"></div>
                    <span>каталог</span>
                </div>
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