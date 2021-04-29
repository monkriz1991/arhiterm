<template>
    <div class="index-topcat">
    <h4>Категории</h4>
        <el-row :gutter="20">
        <el-col 
        v-for="item in 4" :key="item"
        :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
            <nuxt-link to="/" class="nuxt-link-cat">
                <div class="index-topcat-block">
                    <strong>Трубы и фитинги для внутренней канализации
                        <span>140 / наименований</span>
                    </strong>
                    
                    <img src="~/assets/img/cat_1.png" alt="">
                </div>
            </nuxt-link>
        </el-col>
        <div class="index-topcat-all">
            <nuxt-link to="/">
                Все категории
            </nuxt-link>
        </div>
        </el-row>
    </div>
</template>
