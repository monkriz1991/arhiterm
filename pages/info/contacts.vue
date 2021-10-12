<template>
  <div class="container">
    <div class="body-payment">
		<h1>Контакты</h1>

		<div class="contact-block">
			<div class="contact-block-title">
				<span>Наш офис</span>
			</div>
			<div class="contact-block-img">
				<img src="~/assets/img/kontakty_arhiofis_small_.png" alt="офис компании Архитерм">
			</div>
			<div class="contact-block-inf">
				<div class="contact-block-desc">
					<span>220125, Беларусь, Минск</span>
					<span>ул. Лопатина, 7а/1, офис 904, Бизнес-центр «Премьер»</span>
					<strong>1,6 км от МКАД!</strong>
					<strong>1 км от Стройрынка «Уручье»!</strong>
				</div>
				<div class="contact-block-phone">
					<a href="">+375 (29) 343-16-16 <span>(МТС)</span></a>
					<a href="">+375 (33) 343-16-16 <span>(А1)</span></a>
				</div>
				<div class="contact-block-phone-all">
					<p>
						<strong>Viber:</strong><span>+375 (29) 343-16-16 </span>
					</p>
					<p>
						<strong>Skype:</strong><span>arhiterm.by</span>
					</p>
					<p>
						<strong>E-mail:</strong><span>info@arhiterm.by</span>
					</p>
				</div>
			</div>
		</div>

		<div class="contact-block">
			<div class="contact-block-title">
				<span>Наш склад</span>
			</div>
			<div class="contact-block-img">
				<img src="~/assets/img/kontakty_arhisklad_small_.png" alt="склад компании Архитерм">
			</div>
			<div class="contact-block-inf">
				<div class="contact-block-desc">
					<span>Беларусь, Минская обл., Боровляны, ул. 40 лет Победы, 19</span>
					<strong>Езжайте прямо по ул. 40 лет Победы до указателя "Архитерм",<br> 
					стоящего по левой стороне дороги → поверните налево и проезжайте прямо до упора к складу!</strong>
				</div>
				<div class="contact-block-phone">
					<strong>Выписка документов на складе:</strong>
					<a href="">375 (17) 265-48-57 <span>(Городской)</span></a>
					<a href="">+375 (44) 741-11-92 <span>(А1)</span></a>
				</div>

			</div>
		</div>

        <div class="section-map"> 
            <div class="map-block" id="map" style="">
                <no-ssr>
                <yandex-map
                    :coords="coords"
                    zoom=12
                    @click="onClick"
                    :controls="['fullscreenControl','zoomControl']"
                >
                <ymap-marker
                    marker-id="1"
                    :coords="[53.953153,27.677678]"
                    :balloon="{header: 'Офис',body:'Минский район, Боровлянский сельсовет, деревня Копище, улица Лопатина, 7А/1 оф.904'}"
                    marker-type="placemark"
                    cluster-name="1"
                />

                <ymap-marker
                    marker-id="2"
                    :coords="[53.993301,27.67571]"
                    :balloon="{header: 'Склад',body:'Минский район, деревня Боровляны, улица 40 лет Победы, 19'}"
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
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {

  data() {
    return {
        activeName: '',
        coords:[53.974159,27.677678],
        }
  },
  computed:{

  },
  components:{
    yandexMap, 
    ymapMarker
  },
  methods:{
    onClick(e) {
      this.coords = e.get('coords');
    }
  },
  mounted(){

  },
}
</script>
<style>

</style>
