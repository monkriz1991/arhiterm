<template>
    <div class="container">
        <h1 class="h1-user">{{userItem.username}}</h1>
        <p>Логин:{{userItem.username}}</p>
    </div>
</template>

<script>
import { mapGetters,mapActions,mapState } from 'vuex'
export default ({
    created() {
    },
    data(){
        return{
        }
    },
    components:{
    },
    computed:{
        ...mapGetters({
            userItem: 'main/userItem'
        })
    },
    methods:{
    }
})
</script>
