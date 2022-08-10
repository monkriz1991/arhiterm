<template>
    <div class="container">

        <div class="profile-cab">
        <NavbarCabinet/>
        <h1 class="h1-user-cab">Профиль</h1>
            <div class="profile-cab-left">
                <Avatar/>
                <!-- <el-button 
                @click="logout"
                icon="el-icon-arrow-left" size="small"
                >Выход</el-button> -->
                <div hidden class="profile-cab-discount">
                    {{this.$auth.user.discount}}
                    <span>%</span>
                </div> 
                <div class="profile-cab-left-pass">
                    <DescriptionUser/>
                    <ChangePassword/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarCabinet from '~/components/cabinet/NavbarCabinet.vue'
import Avatar from '~/components/cabinet/Avatar.vue'
import ChangePassword from '~/components/cabinet/ChangePassword.vue'
import DescriptionUser from '~/components/cabinet/DescriptionUser.vue'
import { mapGetters,mapActions,mapState } from 'vuex'
export default ({
    middleware:['auth-cabinet'],
    created() {
    },
    data(){
        return{
        }
    },
    components:{
        Avatar,
        ChangePassword,
        DescriptionUser,
        NavbarCabinet
    },
    computed:{
        ...mapGetters({
            userItem: 'main/userItem'
        })
    },
    methods:{
        logout(){
            this.$auth.logout();
        },
    }
})
</script>
