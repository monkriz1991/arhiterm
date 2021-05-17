<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
            <el-breadcrumb-item
                v-for="(item, i) in breadcrumbs"
                :key="i"
                :to="{path:item.href}"
            >
                {{item.text}}
            </el-breadcrumb-item>
            <a href="">{{nameCat.name}}</a>
            <a href="">{{nameProduct.name}}</a>
        </el-breadcrumb>
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
        }
    },
    // props:{
    //   crumb:{
    //     type:Array,
    //     default(){
    //       return{}
    //     }
    //   }
    // },
    computed: {
        ...mapGetters({
            nameCat:'category/categoryNested',
            nameProduct:'tovar/productItem'
        }),
        breadcrumbs () {
        let pathArray = this.$route.path.split('/')
        pathArray.shift()
        const breadCrumbs = []
        let breadcrumb = ''
        let text = ''
        for (let i = 0; i < pathArray.length; ++i) {
            breadcrumb += "/" + pathArray[i]  
            if(i ==0){
                text = pathArray[i]   
            } 
        }
        breadCrumbs.push({
            href: breadcrumb, 
            text: text
        })
        return breadCrumbs
        }
    },
};
</script>