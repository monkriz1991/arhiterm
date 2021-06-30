<template>
    <div class="container">
        <Breadcrumb/>
        <Sidebar/>
        <Catalog :mounters="mounters"/>
        <Paginated/>
    </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import Sidebar from '~/components/mounters/Sidebar.vue'
import Catalog from '~/components/mounters/Catalog.vue'
import Paginated from '~/components/mounters/Paginated.vue'
export default {
    async asyncData ({ app, params, route, error }) {
    try {
        let mounters = await app.store.dispatch('mounters/getMountertList')

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
        }
    },
    computed:{
    },
    methods:{
    },
    mounted(){
        
    },
}
</script>