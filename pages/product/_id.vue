<template>
    <div class="container">
        <Breadcrumb/>
        <h1 class="h1-product">{{$store.state.tovar.productItem.name}}</h1>
        <h2 class="h2-product">
            <i class="el-icon-office-building"></i>
            {{$store.state.tovar.productItem.manufacturer_name}}
        </h2>
        <Galery/>
        <Cost/>
        <div class="tabs-product">
            <Tabs/>
        </div>
    </div>
</template>

<script>
import Galery from '~/components/product/Galery.vue'
import Tabs from '~/components/product/Tabs.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import Cost from '~/components/product/Cost.vue'
export default ({
  async asyncData ({ app, params, route, error }) {
        try {
            await app.store.dispatch('tovar/getProductItem',params.id)
        } catch (err) {
        console.log(err)
        return error({
            statusCode: 404,
            message: 'Товар не найдена или сервер не доступен'
        })
        }
    },
    components:{
        Galery,
        Tabs,
        Breadcrumb,
        Cost,
    }
})
</script>
