<template>
  <div class="cost-product-block">
    <div class="cost-product-input">
      <strong>{{ name_radioGroup }}</strong>
      <div class="cost-row">
        <div class="cost-div" v-for="(item, idx) in product_data" :key="idx">
          <el-radio
            @change="changePrice(item, idx)"
            :label="idx"
            v-model="radio"
            :disabled="disableRadio"
            size="mini"
            :class="{ 'check-backet': findMatch(item.id) }"
            border
          >
            <i v-show="findMatch(item.id)" class="el-icon-shopping-cart-2"></i>
            <strong v-if="item.filter_show_value">{{
              item.filter_show_value
            }}</strong>
            <strong v-else>
              {{ item.name }}
            </strong>
            <el-popover
              v-if="item.count == 0"
              placement="top"
              width="200"
              trigger="click"
              content="Позиция под заказ!"
            >
              <el-button
                slot="reference"
                icon="el-icon-warning-outline"
                size="mini"
                circle
              ></el-button>
            </el-popover>
          </el-radio>
        </div>
      </div>
    </div>
    <div class="kod-product">
      <!-- <el-tooltip class="item" effect="dark" content="Код товара" placement="top-start">
            <i class="el-icon-info"></i>
            </el-tooltip> -->
      <span>Код товара</span>
      <b>:</b>
      <strong>{{ kodProduct }}</strong>
      <div class="kod-product-comment" v-if="coment_product">
        <i class="el-icon-warning"></i>
        {{ coment_product }}
      </div>
    </div>
    <div class="cost-product-price-catalog">
      <span>{{ priceCart }}</span>
      <strong>руб</strong>
    </div>
    <div
      class="cost-product-price"
      itemprop="offers"
      itemscope
      itemtype="https://schema.org/Offer"
    >
      <div v-if="discont" class="catalog-list-block-discount">
        <strong
          ><span class="cost-price">{{ discont }}</span
          ><span class="name-price">руб/{{ units }}</span></strong
        >
      </div>
      <meta itemprop="priceCurrency" content="BYN" />
      <span itemprop="price">{{ price }}</span>
      <strong>руб.</strong>

      <strong class="cost-product-price-unit"> - 1 {{ units }}</strong>
      <!-- <link itemprop="availability" href="http://schema.org/InStock"> -->
    </div>
    <el-button
      type="danger"
      :disabled="disableButton"
      @click="addToCart"
      :class="{ 'hiden-class': disableButton === 'hiden' }"
    >
      <span v-if="disableButton === false">В корзину</span>
      <span v-else>В корзине</span>
    </el-button>
    <div class="cost-product-amount">
      <el-input-number
        v-model="num"
        :step="multiplicity"
        :disabled="disableButton"
        size="mini"
        @change="handleChange"
        :min="multiplicity"
      >
      </el-input-number>
      <el-popover
        v-if="multiplicity > 1"
        placement="top"
        width="220"
        trigger="click"
      >
        <div>
          Стоимость указана за 1 {{ units }},<br />
          заказ кратно
          <span v-if="units == 'шт'">{{ multiplicity }} {{ units }}</span>
          <span v-else>{{ multiplicity }} {{ units }}</span>
        </div>
        <el-button
          type="info"
          slot="reference"
          icon="el-icon-warning-outline"
          size="mini"
          circle
        ></el-button>
      </el-popover>
    </div>
    <!-- <el-button
          type="danger"
          @click="addToChosen"
          icon="el-icon-document-add"
        >
        </el-button> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [
    "product_data",
    "price",
    "discont",
    "units",
    "multiplicity",
    "kodProduct",
  ],
  data() {
    return {
      num: 1,
      active_id: null,
      coment_product:
        this.product_data[0] != undefined ? this.product_data[0].comment : "",
      arr_basket_id: [],
      classBasket: "none-basket",
      input_cost:
        this.product_data[0] != undefined ? this.product_data[0].price : 0,
      radio: 0,
      priceCart: 0,
      count: this.multiplicity,
      discont_price:
        this.product_data[0].discont != null ? this.product_data[0].discont : 0,
      disableButton: false,
      disableRadio: false,
      name_radioGroup:
        this.product_data[0].filter_show_name != null
          ? this.product_data[0].filter_show_name
          : "Артикул",
    };
  },
  mounted() {
    this.discontStart(this.product_data[0]);
    this.editProduct(this.product_data[0].id);
  },
  computed: {
    ...mapGetters({
      basket: "crate/basket",
    }),
  },
  watch: {
    basket: {
      handler(val, arr) {
        if (arr.length == 0) {
          this.editProduct("arrNull");
        }
        for (let i of arr) {
          this.editProduct(i.product[0].id);
        }
        for (let i of val) {
          if (this.active_id != null && this.active_id.id == i.product[0].id) {
            this.editProduct(i.product[0].id);
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    changePrice(item) {
      this.count = this.multiplicity;
      this.active_id = item;
      this.input_cost =
        item.discont == null
          ? Math.ceil(item.price * this.multiplicity * 100) / 100
          : Math.ceil(item.price * this.multiplicity * 100) / 100;
      this.$emit("update:price", item.price);
      this.priceCart =
        item.discont == null
          ? Math.ceil(item.price * this.multiplicity * 100) / 100
          : Math.ceil(item.price * this.multiplicity * 100) / 100;
      this.name_radioGroup =
        item.filter_show_name != null ? item.filter_show_name : "Артикул";
      this.$emit("NewChar", item);
      this.$emit("update:discont", item.discont);
      this.$emit("update:kodProduct", item.name);
      this.disableButton = false;
      this.num = 1;
      this.editProduct(item.id);

      if (item.price == "0.00") {
        this.disableButton = "hiden";
      }
      this.coment_product = item.comment;
    },
    addToChosen() {
      this.$emit("addToChosen", {
        data: this.active_id == null ? this.product_data[0] : this.active_id,
      });
    },
    /** Добавление товара в корзину */
    addToCart() {
      this.$emit("addToCart", {
        data: this.active_id == null ? this.product_data[0] : this.active_id,
        count_el: this.count,
        cost: this.priceCart,
        multiplicity: this.multiplicity,
      });
      this.disableButton = true;
      this.classBasket = "in-basket";
      this.arr_basket_id.push(
        this.active_id == null ? this.product_data[0].id : this.active_id.id
      );
      this.open();
    },
    roundToNearest(number, multiple) {
      return Math.ceil(number / multiple) * multiple;
    },
    sleep() {},
    editProduct(item) {
      if (item == "arrNull") {
        this.handleChange(this.multiplicity);
      }
      this.arr_basket_id = [];
      this.disableButton = false;
      this.classBasket = "none-basket";
      for (let i in this.basket) {
        this.arr_basket_id.push(this.basket[i].product[0].id);
        if (this.basket[i].product[0].id == item) {
          this.disableButton = true;
          if (
            this.active_id != null &&
            this.basket[i].product[0].id != this.active_id.id
          ) {
            this.disableButton = false;
          }
          if (
            this.active_id != null &&
            this.basket[i].product[0].id == this.active_id.id
          ) {
            this.num = this.basket[i].product[0].count_el;
            this.handleChange(this.basket[i].product[0].count_el);
          }
          if (this.active_id == null && this.basket[i].product[0].id) {
            this.num = this.basket[i].product[0].count_el;
            this.handleChange(this.basket[i].product[0].count_el);
          }
        }
      }
    },
    discontStart(item) {
      this.priceCart =
        item != undefined
          ? Math.ceil(item.price * this.multiplicity * 100) / 100
          : 0;
      this.input_cost =
        item != undefined
          ? Math.ceil(item.price * this.multiplicity * 100) / 100
          : 0;
    },
    /** Изменение кол. товара */
    handleChange(value) {
      this.num = value;
      if (value % this.multiplicity !== 0) {
        this.num = this.roundToNearest(value, this.multiplicity);
        setTimeout(this.sleep, 100);
      }
      this.count = value;

      if (this.multiplicity > 1) {
        value = value / this.multiplicity;
      }

      this.priceCart = Math.ceil(this.input_cost * value * 100) / 100;
    },
    findMatch(id) {
      return this.arr_basket_id.includes(id);
    },
    open() {
      const h = this.$createElement;
      this.$notify({
        //title: 'Товар в корзине',
        dangerouslyUseHTMLString: true,
        duration: 3000,
        message: h(
          "el-button",
          {
            on: { click: this.dialogBasketModal },
            class: "el-icon-shopping-cart-full",
          },
          "Перейти в корзину"
        ),
        // offset: 100
      });
    },
    dialogBasketModal() {
      this.$emit("toggleModal", true);
    },
  },
};
</script>

<style>
body .el-popover--plain {
  padding: 10px 10px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}
.cost-product-input .check-backet {
  border: 1px solid #fa9600;
}
.cost-product-input .check-backet.is-bordered.is-checked {
  border-color: #fa9600 !important;
}
.cost-product-input .check-backet.is-checked .el-radio__inner {
  border-color: #fa9600 !important;
  background: #fa9600 !important;
}
.cost-product-input .el-icon-shopping-cart-2 {
  position: absolute;
  bottom: -8px;
  background: #fff;
  font-size: 21px;
  left: -5px;
  color: #fa9600;
  border-radius: 50%;
  font-weight: 800;
}
.cost-product-input .el-radio--mini.is-bordered {
  padding: 6px 10px 0 10px;
}
</style>
