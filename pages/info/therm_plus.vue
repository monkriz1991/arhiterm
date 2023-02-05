<template>
    <div class="container">
      <div class="body-sales">
            <div class="baner-product-sales">
                <h1>Цены пополам на полипропилен Wavin EKoplastik Therm PLUS</h1>
                <div class="baner-sales-img">
                    <span>-50%</span>
                    <img 
                    sizes="sm:20px md:20px lg:20px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/therm/Screenshot_8.jpg" 
                    alt="Цены пополам на полипропилен Wavin EKoplastik Therm PLUS" />
                </div>
                <p>Ликвидация складскид остатков продукции - Wavin EKoplastik 
                серии - Therm PLUS - "Белого цвета".</p>
                <p>Цены до 50% ниже на аналогичные позиции полипропилена - Wavin EKoplastik - "Серого цвета".</p>
            </div>
            <div class="product-sales-fail">
                <a href="https://new.arhiterm.by/media/manuf/WAVIN_EKOPLASTIK_THERM_PLUS_SALES.pdf" 
                download
                target="_blank"
                class="btn btn-light btn-sm mr-1 mt-2">
                Открыть всю номенклатуру остатков Wavin EKoplastik Therm PLUS
                <i class="el-icon-download"></i>
            </a>
            </div>
            <div class="product-sales-contact dilivery-cart">
                <el-drawer
                class="darwer-meny"
                :visible.sync="drawerkont"
                :with-header="true">
                <Drawerkont
                :visible.sync ="drawer" />
                </el-drawer>
                <el-button
                @click="drawerkont = true"
                class="drawer-button-meny"
                size="small"
                icon="el-icon-phone-outline"
                >Наши контакты / график работы / адреса
                </el-button>
            </div>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false,
        drawerkont: false,
        tableDataTube:[
            {
            KOD: 'BTR025P20X',
            D: '16,6',
            D1: '25',
            T: '4,2',
            L: '4000',
            }
        ],
        tableDataMufta:[
        {
            KOD: 'BNA025XXXX',
            D: '25',
            A: '16',
            L: '37,8',
            }      
        ],
        tableDataKrest:[
        {
            KOD: 'BKRI025XXX',
            D: '25',
            A: '16',
            B: '30,1',
            }        
        ],
        tableDataZag:[
        {
            KOD: 'BZA025XXXX',
            D: '25',
            A: '16',
            L: '28',
            }             
        ],
        tableDataUg:[
        {
            KOD: 'BKO12545XX',
            D: '25',
            A: '16',
            D3: '25',
            }           
        ]
      }
    },
    computed:{
    },
    components:{
        'Drawerkont': () => import('~/components/product/Drawerkont.vue'),  
    },
    methods:{
    },
    mounted(){
    },
      head() {
        return {
          title: 'Wavin EKoplastik Therm PLUS - Архитерм.',
          meta: [
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            {
              hid: 'description',
              name: 'description',
              content:  'Wavin EKoplastik Therm PLUS - скидки на продукцию Архитерм.'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Wavin EKoplastik Therm PLUS - Архитерм.',
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: 'https://arhiterm.by/logotip.png',
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: 'Wavin EKoplastik Therm PLUS - скидки на продукцию Архитерм.',
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: `https://arhiterm.by/info/therm_plus`,
            },
          ],
        link: [
            {
                rel: 'canonical',
                href: 'https://arhiterm.by/info/therm_plus'
            }
        ]
        }
      }
  }
  </script>
  
