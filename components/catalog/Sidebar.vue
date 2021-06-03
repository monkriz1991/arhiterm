<template>
    <div class="cat-filter-section">
        <div class="cat-filter">
            <!-- <h3>{{categoriesNested.name}}</h3> -->
            <ul
            v-for="category in categoriesNested.child"
            :key="category.id"
            >
                <li class="cat-filter-title">
                    {{ category.name }}
                </li>
                <el-checkbox-group v-model="checkList"
                v-for="filters in category.filters"
                :key="filters.id"
                >
                   <label class="cat-filter-check">
                       <span>{{filters.name}}</span>
                    </label> 
                    <el-checkbox 
                    v-for="checkbox in filters.filter_value"
                    :key="checkbox.id"
                    :label="checkbox.id"
                    @change="checkFil"
                    >{{checkbox.value}}
                    </el-checkbox>
                </el-checkbox-group>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //categoriesNested:[]
            checkList:[],
            checkFilId:[],
        };
    },
    computed:{
        categoriesNested(){
            return this.$store.getters['category/categoryNested']
        }
    },
    async mounted(){
        
      //this.categoriesNested = await this.$store.dispatch('category/getCategoryNested');
    },
    methods:{
        checkFil(){
            console.log(this.checkList)
        }
    },
}
</script>