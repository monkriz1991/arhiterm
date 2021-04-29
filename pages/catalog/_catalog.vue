<template>
    <div class="container">
        <Breadcrumb/>
        <Sidebar/>
        <CartTovar/>
        <Paginated/>
     
    </div>    
</template>

<script>
import Sidebar from '~/components/catalog/Sidebar.vue'
import CartTovar from '~/components/catalog/CartTovar.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import Paginated from '~/components/catalog/Paginated.vue'
export default {
    components:{
        Sidebar,
        CartTovar,
        Breadcrumb,
        Paginated
    },
    async fetch({store,params}){
        await store.dispatch('category/getCategoryNested',params.catalog)
        await store.dispatch('product/getProductList',params.catalog)
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