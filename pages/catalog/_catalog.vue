<template>
  <div class="container">
    <Breadcrumb />
    <div class="catalog-body">
      <div v-if="adaptivSidebar">
        <el-skeleton
          :loading="loadingFirst"
          :rows="10"
          class="skeleton-sidebar-category"
        >
        </el-skeleton>
        <transition name="el-fade-in-linear">
          <Sidebar
            :categoriesNested.sync="categoriesNested"
            :categoryManuf.sync="categoryManuf"
            :adaptivSidebar.sync="adaptivSidebar"
            v-show="showFirst"
          />
        </transition>
      </div>
      <el-drawer
        v-else
        class="darwer-catalog"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="true"
      >
        <Sidebar
          :categoriesNested.sync="categoriesNested"
          :categoryManuf.sync="categoryManuf"
          :adaptivSidebar.sync="adaptivSidebar"
        />
      </el-drawer>

      <el-skeleton
        :loading="loadingFirst"
        v-if="!adaptivSidebar"
        :rows="2"
        class="skeleton-sidebar-filter"
      >
      </el-skeleton>
      <div v-if="!adaptivSidebar" class="name-category" v-show="showFirst">
        {{ categoriesNested.name }}
      </div>
      <el-button
        v-if="!adaptivSidebar"
        @click="drawer = true"
        class="drawer-button"
        icon="el-icon-s-operation"
        size="small"
        v-show="showFirst"
      >
        Фильтры
      </el-button>
      <el-skeleton :loading="loadingFirst" class="skeleton-product-category">
        <template slot="template">
          <el-row :gutter="6">
            <el-col
              :xs="24"
              :sm="24"
              :md="12"
              :xl="12"
              v-for="(tovar, index) in 10"
              :key="index"
            >
              <el-skeleton-item variant="rect" class="skeleton-product-img" />
              <div class="skeleton-product-desc">
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
                    style="height: 85px; margin: 15px 0 35px 0"
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
      <transition name="el-fade-in-linear">
        <CartTovar
          ref="CartTovar"
          :productsList.sync="productsList"
          :categoriesNested.sync="categoriesNested"
          :categoryManuf.sync="categoryManuf"
          v-show="showFirst"
        />
      </transition>
      <Paginated v-show="showFirst" />
      <div v-show="showFirst" class="cat-desc">
        <el-collapse accordion>
          <el-collapse-item name="1">
            <template slot="title">
              <h2>Описание раздела</h2>
              <i class="header-icon el-icon-info"></i>
            </template>
            <div v-show="showFirst" v-html="categoriesNested.description"></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    if (process.browser) {
      window.addEventListener("resize", this.updateWidth);
      this.updateWidth();
    }
    this.setLoading();
    let escapeRegExp = function (string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
    if (
      this.$route.fullPath.indexOf(this.$router.options.base) == -1 &&
      this.$route.fullPath
        .toLocaleLowerCase()
        .indexOf(this.$router.options.base.toLowerCase()) == 0
    ) {
      let base = this.$router.options.base;
      let regex = new RegExp("(//[^/]+)" + escapeRegExp(base), "i");
      let newLoc = document.location.href.replace(regex, "$1" + base);
      if (newLoc != document.location.href) {
        document.location.replace(newLoc);
      }
    }
  },
  components: {
    Sidebar: () => import("~/components/catalog/Sidebar.vue"),
    CartTovar: () => import("~/components/catalog/CartTovar.vue"),
    Breadcrumb: () => import("~/components/Breadcrumb.vue"),
    Paginated: () => import("~/components/catalog/Paginated.vue"),
    // 'SliderCat': () => import('~/components/catalog/SliderCat.vue'),
  },
  async asyncData({ app, params, route, error }) {
    let parametrs = {};
    let arr_filter = [];
    let object_tabs = {};
    let card_filter_rus = [];
    await app.store.dispatch("product/DELL_TABS");
    if (params.id == undefined) {
      let category = await app.store.dispatch("category/getCategory");
      let name_fill = "";
      for (let i in category) {
        if (category[i].kirilica_name == params.catalog) {
          params.id = category[i].id;
          if (route.query["card_filter"] !== undefined) {
            object_tabs["card_filter"] = route.query.card_filter.split(",");
            object_tabs["card_filter_rus"] = "";
          }
          for (let item in category[i].list_filter) {
            for (let itemin in category[i].list_filter[item].chice) {
              for (let fill in object_tabs["card_filter"]) {
                if (
                  object_tabs["card_filter"][fill] ==
                  category[i].list_filter[item].chice[itemin].kirilica
                ) {
                  card_filter_rus.push(
                    category[i].list_filter[item].chice[itemin].value
                  );
                  name_fill =
                    '"' +
                    category[i].list_filter[item].chice[itemin].id +
                    "||" +
                    category[i].list_filter[item].id +
                    '"';
                  arr_filter.push(name_fill);
                }
              }
            }
          }
        }
      }
      parametrs["card_filter"] = "[" + arr_filter + "]";
      object_tabs["card_filter_rus"] = card_filter_rus;
      await app.store.dispatch("product/ADD_TO_TABS", object_tabs);
    }
    if (route.query["page"] !== undefined) {
      parametrs["page"] = route.query["page"];
    }
    if (route.query["manuf"] !== undefined) {
      let arr_filter_manuf = [];
      let name_fill_fill = "";
      let manuf_filter_rus = [];
      let routeManuf = await app.store.dispatch(
        "category/getCategoryManuf",
        params.id
      );
      object_tabs["manuf"] = route.query["manuf"].split(",");
      for (let item in routeManuf.results) {
        for (let fill in object_tabs["manuf"]) {
          if (object_tabs["manuf"][fill] == routeManuf.results[item].kirilica) {
            manuf_filter_rus.push(routeManuf.results[item].name);
            name_fill_fill = '"' + routeManuf.results[item].id + '"';
            arr_filter_manuf.push(name_fill_fill);
          }
        }
      }
      object_tabs["manuf_filter_rus"] = manuf_filter_rus;
      parametrs["manuf"] = "[" + arr_filter_manuf + "]";
    }
    try {
      parametrs["cat"] = params.id;
      let categoriesNested = await app.store.dispatch(
        "category/getCategoryNested",
        params.id
      );
      let productsList = await app.store.dispatch(
        "product/getProductList",
        parametrs
      );
      let categoryManuf = await app.store.dispatch(
        "category/getCategoryManuf",
        params.id
      );
      let timeAsynk = 2500;
      return { categoriesNested, productsList, categoryManuf, timeAsynk };
    } catch (err) {
      console.log(err);
      return error({
        statusCode: 404,
        message: "Товар не найдена или сервер не доступен",
      });
    }
  },
  data() {
    return {
      adaptivSidebar: true,
      drawer: false,
      direction: "ltr",
      width: 0,
      showFirst: false,
      loadingFirst: true,
      timeStart: 0,
    };
  },
  watch: {
    $route(to, from) {
      let parametrs = {};
      let arr_filter = [];
      let object_tabs = {};
      let name_fill = [];
      let card_filter_rus = [];
      if (
        to.query["card_filter"] !== undefined &&
        to.query["card_filter"] != ""
      ) {
        object_tabs["card_filter"] = to.query.card_filter.split(",");
        for (let item in this.categoriesNested.list_filter) {
          for (let itemin in this.categoriesNested.list_filter[item].chice) {
            for (let fill in object_tabs["card_filter"]) {
              if (
                object_tabs["card_filter"][fill] ==
                this.categoriesNested.list_filter[item].chice[itemin].kirilica
              ) {
                card_filter_rus.push(
                  this.categoriesNested.list_filter[item].chice[itemin].value
                );
                name_fill =
                  '"' +
                  this.categoriesNested.list_filter[item].chice[itemin].id +
                  "||" +
                  this.categoriesNested.list_filter[item].id +
                  '"';
                arr_filter.push(name_fill);
              }
            }
          }
        }
        object_tabs["card_filter_rus"] = card_filter_rus;
        parametrs["card_filter"] = "[" + arr_filter + "]";
        this.ADD_TO_TABS(object_tabs);
      } else {
        this.DELL_TABS();
      }
      if (to.query["page"] !== undefined) {
        parametrs["page"] = to.query["page"];
      }
      let arr_filter_manuf = [];
      let name_fill_fill = "";
      let manuf_filter_rus = [];
      if (to.query["manuf"] !== undefined && to.query["manuf"] != "") {
        object_tabs["manuf"] = to.query.manuf.split(",");
        for (let item in this.categoryManuf.results) {
          for (let fill in object_tabs["manuf"]) {
            if (
              object_tabs["manuf"][fill] ==
              this.categoryManuf.results[item].kirilica
            ) {
              manuf_filter_rus.push(this.categoryManuf.results[item].name);
              name_fill_fill = '"' + this.categoryManuf.results[item].id + '"';
              arr_filter_manuf.push(name_fill_fill);
            }
          }
        }
        object_tabs["manuf_filter_rus"] = manuf_filter_rus;
        parametrs["manuf"] = "[" + arr_filter_manuf + "]";
        this.ADD_TO_TABS(object_tabs);
      } else {
        this.ADD_TO_TABS(object_tabs);
      }
      parametrs["cat"] = this.categoriesNested.id;
      this.sendQuery(parametrs);
    },
  },
  methods: {
    ...mapActions({
      ADD_TO_TABS: "product/ADD_TO_TABS",
      DELL_TABS: "product/DELL_TABS",
    }),
    setLoading() {
      setTimeout(
        () => ((this.loadingFirst = false), (this.showFirst = true)),
        this.timeStart
      );
    },
    async sendQuery(parametrs) {
      this.productsList = await this.$store.dispatch(
        "product/getProductList",
        parametrs
      );
    },
    updateWidth() {
      this.width = window.innerWidth;
      if (window.innerWidth > 991) {
        this.adaptivSidebar = true;
      } else {
        this.adaptivSidebar = false;
      }
    },
  },
  head() {
    return {
      title: this.categoriesNested.name + " купить в Arhiterm.by",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.categoriesNested.description_seo,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.categoriesNested.name,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://arhiterm.by/catalog/${this.categoriesNested.kirilica_name}`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: `${this.categoriesNested.img}`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.categoriesNested.description_seo,
        },
      ],
      link: [
        {
          rel: "canonical",
          href:
            "https://arhiterm.by/catalog/" +
            this.categoriesNested.kirilica_name,
        },
      ],
    };
  },
};
</script>
