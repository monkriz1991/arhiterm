<template>
  <div class="container">
    <div class="catalog-section">
      <h1>Список брендов каталога</h1>
      <el-row :gutter="10">
        <el-col
          class=""
          v-for="(manuf, idx) in listManuf.results"
          :key="idx"
          :sm="12"
          :md="12"
          :xl="6"
          :lg="5"
          :xs="12"
        >
          <nuxt-link
            class="catalog-section-block"
            :to="{
              name: 'factory-factory',
              params: {
                factory: `${manuf.kirilica_name}`,
                id: `${manuf.id}`,
              },
            }"
          >
            <div class="catalog-section-block-img">
              <nuxt-img
                provider="twicpics"
                width="100"
                height="100"
                loading="lazy"
                :src="manuf.img.substring(24)"
                :alt="manuf.name"
                presets="product"
              />
            </div>
            <span>{{ manuf.name }}</span>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      listManuf: "category/manufacturerIndex",
    }),
  },
  head() {
    return {
      title: "Бренды ( производители ) компании Архитерм",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "На данной странице собраны все бренды ( производители ) интернет - магазина Arhiterm.by",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Бренды ( производители ) компании Архитерм",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://arhiterm.by/logotip.png",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "На данной странице собраны все бренды ( производители ) интернет - магазина Arhiterm.by",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://arhiterm.by/factory`,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://arhiterm.by/factory",
        },
      ],
    };
  },
};
</script>
