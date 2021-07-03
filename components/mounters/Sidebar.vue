<template>
    <div class="mount-filter-section">
            <ul>
                <li class="cat-filter-title">
                    Монтажники
                </li>
                <el-checkbox-group v-model="checkList"
                >
                   <label class="cat-filter-check">
                       <span>Укажите тип работ</span>
                    </label>
                    <el-checkbox
                    label="tag"
                    @change="checkFil()"
                    >tag
                    </el-checkbox>
                </el-checkbox-group>
            </ul>    
    </div>
</template>

<script>
export default {
    data(){
        return{
            checkList:[]
        }
    },
    methods:{
        checkFil(){

        }
    }
}
</script>
<style>
.mount-filter-section{

}
.mount-filter-section ul{
    margin: 0;
    padding: 0;
    float: left;
    width: 100%;
}
.mount-filter-section ul>li{
    list-style:none ;
}
.mount-filter-section .cat-filter-check{
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
}
</style>