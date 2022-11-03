<template>
    <div
    class="container">
        <Breadcrumb/>
        <el-skeleton
        :loading="loadingFirst"
        class="skeleton-cat-category"
        >
          <template slot="template" >
            <el-row :gutter="6">
                <el-col
                :xs="12" :sm="12" :md="4" :xl="4"
                v-for="(tovar, index) in 6" :key="index"
                >
                  <el-skeleton-item
                    variant="rect"
                    class="skeleton-slider-category"
                  />
                </el-col>
            </el-row>
          </template>
        </el-skeleton>
        <transition name="el-fade-in-linear">
          <SliderCat v-if="showFirst"/>
        </transition>
          <div 
          v-if="!adaptivSidebar"
          class="name-category"
          >{{categoriesNested.name}}</div>
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
            v-if="showFirst"
            />
          </transition>
        </div>
        <el-drawer
        v-else
        class="darwer-catalog"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="true">
          <Sidebar
          :categoriesNested.sync="categoriesNested"
          :categoryManuf.sync="categoryManuf"
          :adaptivSidebar.sync="adaptivSidebar"
          />
        </el-drawer>

        <el-button
        v-if="!adaptivSidebar"
        @click="drawer = true"
        class="drawer-button"
        icon="el-icon-s-operation"
        size="small"
        >
          Фильтры
        </el-button>
        <el-skeleton
        :loading="loadingFirst"
        class="skeleton-product-category"
        >
          <template slot="template" >
            <el-row :gutter="6">
                <el-col
                :xs="24" :sm="24" :md="12" :xl="12"
                v-for="(tovar, index) in 10" :key="index"
                >
                  <el-skeleton-item
                    variant="rect"
                    class="skeleton-product-img"
                  />
                  <div
                  class="skeleton-product-desc">
                    <el-skeleton-item variant="p" style="width: 100%" />
                    <div
                      style="display: flex;align-items: flex-start;flex-direction: column;"
                    >
                      <el-skeleton-item variant="text" style="height: 75px;margin: 15px 0 25px 0;" />
                      <el-skeleton-item variant="text" style="width: 50%;height: 25px;" />
                    </div>
                  </div>
                </el-col>
            </el-row>
          </template>
        </el-skeleton>
        <transition name="el-fade-in-linear">
        <CartTovar ref="CartTovar" :productsList.sync="productsList"
        :categoriesNested.sync="categoriesNested"
        :categoryManuf.sync="categoryManuf"
        v-if="showFirst"
        />
        </transition>
        <Paginated v-if="showFirst"/>
        <div v-if="showFirst" v-html="categoriesNested.description" class="cat-desc"></div>
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  mounted() {
    if (process.browser){
      window.addEventListener('resize', this.updateWidth);
      this.updateWidth()
    }
    this.setLoading()
  },
  components:{
    'Sidebar': () => import('~/components/catalog/Sidebar.vue'),
    'CartTovar': () => import('~/components/catalog/CartTovar.vue'),
    'Breadcrumb': () => import('~/components/Breadcrumb.vue'),
    'Paginated': () => import('~/components/catalog/Paginated.vue'),
    'SliderCat': () => import('~/components/catalog/SliderCat.vue'),
  },
  async asyncData ({ app, params, route, error }) {
    let parametrs = {};
    let arr_filter = []
    let object_tabs = {}
    let card_filter_rus = []
    await app.store.dispatch('product/DELL_TABS')
      if(params.id == undefined){
      let category = await app.store.dispatch('category/getCategory');
      let name_fill = ''
      for(let i in category){
        if(category[i].kirilica == params.catalog){
          params.id = category[i].id
          if(route.query['card_filter']!==undefined){
            object_tabs['card_filter'] = route.query.card_filter.split(',')
            object_tabs['card_filter_rus'] = ''
          }
          for(let item in category[i].list_filter){         
            for(let itemin in category[i].list_filter[item].chice){       
              for(let fill in object_tabs['card_filter']){
                if(object_tabs['card_filter'][fill]==category[i].list_filter[item].chice[itemin].kirilica){
                    card_filter_rus.push(category[i].list_filter[item].chice[itemin].value)
                    name_fill = '"'+ category[i].list_filter[item].chice[itemin].id +'||'+ category[i].list_filter[item].id+'"'
                    arr_filter.push(name_fill)
                }
              }
            } 
          } 
        }  
      }
      parametrs['card_filter'] = '['+arr_filter +']';
      object_tabs['card_filter_rus']= card_filter_rus
      await app.store.dispatch('product/ADD_TO_TABS',object_tabs)
    }
      if(route.query['page']!==undefined){
        parametrs['page'] = route.query['page'];
      }
      if(route.query['manuf']!==undefined){
      let arr_filter_manuf = []
      let name_fill_fill= ''
      let manuf_filter_rus = []
      let routeManuf = await app.store.dispatch('category/getCategoryManuf',params.id)
      object_tabs['manuf'] = route.query['manuf'].split(',')
      for(let item in routeManuf.results){   
        for(let fill in object_tabs['manuf']){           
          if(object_tabs['manuf'][fill]==routeManuf.results[item].kirilica){
            manuf_filter_rus.push(routeManuf.results[item].name)
              name_fill_fill = '"'+routeManuf.results[item].id +'"'
              arr_filter_manuf.push(name_fill_fill)
          }
        }
      } 
        object_tabs['manuf_filter_rus']= manuf_filter_rus
        parametrs['manuf'] = '['+arr_filter_manuf +']';
      }
  try {

    parametrs['cat'] = params.id;
    let categoriesNested =  await app.store.dispatch('category/getCategoryNested',params.id)
    let productsList =  await app.store.dispatch('product/getProductList',parametrs)
    let categoryManuf = await app.store.dispatch('category/getCategoryManuf',params.id)
    return{categoriesNested,productsList,categoryManuf}
  } catch (err) {
      console.log(err)
      return error({
          statusCode: 404,
          message: 'Товар не найдена или сервер не доступен'
      })
      }
  },
  data() {
      return {
        adaptivSidebar:true,
        drawer: false,
        direction: 'ltr',
        width:0,
        showFirst:false,
        loadingFirst: true,
      }
  },
  watch:{
    $route (to, from){
      this.$UpdsaveArr(to);
      let parametrs = {}
      let arr_filter = []
      let object_tabs = {}
      let name_fill = []
      let card_filter_rus = []
      if(to.query['card_filter']!==undefined&&to.query['card_filter']!=''){
        object_tabs['card_filter'] = to.query.card_filter.split(',')
        for(let item in this.categoriesNested.list_filter){         
          for(let itemin in this.categoriesNested.list_filter[item].chice){       
            for(let fill in object_tabs['card_filter']){
              if(object_tabs['card_filter'][fill]==this.categoriesNested.list_filter[item].chice[itemin].kirilica){
                  card_filter_rus.push(this.categoriesNested.list_filter[item].chice[itemin].value)
                  name_fill = '"'+this.categoriesNested.list_filter[item].chice[itemin].id +'||'+ this.categoriesNested.list_filter[item].id+'"'
                  arr_filter.push(name_fill)
              }
            }
          } 
        } 
        object_tabs['card_filter_rus']= card_filter_rus
        parametrs['card_filter'] = '['+arr_filter +']';
        this.ADD_TO_TABS(object_tabs)
      }else{
        this.DELL_TABS()
      }
      if(to.query['page']!==undefined ){
        parametrs['page'] = to.query['page'];
      }
      let arr_filter_manuf = []
      let name_fill_fill=''
      let manuf_filter_rus = []
      if(to.query['manuf']!==undefined&&to.query['manuf']!=''){ 
        object_tabs['manuf'] = to.query.manuf.split(',')
        for(let item in this.categoryManuf.results){   
          for(let fill in object_tabs['manuf']){          
            if(object_tabs['manuf'][fill]==this.categoryManuf.results[item].kirilica){
                manuf_filter_rus.push(this.categoryManuf.results[item].name)
                name_fill_fill = '"'+this.categoryManuf.results[item].id +'"'
                arr_filter_manuf.push(name_fill_fill)
            }
          }
        } 
        object_tabs['manuf_filter_rus']= manuf_filter_rus
        parametrs['manuf'] = '['+arr_filter_manuf +']';
        this.ADD_TO_TABS(object_tabs) 
      }else{
        this.ADD_TO_TABS(object_tabs)
      }
        parametrs['cat'] = this.categoriesNested.id;
        this.sendQuery(parametrs)
    }
  },
  methods:{
    ...mapActions({
        ADD_TO_TABS: 'product/ADD_TO_TABS',
        DELL_TABS:'product/DELL_TABS',
    }),
    setLoading() {
        setTimeout(() => (
          this.loadingFirst = false,
          this.showFirst = true
          ), 1200)
      },
    async sendQuery(parametrs){
      this.productsList = await this.$store.dispatch('product/getProductList',parametrs);
    },
    updateWidth() {
      this.width = window.innerWidth;
      if(window.innerWidth>991){
        this.adaptivSidebar = true
      }else{
        this.adaptivSidebar = false
      }
    },
  },
  head() {
    return {
      title: this.categoriesNested.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:  this.categoriesNested.description_seo
        },
        {
            hid: 'og:title',
            name: 'og:title',
            content: this.categoriesNested.name,
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: `${this.categoriesNested.img}`,
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: this.categoriesNested.description_seo,
        },
        {
            hid: 'og:url',
            property: 'og:url',
            content: `https://arhiterm.by/catalog/${this.categoriesNested.id}`,
        },          
      ]
    }
  }
}
</script>
<style>
.drawer-button{
margin:0 0 15px;
}
.skeleton-product-img{
    margin: 0 0 30px 0px;
    width: 170px !important;
    float: left; 
    height: 190px !important;
    border-radius: 10px;
}
.skeleton-product-desc{
    padding: 0px 20px 0 0 ;
    margin: 0 0 0 180px;
}
.skeleton-slider-category{
    width: 100%;
    float: left; 
    height: 70px !important;
    border-radius: 10px;
}

