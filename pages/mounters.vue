<template>
    <div class="container">
        <Breadcrumb/>
        <div v-if="adaptivSidebar">
            <Sidebar @updateData="updData"/>
        </div>
        <el-drawer
        v-else
        class="darwer-catalog"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="true">
            <Sidebar @updateData="updData"/>
        </el-drawer>
        <el-button
        v-if="!adaptivSidebar"
        @click="drawer = true"
        class="drawer-button"
        icon="el-icon-finished"
        size="small"
        >
          Фильтры
        </el-button>
        <div class="catalog-list-tags"></div>
        <Catalog :mounters.sync="mounters"/>
        <Paginated @updateData="updData"/>
    </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import Sidebar from '~/components/mounters/Sidebar.vue'
import Catalog from '~/components/mounters/Catalog.vue'
import Paginated from '~/components/mounters/Paginated.vue'
export default {
    mounted() {
      if (process.browser){
        window.addEventListener('resize', this.updateWidth);
        this.updateWidth()
      }
    },
    async asyncData ({ app, params, route, error }) {
    try {
        let mounters = await app.store.dispatch('mounters/getMountertList',route)

        return{mounters}
    } catch (err) {
        console.log(err)
        return error({
            statusCode: 404,
            message: 'Товар не найдена или сервер не доступен'
        })
        }

    },
    components:{
        Sidebar,
        Catalog,
        Paginated,
        Breadcrumb
    },
    data() {
        return {
          adaptivSidebar:true,
          drawer: false,
          direction: 'ltr',
          width:0,
        }
    },
    computed:{
    },
    methods:{
        async updData(){
            let mounters = await this.$store.dispatch('mounters/getMountertList',this.$route)
        },
        updateWidth() {
            this.width = window.innerWidth;
            if(window.innerWidth>991){
                this.adaptivSidebar = true
            }else{
            this.adaptivSidebar = false

            }
        },
    },
    head() {
        return {
        title: 'Монтажники Беларуси - Архитерм',
        meta: [
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            {
            hid: 'description',
            name: 'description',
            content:  'Исполнители сантех. работ рядом с вами.'
            },
                      {
                hid: 'og:title',
                name: 'og:title',
                content: 'Монтажники Беларуси - Архитерм',
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: `~/static/logotip.png`,
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: 'Исполнители сантех. работ рядом с вами.',
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: `https://arhiterm.by/mounters`,
            },
        ]
        }
    }
}
</script>
