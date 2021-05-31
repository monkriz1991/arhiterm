<template>
    <div class="container">
        <Sidebar/>
        <Catalog/>
        <Paginated/>
    </div>
</template>

<script>
import Sidebar from '~/components/mounters/Sidebar.vue'
import Catalog from '~/components/mounters/Catalog.vue'
import Paginated from '~/components/mounters/Paginated.vue'
export default {
    components:{
        Sidebar,
        Catalog,
        Paginated
    },
    data() {
        return {
        }
    },
    computed:{
    },
    methods:{
    },
    mounted(){
        
    },
}
</script>