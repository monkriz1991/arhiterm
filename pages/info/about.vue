<template>
  <div class="container">
    <div class="body-about">
      <h1>О нас</h1>
      <div class="about-content">
        <p>Компания Архитерм уже более 12 лет поставляет системы отопления, водоснабжения и канализации европейских производителей.<br> Основной ценностью нашей компании является забота о клиентах: мы быстро реагируем на запросы и пожелания наших заказчиков и обеспечиваем поставку сертифицированных товаров высокого качества.</p> 

        <p>Наша миссия: создание условий для обеспечения каждого белорусского дома качественными, надежными, экологичными и долговечными инженерными решениями за разумную цену. </p>

        <p>Являемся официальным дилером европейских производителей:<br>
        WAVIN EKOPLASTIK S.R.O., OSTENDORF KUNSTSTOFFE GMBH, WAVIN GROUP, PRO AQUA PIPE SYSTEMS, RACCORDERIE METALLICHE S.P.A., IDROSANITARIA BONOMI S.P.A., IMI HYDRONIC ENGINEERING, AQUER LTD, ERAL MAKINA.</p>

        <p>В наличии и на заказ имеется широкий спектр комплектующих для систем отопления, водоснабжения и канализации жилых зданий, которые вы можете приобрести в розницу, мелким и крупным оптом по выгодным ценам. </p>

        <p>
          <strong>Все товары сертифицированы и соответствуют требованиям строительных норм.</strong>
        Вы всегда можете получить необходимый вам товар на нашем складе в Минске, благодаря слаженной работе службы закупок, обеспечивающей своевременную комплектацию склада ходовыми позициями.<br>
        В случае необходимости поставки под заказ - осуществим ее в максимально сжатые сроки.<br>
        Для посетителей нашего интернет-магазина мы регулярно проводим различные акции и сезонные распродажи.<br>
        Предоставляем скидки постоянным клиентам и оптовым покупателям.<br>
        Оказываем консультации по выбору товара. <br>
        Осуществляем доставку по Минску и Беларуси.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed:{
  },
  components:{
  },
  methods:{
  },
  mounted(){
  },
    head() {
      return {
        title: 'О компании',
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content:  'Компания Архитерм уже более 12 лет поставляет системы отопления, водоснабжения и канализации европейских производителей.'
          },
          {
              hid: 'og:title',
              property: 'og:title',
              content: 'О компании Архитерм',
          },
          {
              hid: 'og:image',
              property: 'og:image',
              content: 'https://arhiterm.by/logotip.png',
          },
          {
              hid: 'og:description',
              property: 'og:description',
              content: 'Компания Архитерм уже более 12 лет поставляет системы отопления, водоснабжения и канализации европейских производителей.',
          },
          {
              hid: 'og:url',
              property: 'og:url',
              content: `https://arhiterm.by/info/about`,
          },
        ],
        link: [
            {
                rel: 'canonical',
                href: 'https://arhiterm.by/info/about'
            }
        ]
      }
    }
}
</script>
