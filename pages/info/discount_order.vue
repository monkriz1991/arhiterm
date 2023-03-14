<template>
  <div class="container">
    <div class="body-payment">
		<h1>Скидка на объём!</h1>
            <div class="basket-diskont-inf-block dis-block">
                <h5>В Архитерм действует система скидок за объем от суммы заказа.</h5>
                <span>Чем на большую сумму вы совершаете заказ – тем большую скидку на него вы получаете! </span>
                <p>
                    <span>от<strong>100</strong>руб.</span>
                    <strong>-2<span>%</span></strong>
                </p>
                <p>
                    <span>от<strong>300</strong>руб.</span>
                    <strong>-3<span>%</span></strong>
                </p>
                <p>
                    <span>от<strong>500</strong>руб.</span>
                    <strong>-5<span>%</span></strong>
                </p>
                <p>
                    <span>от<strong>1000</strong>руб.</span>
                    <strong>-7<span>%</span></strong>
                </p>
                <p>
                    <span>от<strong>2000</strong>руб.</span>
                    <strong>-10<span>%</span></strong>
                </p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    head() {
    return {
      title: 'Скидки компании Архитерм',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:  'В Архитерм действует система скидок за объем от суммы заказа.'
        },
        {
            hid: 'og:title',
            property: 'og:title',
            content: 'Доставка продукции клиентам компании Архитерм',
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: 'https://arhiterm.by/logotip.png',
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: 'В Архитерм действует система скидок за объем от суммы заказа.',
        },
        {
            hid: 'og:url',
            property: 'og:url',
            content: `https://arhiterm.by/info/discount_order`,
        },
      ],
        link: [
            {
                rel: 'canonical',
                href: 'https://arhiterm.by/info/discount_order'
            }
        ]
    }
  }
}
</script>