<style>
.body-sales{
    float: left;
    width: 100%;
    margin: 0 0 60px;   
}
.block-product-sales{
    float: left;
    width: 100%;
    margin: 0 0 20px;
}
.baner-sales-img{
    float: right;
    max-width: 200px;
    height: 150px;
    margin: 0 50px 0 0;
    position: relative;
}
.baner-sales-img img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.baner-sales-img span{
    position: absolute;
    background: #ff5e5e;
    border-radius: 50%;
    font-size: 25px;
    font-weight: 700;
    color: #ffffff;
    padding: 10px;
    width: 80px;
    height: 80px;
    text-align: center;
    align-items: center;
    display: flex;
    left: -30px;
    top: -25px;
}
.product-sales-img{
    float: left;
    width: 180px;
    height: 130px;
}
.product-sales-img img{
    width: 100%;
    height: 100%;
    border-radius: 16px;
    border: 1px solid #e2e2e2;
    padding: 5px;
    object-fit: contain;
}
.product-sales-des{
    margin: 0 0 0 195px;
}
.product-sales-des>strong{
    float: left;
    width: 100%;
    margin: 15px 0 15px;
    font-weight: 800;
    font-size: 15px;
}
.product-sales-des-inf{
    margin: 20px 0 0 0;
    float: left;
    width: 100%;
}
.product-sales-des-inf>strong{
    font-size: 14px;
    margin: 0 0 10px 0;
    float: left;
}
.product-sales-des-inf .el-table--border{
    border-radius: 6px;
}
.product-sales-des-inf .el-table .cell{
    font-size: 12px;
    line-height: 16px;
}
.product-sales-des-inf .el-table th.el-table__cell{
    font-weight: 500;
}
.product-sales-des-cost{
    float: left;
    width: 100%;
    margin: 10px 0 0;
    color: #5e5e5e;
}
.product-sales-des-cost>strong{
    font-weight: 900;
    font-size: 19px;
}
.product-sales-des-cost>span{
    font-size: 11px;
    font-weight: 900;
}
.product-sales-des-cost b{
    opacity: 0.5;
    font-weight: 500;
    margin: 0 10px 0;
    font-size: 17px;
}
.product-sales-des-cost .des-cost-el{
    font-size: 15px;
    font-weight: 600;
}
.product-sales-fail{
    float: left;
    width: 100%;
    margin: 0 0 20px;
    /* background-color: #fc6d00; */
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ff5e5e;
}
.product-sales-fail a{
    color: #ff5e5e;
    font-size: 19px;
    text-decoration: none;
    font-weight: 900;
    text-transform: uppercase;
}
.product-sales-des-inf .header-icon{
    margin: 0 0 0 10px;
}
.product-sales-des-inf .el-collapse-item__header{
    /* color: #eda9a9; */
    height: 40px;
    line-height: 40px;
}
.baner-product-sales{
    float: left;
    width: 100%;
    margin: 0px 0 0px;
    padding: 30px 0px;
    border-radius: 11px;
}
.baner-product-sales>h1{
    font-weight: 800;
    text-transform: uppercase;
    font-size: 24px;
    max-width: 500px;
    float: left;
    color: #ff5e5e;
    line-height: 1.4;
    text-shadow: 0 1px 0px #b4b4b4;
}
.baner-product-sales>p{
    float: left;
    width: 100%;
    margin: 0 0 10px;
    line-height: 1.4;
    font-size: 15px;
    color: #ff5e5e;
    font-weight: 500;
    text-shadow: 0 1px 0px #fefefe;
}
.product-sales-contact{
    float: left;
    width: 100%;
    margin: 0 0 20px;
}
.product-sales-contact >button{
    color: #ff5e5e !important;
    font-size: 14px !important;
    margin: 0 !important;
    text-align: left !important;
    justify-content: left;
}
.product-sales-contact >button i{
    font-size: 21px !important;
}
@media (max-width: 991px){
    .product-sales-des>strong{
        font-size: 13px;
        line-height: 1.5;
        margin: 0px 0 10px;
    }
    .product-sales-img {
        float: left;
        width: 130px;
        height: 130px;
    }
    .product-sales-des {
        margin: 0 0 0 145px;
    }
    .baner-product-sales {
    float: left;
    width: 100%;
    margin: 0px 0 0px;
    padding: 10px 0px;
    }
    .baner-product-sales>h1 {
    font-size: 20px;
    text-shadow: 0 1px 0px #f7f7f7;
    }
    .baner-sales-img {
    margin: 30px 50px 0 0;
    }
    .baner-sales-img span{
        left: -34px;
        top: -15px;
    }
    .product-sales-contact >button {
    font-size: 12px !important;
    opacity: 1;
    }
    .product-sales-fail a {
    color: #ff5e5e;
    font-size: 15px;
    }
}

</style>