<template>
  <div class="container">
    <div class="body-payment">
      <h1>Контакты / График работы</h1>

      <div
        class="contact-block"
        itemscope
        itemtype="http://schema.org/Organization"
      >
        <div class="contact-block-title">
          <strong itemprop="name">Архитерм</strong> - <span>Наш офис</span>
        </div>
        <div class="contact-block-img">
          <img
            src="~/assets/img/kontakty_arhiofis_small_.webp"
            alt="офис компании Архитерм"
          />
        </div>
        <div class="contact-block-inf">
          <div class="contact-block-desc">
            <span>Понедельник - Четверг</span>
            <span>Офис с 8:30 до 17:30</span>
            <span>Пятница</span>
            <span>Офис с 8:30 до 17:00</span>
            <span>Суббота, Воскресенье - Выходной</span><br />
            <div
              itemprop="address"
              itemscope
              itemtype="http://schema.org/PostalAddress"
            >
              <span itemprop="postalCode">220081</span>
              <span itemprop="addressLocality">Минск</span>
              <span itemprop="streetAddress"
                >ул. Лопатина, 7а/1, офис 904, Бизнес-центр «Премьер»</span
              >
              <strong>1,6 км от МКАД!</strong>
              <strong>1 км от Стройрынка «Уручье»!</strong>
            </div>
          </div>
          <div class="contact-block-phone">
            <a href="tel:+375293431616" itemprop="telephone"
              >+375 (29) 343-16-16 <span>(А1)</span></a
            >
            <a href="tel:+375333431616" itemprop="telephone"
              >+375 (33) 343-16-16 <span>(МТС)</span></a
            >
          </div>
          <div class="contact-block-phone-all">
            <p><strong>Viber:</strong><span>+375 (29) 343-16-16 </span></p>
            <p><strong>Skype:</strong><span>arhiterm.by</span></p>
            <p>
              <strong>E-mail:</strong
              ><span itemprop="email">info@arhiterm.by</span>
            </p>
          </div>
        </div>
      </div>

      <div class="contact-block">
        <div class="contact-block-title">
          <span>Наш склад</span>
        </div>
        <div class="contact-block-img">
          <img
            src="~/assets/img/kontakty_arhisklad_small_.webp"
            alt="склад компании Архитерм"
          />
        </div>
        <div class="contact-block-inf">
          <div class="contact-block-desc">
            <span>Понедельник - Четверг</span>
            <span>Склад с 8:30 до 16:30</span>
            <span>Пятница</span>
            <span>Склад с 8:30 до 16:00</span>
            <span>Суббота, Воскресенье - Выходной</span><br />
            <span
              >Беларусь, Минская обл., Боровляны, ул. 40 лет Победы, 19</span
            >
            <strong
              >Езжайте прямо по ул. 40 лет Победы до указателя "Архитерм",<br />
              стоящего по левой стороне дороги → поверните налево и проезжайте
              прямо до упора к складу!</strong
            >
          </div>
          <div class="contact-block-phone">
            <strong>Выписка документов на складе:</strong>
            <a href="tel:+375175472120"
              >375 (17) 547-21-20 <span>(Городской)</span></a
            >
            <a href="tel:+375447411192"
              >+375 (44) 741-11-92 <span>(А1)</span></a
            >
          </div>
        </div>
      </div>
      <div class="social-footer">
        <a
          href="https://instagram.com/arhiterm.by"
          rel="external nofollow"
          target="_blank"
          title="instagram arhiterm"
        >
          <img
            width="20"
            height="20"
            provide="imgix"
            loading="lazy"
            presets="product"
            src="/icons8-instagram.webp"
            title="Логотип instagram arhiterm"
            alt="instagram arhiterm"
          />
          <span hidden>Instagram arhiterm</span>
        </a>
        <a
          href="viber://chat?number=%2B375293431616/"
          rel="nofollow"
          target="_blank"
          title="viber arhiterm"
        >
          <img
            width="20"
            height="20"
            provide="imgix"
            loading="lazy"
            presets="product"
            src="/icons8-viber.webp"
            title="Логотип viber arhiterm"
            alt="viber arhiterm"
          />
          <span hidden>viber arhiterm</span>
        </a>
      </div>
      <div class="section-map">
        <div class="map-block" id="map" style="">
          <no-ssr>
            <yandex-map
              :coords="coords"
              zoom="12"
              @click="onClick"
              :controls="['fullscreenControl', 'zoomControl']"
            >
              <ymap-marker
                marker-id="1"
                :coords="[53.953153, 27.677678]"
                :balloon="{
                  header: 'Офис',
                  body: 'Минский район, Боровлянский сельсовет, деревня Копище, улица Лопатина, 7А/1 оф.904',
                }"
                marker-type="placemark"
                cluster-name="1"
              />

              <ymap-marker
                marker-id="2"
                :coords="[53.99052, 27.68232]"
                :balloon="{
                  header: 'Склад',
                  body: 'Минский район, деревня Боровляны, улица 40 лет Победы, 19',
                }"
                marker-type="placemark"
                cluster-name="1"
              />
            </yandex-map>
          </no-ssr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
  data() {
    return {
      activeName: "",
      coords: [53.974159, 27.677678],
    };
  },
  computed: {},
  components: {
    yandexMap,
    ymapMarker,
  },
  methods: {
    onClick(e) {
      this.coords = e.get("coords");
    },
  },
  mounted() {},
  head() {
    return {
      title: "Контакты компании",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Контактные данные нашей компании, телефоны, email, а так же график работы и адреса офиса и склада.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Контакты компании Архитерм",
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
            "Контактные данные нашей компании, телефоны, email, а так же график работы и адреса офиса и склада.",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://arhiterm.by/info/contacts`,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://arhiterm.by/info/contacts",
        },
      ],
    };
  },
};
</script>
