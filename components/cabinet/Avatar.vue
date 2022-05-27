<template>
    <div class="cabinet-avatar">
        <el-upload
        class="avatar-uploader"
        :http-request="upload"
        :action="`/users/mydata/${$auth.user!==null?$auth.user.id:''}/`"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="url" :src="url!==null?url:''" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import { mapGetters,mapActions,mapState } from 'vuex'
export default ({
    created() {
    },
    data(){
        return{
            url:this.$auth.user!==null?this.$auth.user.img:'',
            imageUrl: '',
        }
    },
    components:{
    },
    computed:{

    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);


        //updateUser()

      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!');
        }
        return isLt2M;
      },
      async upload(upload) {
        var formData = new FormData();
        formData.append('img', upload.file);
        let data = await this.$axios.patch(upload.action, formData)
        this.url = data.data.img;
        console.log(data)
      },

    },
})
</script>
