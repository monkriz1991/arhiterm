<template>
  <div class="container">
    <el-skeleton :loading="loadingFirst">
      <template slot="template">
        <el-skeleton-item variant="caption" class="skeleton-slider-index" />
      </template>
    </el-skeleton>
    <transition name="el-fade-in-linear">
      <div :class="[showFirst == false ? 'show-on-class' : '']">
        <Slider :slides="slides" />
      </div>
    </transition>

    <el-skeleton
      :loading="loadingFirst"
      style="height: 135px; overflow: hidden"
    >
      <template slot="template">
        <el-row :gutter="20">
          <el-col
            :xs="24"
            :sm="8"
            :md="8"
            :xl="8"
            v-for="(tovar, index) in 3"
            :key="index"
          >
            <el-skeleton-item
              variant="rect"
              style="
                width: 95px;
                float: left;
                height: 135px;
                border-radius: 10px;
              "
            />
            <div style="padding: 0px; margin: 0 0 0 110px">
              <el-skeleton-item variant="p" style="width: 50%" />
              <div
                style="
                  display: flex;
                  align-items: flex-start;
                  flex-direction: column;
                "
              >
                <el-skeleton-item
                  variant="text"
                  style="height: 65px; margin: 0 0 5px 0"
                />
                <el-skeleton-item
                  variant="text"
                  style="width: 50%; height: 25px"
                />
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-skeleton>

    <div class="title">
      <h1>
        Архитерм
        <vue-typer
          text="- отопление, водоснабжение, канализация!"
          erase-style="backspace"
          :pre-type-delay="70"
          :type-delay="70"
          :pre-erase-delay="1000"
          :erase-delay="100"
        ></vue-typer>
      </h1>
    </div>

    <transition name="el-fade-in-linear">
      <div :class="[showFirst == false ? 'show-on-class' : '']">
        <Top :tovar="tovar" />
      </div>
    </transition>
    <el-skeleton
      v-observe-visibility="{
        once: true,
        callback: visibilityChanged,
      }"
      :loading="loadingTwo"
      class="skeleton-index-category"
    >
      <template slot="template">
        <el-row :gutter="20">
          <el-col
            :sm="12"
            :md="12"
            :xl="6"
            :lg="5"
            :xs="12"
            v-for="(tovar, index) in 22"
            :key="index"
          >
            <el-skeleton-item
              variant="rect"
              style="
                width: 100%;
                float: left;
                margin: 0 0 20px;
                height: 170px;
                border-radius: 10px;
              "
            />
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
    <transition name="el-fade-in-linear">
      <Category v-show="showTwo" :category="category" />
    </transition>

    <el-skeleton :loading="loadingTwo" style="height: 135px; overflow: hidden">
      <template slot="template">
        <el-row :gutter="20">
          <el-col
            :xs="24"
            :sm="8"
            :md="6"
            :xl="8"
            v-for="(tovar, index) in 4"
            :key="index"
          >
            <el-skeleton-item
              variant="rect"
              style="
                width: 100%;
                float: left;
                height: 135px;
                border-radius: 10px;
              "
            />
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
    <transition name="el-fade-in-linear">
      <div :class="[showTwo == false ? 'show-on-class' : '']">
        <Brand :facturer="facturer" />
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  async asyncData({ app, params, route, error, store, $axios }) {
    // await store.dispatch('category/getCategoryIndex');
    let slides = await $axios.$get(`/administrate/get/slider/`);
    await store.dispatch("main/getTop");
    // await store.dispatch('category/getManufacturer')
    return { slides: slides.results };
  },
  components: {
    Slider: () => import("~/components/index/Slider.vue"),
    Category: () => import("~/components/index/Category.vue"),
    Top: () => import("~/components/index/Top.vue"),
    Brand: () => import("~/components/index/Brand.vue"),
  },
  data() {
    return {
      showFirst: false,
      loadingFirst: true,
      showTwo: false,
      loadingTwo: true,
      title: "Архитерм - системы отопления, водоснабжения и канализации",
    };
  },
  computed: {
    ...mapGetters({
      facturer: "category/manufacturerIndex",
      category: "category/categoryIndex",
      tovar: "main/top",
    }),
  },
  methods: {
    visibilityChanged: function (isVisible, entry) {
      if (isVisible == true) {
        this.setLoadingScroll();
      }
    },
    setLoading() {
      setTimeout(
        () => ((this.loadingFirst = false), (this.showFirst = true)),
        0
      );
    },
    setLoadingScroll() {
      setTimeout(() => ((this.loadingTwo = false), (this.showTwo = true)), 0);
    },
    ...mapActions({}),
  },
  mounted() {
    this.setLoading();
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Первый поставщик профессиональных решений для систем отопления, водоснабжения и канализации ведущих европейских производителей. Оптовая и розничная продажа, наличие наскладе, низкие цены, скидки, гарантии.",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://arhiterm.by/",
        },
      ],
    };
  },
};
</script>
