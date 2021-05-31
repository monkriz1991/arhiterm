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
            class="cost-product-char-all"
            @click="showChar"
            :class="{'cost-all-top': show_char === true}"
            ><i class="el-icon-d-arrow-right"></i></div>
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
            this.show_char = !this.show_char
        }
    },
    mounted(){
    }
}
</script>
