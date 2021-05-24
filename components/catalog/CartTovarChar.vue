<template>
    <div>
        <div class="cost-product-char">
            <p>
                <strong>Код товара</strong>
                <span>{{char_start.name}}</span>
            </p>
            <p
            v-for="(item,idx) in char_start.filter_dict" :key="idx"
            >
                <strong>{{item.name}}</strong>
                <span>{{item.value}}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props:['product_filter'],
    data() {
        return{
            char_start:this.product_filter[0],
        }
    },
}
</script>
