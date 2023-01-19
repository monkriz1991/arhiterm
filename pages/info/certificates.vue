<template>
  <div class="container">
    <div class="body-payment">
      <h1>Сертификаты</h1>
      <div class="payment-content">
        Компания «Архитерм» более 12 лет поставляет системы отопления, водоснабжения и канализации ведущих европейских производителей. 
        Наши партнеры – мировые лидеры в своей отрасли и, конечно, их продукция сертифицирована не только согласно белорусским, но и международным стандартам. 
        Поставляемая нами с заводов продукция имеет все необходимые сопроводительные документы, в том числе и технические свидетельства, выданные Министерством архитектуры и строительства Республики Беларусь. 
        Сертификаты на предлагаемые нами товары вы можете скачать в данном разделе. 
      </div>
      <Galery/>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
  },
  data() {
    return {
    }
  },
  computed:{
  },
  components:{
    'Galery': () => import('~/components/certificates/Galery.vue'),
  },
  methods:{
  },
  head() {
    return {
      title: 'Сертификаты производителей компании Архитерм',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:  'Поставляемая нами с заводов продукция имеет все необходимые сопроводительные документы, в том числе и технические свидетельства, выданные Министерством архитектуры и строительства Республики Беларусь.'
        },
        {
            hid: 'og:title',
            property: 'og:title',
            content: 'Сертификаты производителей компании Архитерм',
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: 'https://arhiterm.by/logotip.png',
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: 'Поставляемая нами с заводов продукция имеет все необходимые сопроводительные документы, в том числе и технические свидетельства, выданные Министерством архитектуры и строительства Республики Беларусь.',
        },
        {
            hid: 'og:url',
            property: 'og:url',
            content: `https://arhiterm.by/info/certificates`,
        },
      ]
    }
  }
}
</script>
