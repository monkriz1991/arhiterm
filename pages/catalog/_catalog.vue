<template>
    <div class="container">
        <Sidebar/>
        <CartTovar/>
        <Paginated/>
    </div>    
</template>

<script>
import Sidebar from '~/components/catalog/Sidebar.vue'
import CartTovar from '~/components/catalog/CartTovar.vue'
import Paginated from '~/components/catalog/Paginated.vue'
export default {
    components:{
        Sidebar,
        CartTovar,
        Paginated
    },
    async asyncData ({ app, params, route, error }) {
    try {
            await app.store.dispatch('category/getCategoryNested',params.catalog)
            await app.store.dispatch('product/getProductList',params.catalog)
        } catch (err) {
            console.log(err)
            return error({
            statusCode: 404,
            message: 'Товар не найдена или сервер не доступен'
        })
        }
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