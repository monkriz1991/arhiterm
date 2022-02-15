<template>
    <div class="container">
        <NavbarCabinet/>
        <h1 class="h1-user-cab">Профиль</h1>
        <div class="profile-cab">
            <div class="profile-cab-left">
                <Avatar/>
                <div class="profile-cab-left-pass">
                    <ChangePassword/>
                    <el-button 
                    @click="logout"
                    icon="el-icon-arrow-left" size="small"
                    >Выход</el-button>
                </div>
            </div>
            <DescriptionUser/>
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
<style>
.profile-cab{
    float: left;
    width: 100%;
}
.h1-user-cab{
    float: left;
    width: 100%;
    margin: 0 0 20px;
    font-weight: 500;
    font-size: 17px;
}
.profile-cab-left{
    float: left;
}
.profile-cab-right{
    padding: 0 0 0 10px;
    margin: 0 0 0 200px;
    position: relative;
}
.profile-cab-left .el-button,.avatar-uploader{
    margin: 0px 0 10px;
}
.profile-cab-right .but-icon-edit{
    font-size: 12px;
    margin: 10px 0 0 0;
    border: 1px solid #fff;
    padding: 12px 20px;
}
.profile-cab-right:after{
    content: '';
    height: 1px;
    /* border-bottom: 1px solid #e2e2e2; */
    width: 147px;
    position: absolute;
    bottom: 12px;
    left: 145px;
}
</style>