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
                    Оплата
                </nuxt-link>
                <el-divider direction="vertical"></el-divider>
                <nuxt-link :to="`/info/certificates`">
                    Сертификаты
                </nuxt-link>
                <el-divider direction="vertical"></el-divider>
                <nuxt-link :to="`/info/contacts`">
                    Контакты
                </nuxt-link>
            </div>
            <div class="footer-yr">
                Юр. адрес и почтовый адрес: 220125, Беларусь, Минская обл.,<br> 
                Минский р-н, Боровлянский с/с, дер. Копище, ул. Лопатина, 7а/1, оф. 904.<br>  
                Свидетельство о государственной регистрации № 190997472 от 11.03.2008 г.<br>  
                выдано Мингорисполкомом, администрацией Октябрьского р-на г. Минска.<br>  
                Интернет-магазин arhiterm.by зарегистрирован в торговом реестре Республики Беларусь под №422717 от 01.08.2018 г.
 
            </div>
            <div class="footer-img">

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