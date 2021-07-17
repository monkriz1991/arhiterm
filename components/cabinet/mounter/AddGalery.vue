<template>
    <div class="mounter-add-block">
        <el-button
        type="primary"
        @click="outerVisible = true">
        Добавить работу
        </el-button>

        <el-dialog width="40%" title="" :visible.sync="outerVisible">
            <div class="mounter-form form-100">
                <el-form :model="form" :rules="rules" ref="form" class="form-user-cab">

                    <div class="mounter-form-galery">
                        <strong>Добавить изображения</strong>
                        <el-upload
                        action=""
                        list-type="picture-card"
                        :auto-upload="false"
                        :multiple="true"
                        :http-request="uploadImg"
                        :file-list="fileList1"
                        :on-change="onChangeFile"
                        :before-remove="beforeRemove"
                        :on-remove="onRemoveFile"
                        >
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>

                    <el-form-item
                    prop="title"
                    label="Название проекта:"
                    :rules="[]"
                    >
                        <el-input placeholder="Введите название" v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="city"
                    label="Регионы выполнения работ:"
                    :rules="[]"
                    >
                        <el-input placeholder="Место выполнения" v-model="form.city" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="link"
                    label="Ссылка на видео с youtube:"
                    :rules="[]"
                    >
                        <el-input placeholder="Вставьте id видео ( x3kjgg5 )" v-model="form.link" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Описание проекта:">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>

                    <el-button
                    class="but-icon-save-mounter"
                    type="primary"
                    size="mini"
                    @click="saveForm"
                    >Сохранить</el-button>
                </el-form>
            </div>


            <div slot="footer" class="dialog-footer">
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            fileList:[],
          fileList1:[],
            outerVisible: false,
            innerVisible: false,
            dialogImageUrl: '',
            dialogVisible: false,
            form:{
                city:'',
                title:'',
                desc:'',
                link:'',
            },
          rules:{

          }
        }
    },
    methods:{
      onChangeFile (file, fileList) {
        this.fileList = []
        for (let x of fileList) {
          if (x.raw) {
            this.fileList.push(x.raw)
          }
        }
      },
      beforeRemove (file, fileList) {

    },
         // remove file
    onRemoveFile (file, fileList) {
      this.fileList = []
      for (let x of fileList) {
        if (x.raw) {
          this.fileList.push(x.raw)
        }
      }
    },
        async saveForm(){
          let method = "POST";
          let form = new FormData();
          let dataImg = [];

          form.append('address',this.form.city)
          form.append('description',this.form.desc)
          form.append('title',this.form.title)
          form.append('user',this.$auth.user.id)
          form.append('link',this.form.link);
          let newPortfolio = await this.$axios({
            data:form,
            url:'/portfolio/portfolio/',
            method:method
          });

          for(let img of this.fileList){
            let formImg = new FormData();
          formImg.append('parent',newPortfolio.data.id)
            formImg.append('img',img)
            await this.$axios({ url:'/portfolio/img/',
                              method:'POST',
                              headers: { "Content-Type": "multipart/form-data" },
                              data: formImg
          });
          }

        },
      uploadImg(){
        console.log('tipo save')
      },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
    },

}
</script>
<style>
.mounter-add-block{
    float: left;
    width: 100%;
    margin: 10px 0;
    padding: 20px 0;
}
.form-100 .el-form-item__content{
max-width: 100% !important;
}
.form-100 .el-textarea__inner{
min-height: 130px !important;
}
.mounter-form-galery{
    float: left;
    width: 100%;
    margin: 0 0 20px;
}
.mounter-form-galery>strong{
    float: left;
    width: 100%;
    margin: 0 0 10px;
    font-size: 12px;
    font-weight: 500;
}
.mounter-add-block form{
    float: none;
}
</style>
