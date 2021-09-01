<template>
    <div class="index-desc">
        <div class="index-desc-block" :style="{background:indexItem.bg_color}">
            <div class="index-desc-text">
                <div v-html="indexItem.title_block"></div>
                <div v-html="indexItem.description"></div>
            </div>
            <div class="index-desc-img">
                <el-image
                    :src="indexItem.img"
                    fit="contain">
                </el-image>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    props:['indexItem'],
    data() {
    return {
        image:'',
    }
    },
    computed:{
        imgBlock(){
            this.image = this.indexItem.img
            return this.image
        }
    },
    components:{
    },
    methods:{
    },
    mounted(){
    },
}
</script>