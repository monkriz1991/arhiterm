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
                 <img src="~/assets/img/3_small.png"/>
                 <img src="~/assets/img/BGPB_Cashalot_card_small.png"/>
                 <img src="~/assets/img/Cherepaha.jpg"/>
                 <img src="~/assets/img/erip.png"/>
                 <img src="~/assets/img/FUN_40.jpg"/>
                 <img src="~/assets/img/halva_small.png"/>
                 <img src="~/assets/img/mps-_-bepaid_belkart.png"/>
                 <img src="~/assets/img/KP_small.png"/>
                 <img src="~/assets/img/mtbank-_86_.png"/>
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