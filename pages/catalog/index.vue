<template>
  <div class="container">
    <div class="catalog-section">
      <h1>Список категорий каталога</h1>
      <el-row :gutter="10">
        <el-col
          class=""
          v-for="(category, idx) in listCat"
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
              name: 'catalog-catalog',
              params: {
                catalog: `${category.kirilica_name}`,
                id: `${category.id}`,
              },
            }"
          >
            <div class="catalog-section-block-img">
              <nuxt-img
                provider="twicpics"
                width="100"
                height="100"
                loading="lazy"
                :src="category.img.substring(24)"
                :alt="category.name"
                presets="product"
              />
            </div>
            <span>{{ category.name }}</span>
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
      listCat: "category/categoryIndex",
    }),
  },
  head() {
    return {
      title: "Каталог товаров компании Архитерм",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "На данной странице собраны все категории интернет - магазина Arhiterm.by",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Каталог товаров компании Архитерм",
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
            "На данной странице собраны все категории интернет - магазина Arhiterm.by",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://arhiterm.by/catalog`,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://arhiterm.by/catalog",
        },
      ],
    };
  },
};
</script>
