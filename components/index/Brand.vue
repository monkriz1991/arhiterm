<template>
    <div class="index-brand">
    <h4>Производители</h4>
        <el-row >
            <hooper :itemsToShow="4">
                <slide
                    v-for="item in category.results" :key="item.id"
                >
                    <nuxt-link to="/" class="nuxt-link-cat">
                        <div class="index-brand-block">
                            <div class="index-brand-block-desc">
                                <strong v-if="item.description !== 'undefined'">
                                    {{item.description}}
                                </strong>
                                <span>{{item.name}}</span>
                            </div>
                            <img 
                                :src="item.img" 
                                :alt="item.name"
                            >
                        </div>
                    </nuxt-link>
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
                <hooper-pagination slot="hooper-addons"></hooper-pagination>
            </hooper>
            <div class="index-brand-all">
                <nuxt-link to="/">
                    Все производители
                </nuxt-link>
            </div>
        </el-row>
    </div>
</template>


<script>
import { mapGetters,mapActions } from 'vuex'
import { Hooper, Slide, 
Pagination as HooperPagination,
Navigation  as HooperNavigation 
} from 'hooper';
import 'hooper/dist/hooper.css';
export default ({
    components: {
        Hooper,
        Slide,
        HooperPagination,
        HooperNavigation
    },
    data() {
        return {
        }
    },
    computed:{
      ...mapGetters({
        category: 'category/manufacturerIndex'
      })
    },
    mounted(){
      this.getManufacturerIndex()
    },
    methods:{
      ...mapActions('category',['getManufacturerIndex'])
    }
})
</script>