.skeleton-cat-category{
   
}
.skeleton-cat-category .el-skeleton{
    height: 70px !important;
    width: 100%; 
    overflow: hidden;
    margin: 15px 0 15px;
    float: left;
}
.skeleton-product-category{
    float: left;
    width: 75%;
    padding: 0px 0 0;
}
.skeleton-product-category .el-skeleton{
    margin: 95px 0 15px;
}
.skeleton-sidebar-category{
    float: left;
    width: 25%;
    padding: 0 30px 0 0;
}
.skeleton-sidebar-category .el-skeleton{
    margin: 25px 0 0px;

}
.skeleton-navbar{
    height: 46px;
    display: contents;
    opacity: 0;
}
.skeleton-navbar .el-skeleton{
    width: 0;
}
.catalog-list{
float: left;
width: 75%;
padding: 50px 0 0;
}
.catalog-list-block{
    float: left;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 10px 0 10px 10px;
    cursor: pointer;
    position: relative;
    /* border: 1px solid #f4f4f4; */
    margin: 0 0 15px;
}
.catalog-list-img{
    height: 170px;
    margin: 0 0 0px;
    width: 170px;
    float: left;
    border-radius: 7px;
    border: 1px solid #cacaca;
    position: relative;
}
.catalog-list-img:hover{
    border: 1px solid #f8d7a5;
    transition: .2s;
}
.catalog-list-block .el-image{
    float: left;
    width: 100%;
    height: 100%;
}
.catalog-list-block-desc>a:hover .catalog-list-block .el-image{
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    transition: .3s;
    border: 1px solid #fff;
}
.catalog-list-block img{
    max-width: 100%;
    max-height: 100%;
    padding: 15px;
    object-fit: contain;
    height: 100%;
    width: 100%;

}
.catalog-list-block-desc{
    margin: 0px 0 0 180px;
    display: block;
}
.catalog-list-block-desc>a,.catalog-list-block-desc>span{
    float: left;
    width: 100%;
    height: 100px;
    font-size: 13px;
    overflow: hidden;
    line-height: 1.3;
    text-decoration: none;
    color: #373737;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin: 0 0 15px;
}
.catalog-list-block-desc>a:hover,.catalog-list-block-desc>span{
    color:#000;
}
.activeImgBlock .catalog-list-img{
    border: 1px solid #ffffff;
}
.catalog-list-block-price{
    float: left;
    width: 100%;
    color: #2f2f2f;
    position: relative;
}
.catalog-list-block-price b{
    top: 8px;
    float: left;
    font-size: 11px;
    font-weight: 900;
    margin: -8px 0px 0px 0;
    color: #393939;
    /* background: #eeeeee; */
    border-radius: 7px;
    padding: 5px 7px 0px 0;
    position: relative;
    text-align: center;
}
.catalog-list-block-price>strong{
    font-size: 20px;
    font-weight: 900;
    line-height: 1;
    float: left;
}
.catalog-list-block-price>strong b{
    top: 8px;
    float: left;
    font-size: 11px;
    font-weight: 900;
    margin: -6px 0px 0px 0;
    color: #393939;
    /* background: #eeeeee; */
    border-radius: 7px;
    padding: 5px 7px 0px 0;
    position: relative;
    text-align: center;
}
.catalog-list-block-price>strong b i{
    font-weight: 900;
}
.catalog-list-block-price>span{
    font-size: 10px;
    font-weight: 800;
    margin: 6px 0 0 3px;
    float: left;
}
.catalog-list-block-discount{
    position: absolute;
    top: -10px;
    color: #fe8405;
    margin: -5px 0 0 60px;
}
.catalog-list-block-discount>strong{
    font-size: 13px;
    font-weight: 700;
    float: left;
}
.catalog-list-block-discount>span{
    font-size: 8px;
    float: left;
    margin: 5px 0 0 2px;
    font-weight: 600;
}
.catalog-list-block-cost{
    float: left;
    width: 120%;
    margin: 2px 0 0;
    opacity: 0.5;
}
.catalog-list-block-cost>strong{
    font-size: 12px;
    font-weight: 600;
    float: left;
    margin: 2px 3px 0 0;
}
.catalog-list-block-cost> b{
    font-size: 10px;
    font-weight: 500;
    padding: 4px 3px 0 0;
    float: left;
}
.catalog-list-block-cost>span{
    font-size: 9px;
    font-weight: 600;
    margin: 5px 0 0 0px;
    float: left;
}
.catalog-list-block-button{
    float: right;
    position: absolute;
    bottom: -10px;
    left: -10px;
    z-index: 14;
    background: #fff;
    padding: 3px;
    border-radius: 50%;
}
.catalog-list-block-button button{
    font-size: 28px;
    color: #181818 !important;
    background: #ffffff !important;
    border-color: #ffffff!important;
    width: auto !important;
    /* width: 32px !important; */
    /* height: 32px; */
    text-align: center;
    align-items: center;
}
.catalog-list-block-button button:hover{
    background: #fa9600 !important;
    border-color: #fa9600 !important;
    color: #FFF !important;  
}
@media only screen and (min-width: 1200px){
  .el-skeleton .el-col-lg-5{
      width: 20%;
  }
}
@media (max-width: 991px){
  .catalog-list-img{
        width: 170px;
    }
    .catalog-list-block-desc {
        margin: 0px 0 0 185px;
    }
    .catalog-list-block-desc>a, .catalog-list-block-desc>span{
        font-size: 12px;
    }
    .catalog-list-block-price>strong{
        font-size: 20px;
    }
    .catalog-list-block-price>span{
        margin: 6px 0 0 5px;
    }
    .catalog-list-block-cost>strong {
        font-size: 11px;
    }    
    .catalog-list-block-discount{
        top: -11px;
    }
    .skeleton-cat-category .el-skeleton{
        margin: 0 0 20px 0;
    }
    .skeleton-cat-category .el-skeleton{
        height: 80px !important;
    }
    .skeleton-sidebar-category{
        display: none;
    }
    .skeleton-product-img {
        width: 140px !important;
        height: 160px !important;
    }
    .skeleton-product-desc{
       margin: 0 0 0 150px;
    }
    .skeleton-product-category .el-skeleton{
        margin: 18px 0 15px;
    }
    .skeleton-product-category {
        width: 100%;
    }
    .skeleton-slider-category{
        height: 80px !important;
    }
  }
</style>
