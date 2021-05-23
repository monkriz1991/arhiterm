<template>
    <div class="container">
        <h1 class="h1-product">{{product.name}}</h1>
        <h2 class="h2-product">
            <i class="el-icon-office-building"></i>
            {{product.manufacturer_name}}
        </h2>
        <Galery/>
        <Cost :product_data="product.product" />
        <div class="tabs-product">
            <Tabs/>
        </div>
    </div>
</template>

<script>
import Galery from '~/components/product/Galery.vue'
import Tabs from '~/components/product/Tabs.vue'
import Cost from '~/components/product/Cost.vue'
import { mapGetters } from 'vuex'
export default ({
    created() {
    },
    async asyncData ({ app, params, route, error }) {
        try {
            await app.store.dispatch('tovar/getProductItem',params.id)
        } catch (err) {
        return error({
            statusCode: 404,
            message: 'Товар не найдена или сервер не доступен'
        })
        }
    },
    components:{
        Galery,
        Tabs,
        Cost,
    },
    computed:{
        ...mapGetters('tovar',{
            product : 'productItem'
        })
    },

})
</script>
