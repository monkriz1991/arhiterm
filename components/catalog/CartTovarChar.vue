<template>
    <div>
        <div class="cost-product-char">
            <p>
                <strong>Код товара</strong>
                <span>{{char_start.name}}</span>
            </p>
            <p
            v-for="(item,idx) in char_start.filter_dict" :key="idx"
            v-show="show_char"
            >
                <strong>{{item.name}}</strong>
                <span>{{item.value}}</span>
            </p>
            <div
            @click="showChar"
            >all</div>
        </div>
    </div>
</template>

<script>
export default {
    props:['product_filter','new_char'],
    data() {
        return{
            char_start:this.product_filter[0],
            show_char:false
        }
    },
    computed:{
    },
    watch: {
        new_char() {
            this.char_start = this.new_char;
        },
    },
    methods:{
        showChar(idx){
            console.log()
            this.show_char = !this.show_char
        }
    },
    mounted(){
    }
}
</script>
