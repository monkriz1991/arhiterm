<template>
    <footer>
        <div class="footer-bg"></div>
        <div class="container">
            <div class="footer-link">
                <nuxt-link :to="`/info/about`">
                    О нас
                </nuxt-link>
                <el-divider direction="vertical"></el-divider>
                <nuxt-link :to="`/info/dostavka`">
                    Доставка
                </nuxt-link>
                <el-divider direction="vertical"></el-divider>
                <nuxt-link :to="`/info/payment`">
                    Условия оплаты / заказа / возврата
                </nuxt-link>
                <!-- <el-divider direction="vertical"></el-divider>
                <nuxt-link :to="`/info/certificates`">
                    Сертификаты
                </nuxt-link> -->
                <el-divider direction="vertical"></el-divider>
                <nuxt-link :to="`/info/contacts`">
                    Контакты
                </nuxt-link>
            </div>
            <div class="phone-footer">
                    <span>Консультация / помощь в оформлении</span>
                    <a href="tel:+37529343-16-16">+375 (29) 343-16-16</a>
                    <strong>MTC</strong><b>|</b><strong>A1</strong>
                </div>
            <div class="social-footer">
                <a href="https://www.instagram.com/arhiterm.by/" target="_blank" title="instagram arhiterm">
                    <img 
                    sizes="sm:20px md:20px lg:20px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/icons8-instagram.webp" 
                    alt="instagram arhiterm" />
                </a>
                <a href="viber://chat?number=%2B375293431616/" target="_blank" title="viber arhiterm">
                    <img 
                    sizes="sm:20px md:20px lg:20px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/icons8-viber.webp" 
                    alt="viber arhiterm" />
                </a>
            </div>
            <div class="footer-yr">
                © ООО «Архитерм», 2008-2022 г.<br> 
                Профессиональные решения для отопления, водоснабжения и канализации из Европы!<br><br>  
                Юр. адрес и почтовый адрес: 220125, Беларусь, Минская обл.,<br> 
                Минский р-н, Боровлянский с/с, дер. Копище, ул. Лопатина, 7а/1, оф. 904.<br>  
                Свидетельство о государственной регистрации № 190997472 от 11.03.2008 г.<br>  
                выдано Мингорисполкомом, администрацией Октябрьского р-на г. Минска.<br>  
                Интернет-магазин arhiterm.by зарегистрирован в торговом реестре Республики Беларусь под №422717 от 01.08.2018 г.<br><br>
                <!-- Копирование и последующее использование в коммерческих целях текстовой и графической информации, представленной на сайте arhiterm.by, запрещено. -->
             <nuxt-link class="personal-data-link-footer" :to="`/info/personal_data_rules`">Политика обработки персональных данных</nuxt-link>
            </div>
            <div class="footer-img">
                <div class="footer-img-img">
                    <img 
                    sizes="sm:50px md:50px lg:50px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/BGPB_Cashalot_card_small.webp" 
                    alt="Cashalot" 
                    title="Система оплаты Cashalot" />
                </div>
                <div class="footer-img-img">
                    <img
                    sizes="sm:50px md:50px lg:50px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/3_small.webp" 
                    alt="Кэшбэк" 
                    title="Система оплаты Кэшбэк" />
                </div>
                <div class="footer-img-img">
                    <img 
                    sizes="sm:50px md:50px lg:50px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/Cherepaha.webp" 
                    alt="Черепаха" 
                    title="Система оплаты Черепаха" />
                </div>
                <div class="footer-img-img">
                    <img 
                    sizes="sm:50px md:50px lg:50px"
                    provide="imgix"
                    loading="lazy"  
                    presets="product"
                    src="/erip.webp" 
                    alt="ЕРИП" 
                    title="Система оплаты ЕРИП" />
                </div>
                <div class="footer-img-img">
                    <img 
                    sizes="sm:50px md:50px lg:50px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/FUN_40.webp" 
                    alt="FUN" 
                    title="Система оплаты FUN" />
                </div>    
                <div class="footer-img-img">
                    <img 
                    sizes="sm:50px md:50px lg:50px"
                    provide="imgix"
                    loading="lazy"
                    presets="product"
                    src="/halva_small.webp" 
                    alt="Халва" 
                    title="Система оплаты Халва" />
                </div>
                <div class="footer-img-img">
                    <img 
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/mps-_-bepaid_belkart.webp" 
                    alt="bepaid" 
                    width="280"
                    height="25"
                    title="Система оплаты bepaid" />
                </div>
                <div class="footer-img-img">
                    <img 
                    sizes="sm:50px md:50px lg:50px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/KP_small.webp" 
                    alt="Карта покупок" 
                    title="Система оплаты Карта покупок" />
                </div>
                <div class="footer-img-img">
                    <img 
                    sizes="sm:50px md:50px lg:50px"
                    provide="imgix"
                    loading="lazy" 
                    presets="product"
                    src="/mtbank-_86_.webp" 
                    alt="МТБанк" 
                    title="Система оплаты МТБанк" />
                </div>
            </div>
        </div>
    </footer>
   
</template>

