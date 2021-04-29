<template>
    <div class="index-brand">
    <h4>Производители</h4>
        <el-row :gutter="20">
            <el-col 
            v-for="item in 4" :key="item"
            :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <nuxt-link to="/" class="nuxt-link-cat">
                    <div class="index-brand-block">
                        <strong>Доступные материалы, новинки<span>TECE</span></strong>
                        <img src="~/assets/img/tce.png" alt="">
                    </div>
                </nuxt-link>
            </el-col>
            <div class="index-brand-all">
                <nuxt-link to="/">
                    Все производители
                </nuxt-link>
            </div>
        </el-row>
    </div>
</template>
