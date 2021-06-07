<template>
    <div class="container">
        <h1 class="h1-user">{{userItem.username}}</h1>
        <p>Логин:{{userItem.username}}</p>
        <div>
            <Avatar :userItem = "userItem"/>
        </div>
    </div>
</template>

<script>
import Avatar from '~/components/cabinet/Avatar.vue'
import { mapGetters,mapActions,mapState } from 'vuex'
export default ({
    created() {
    },
    data(){
        return{
        }
    },
    components:{
        Avatar
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
