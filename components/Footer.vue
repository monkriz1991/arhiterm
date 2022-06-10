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
            <div class="footer-yr">
                <div class="phone-footer">
                    <span>Консультация / помощь в оформлении</span>
                    <a href="tel:+37529343-16-16">+375 (29) 343-16-16</a>
                </div>
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
            <div class="social-footer">
                <a href="https://www.instagram.com/arhiterm.by/" target="_blank">
                    <i class="el-icon-camera-solid"></i>
                </a>
            </div>
            <div class="footer-img">
                 <nuxt-img loading="lazy"  src="/3_small.png" alt="Кэшбэк" title="Система оплаты Кэшбэк" />
                 <nuxt-img loading="lazy"  src="/BGPB_Cashalot_card_small.png" alt="Cashalot" title="Система оплаты Cashalot" />
                 <nuxt-img loading="lazy"  src="/Cherepaha.jpg" alt="Черепаха" title="Система оплаты Черепаха" />
                 <nuxt-img loading="lazy"  src="/erip.png" alt="ЕРИП" title="Система оплаты ЕРИП" />
                 <nuxt-img loading="lazy"  src="/FUN_40.jpg" alt="FUN" title="Система оплаты FUN" />
                 <nuxt-img loading="lazy"  src="/halva_small.png" alt="Халва" title="Система оплаты Халва" />
                 <nuxt-img loading="lazy"  src="/mps-_-bepaid_belkart.png" alt="bepaid" title="Система оплаты bepaid" />
                 <nuxt-img loading="lazy"  src="/KP_small.png" alt="Карта покупок" title="Система оплаты Карта покупок" />
                 <nuxt-img loading="lazy"  src="/mtbank-_86_.png" alt="МТБанк" title="Система оплаты МТБанк" />
            </div>
        </div>
        
    </footer>
   
</template>


<style>
div{
    font-size: 12px;
    line-height: 1.5;
}
</style>