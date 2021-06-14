<template>
    <div>
        <el-upload
        class="avatar-uploader"
        :action="`/users/mydata/${$auth.user.id}/`"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="url" :src="url" class="avatar">
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
            url:this.$auth.user.img,
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
      }
    },
    actionImg(){
      console.log('okoko')
    },
    async updateUser(){
      let formData = new FormData(); // создаем форму
      formData.append('img', this.files); //записываем туда фотки из компонента (в данном случае из <v-img>)
      reader.addEventListener("load", function () {
        this.imagePreview = reader.result;
        this.user.img = this.imagePreview;
      }.bind(this), false);

      formData.append('username', this.user.username);
      formData.append('is_staff', this.user.is_staff?this.user.is_staff:false);
      formData.append('is_superuser', this.user.is_superuser?this.user.is_superuser:false);
      formData.append('sex', this.user.sex?this.user.sex:1);
      formData.append('is_active', true);

      let res = await this.$axios.put(`/users/mydata/${this.$auth.user.id}/`,formData);
      if(res.status=='200'){

      }else{

      }
    }
})
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>