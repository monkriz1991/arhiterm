<template>
    <el-autocomplete
    ref="autocomplete"
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    :trigger-on-focus="true"
    :autofocus="true"
    placeholder="Введите запрос..."
    @select="handleSelect"
    popper-class="block-search-input "
    >
    <template slot-scope="{ item }">
        <nuxt-link @click.native="handlerLoadingMobail"  :to="{ name: 'product-product', params: {product:`${item.kirilica_name}`,id:`${item.kirilica_name}`} }">
        <div class="search-block">
        <div class="search-block-img">
            <nuxt-img 
            provider="twicpics"
            sizes="sm:200px md:400px lg:800px"
            loading="lazy" 
            :src="item.img.substring(24)" 
            :alt="item.name"
            width="1024"
            height="880"
            quality="75"
            />
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
</template>


<script>
export default {
  data() {
    return {
        state: '',
    };
  },
  methods:{
    querySearchAsync(queryString, cb) {
    
        var links = this.links;
        let results = [ { "value":'По данному запросу ничего не найдено'}];
        this.$axios.get(`/catalog/search/?search=${queryString}&limit=9999999`).then(function (result){
            cb(result.data.results);
        }).catch(function (e){results = [ { "value":'По данному запросу ничего не найдено'}];})
      },
      handleSelect(item) {
      },
      handlerLoadingMobail(){
        this.$emit('update:visible', false)
        this.$emit('toggleModal')
      },
  },

};
</script>