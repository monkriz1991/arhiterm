<template>
    <div class="profile-cab-right">
        <h1 class="h1-user">{{$auth.user.first_name}}</h1>
        <el-form :model="form" :rules="rules" ref="form" class="form-user-cab">
            <el-form-item
            prop="username"
            label="Логин:"
            :rules="[
            { required: true, message: 'Пожалуйста введите ваш email', trigger: 'blur' },
            { type: 'email', message: 'Пожалуйста введите корректный email', trigger: ['blur', 'change'] }
            ]"
            >
                <el-input :disabled="!disableForm" placeholder="Введите Ваш email" v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
            prop="first_name"
            label="Имя:"
            :rules="[
            { required: true, message: 'Пожалуйста введите имя', trigger: 'blur' }
            ]"
            >
                <el-input :disabled="!disableForm"  placeholder="Введите Ваше имя" v-model="form.first_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
            prop="last_name"
            label="Фамилия:"
            :rules="[
            { message: 'Пожалуйста фамилию', trigger: 'blur' }
            ]"
            >
                <el-input :disabled="!disableForm"  placeholder="Введите фамилию" v-model="form.last_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
            prop="phone_number"
            label="Телефон:"
            :rules="[
            { message: 'Пожалуйста ваш телефон', trigger: 'blur' }
            ]"
            >
                <el-input 
                :disabled="!disableForm"  
                v-mask="'+############'"
                placeholder="+375(__)___-____" 
                v-model="form.phone_number" autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item
            label="Форма"
            prop="type"
            >
                <el-select :disabled="!disableForm" v-model="form.type_of_user" placeholder="Укажите тип">
                <el-option label="Физ. лицо" value="1"></el-option>
                <el-option label="Юр. лицо" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
            v-show="form.type_of_user=='2'"
            prop="company_name"
            label="Название компании:"
            :rules="[
            { message: 'Пожалуйста название вашей компании', trigger: 'blur' }
            ]"
            >
                <el-input :disabled="!disableForm"  placeholder="Введите название компании" v-model="form.company_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
            v-show="form.type_of_user=='2'"
            prop="legal_address"
            label="Юр. адрес:"
            :rules="[
            { message: 'Пожалуйста введите юр. адрес', trigger: 'blur' }
            ]"
            >
                <el-input :disabled="!disableForm"  placeholder="Введите ваш юр. адрес" v-model="form.legal_address" autocomplete="off"></el-input>
            </el-form-item>
            <el-button
            class="but-icon-save"
            v-show="disableForm"
            size="mini"
            @click="saveForm"
            >Сохранить</el-button>
        </el-form>
        <el-button
        class="but-icon-edit"
        size="mini"
        @click="editForm()"
        >
        <span v-if="!disableForm">
            <i class="el-icon-edit"></i>
            Редактировать</span>
        <span v-else><i class="el-icon-close"></i>Закрыть</span>
        </el-button>
    </div>
</template>

<script>
import {mask} from 'vue-the-mask'
export default {
    directives: {mask},
    components:{
    },
    data() {
      return{
          disableForm:false,
          form:{
              first_name:this.$auth.user.first_name!=''?this.$auth.user.first_name:'',
              last_name:this.$auth.user.last_name!=''?this.$auth.user.last_name:'',
              username:this.$auth.user.username!=''?this.$auth.user.username:'',
              email:this.$auth.user.username!=''?this.$auth.user.username:'',
              phone_number:this.$auth.user.phone_number!=''?this.$auth.user.phone_number:'',
              type_of_user:this.$auth.user.type_of_user?''+this.$auth.user.type_of_user:'',
              company_name:this.$auth.user.company_name!=null?''+this.$auth.user.company_name:'',
              legal_address:this.$auth.user.legal_address!=null?''+this.$auth.user.legal_address:'',
          },
          rules:{

          }
      }
    },
    methods:{
        editForm(){
            this.disableForm = !this.disableForm
        },
      /**
       * отправка запроса на сохранение данных на сервер
       * @returns {Promise<void>}
       */
      async saveForm() {
          try{
            let data = await this.$axios.patch(`/users/mydata/${this.$auth.user.id}/`, this.form)
          this.$message({
            message: 'сохранено',
            showClose: true,
            duration:1000,
            type: 'success'
        });
        await this.$auth.fetchUser()
          }catch(error){
              this.parseError(error)
          }
      },
      /**
       * обработка ошибок отправки запросов
       * @param error
       */
      parseError(error){
        this.$message({
            message: 'Произошла ошибка сохранения. Попробуйте снова. Если данные не сохраняются обратитесь к менеджеру.',
            showClose: true,
            duration:4000,
            type: 'error'
        });
      }
    }
}
</script>

<style>
.form-user-cab{
    position: relative;
    float: left;
    width: 100%;
    margin: 0 0 10px;
}
.form-user-cab .el-form-item{
    float: left;
    margin: 0 0 2px;
    width: 100%;
}
.form-user-cab .el-form-item__content {
    line-height: initial;
}
.form-user-cab .el-form-item__label {
    line-height: initial;
    float: left;
    font-size: 12px;
    font-weight: 500;
    height: 32px;
    display: flex;
    align-items: center;
    width: 90px;
    text-align: left;
}
.form-user-cab .el-form-item__content{
    float: left;
}
.form-user-cab .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border-color: #ffffff;
    color: #4b4b4b;
    cursor: not-allowed;
    height: 30px;
    border-bottom: 1px solid #ffffff;
    border-radius: 2px;
    padding: 0 50px 0 0px;
    font-size: 13px;
    font-weight: 500;
    width: 250px;
}
.form-user-cab .el-input__inner{
    height: 30px;
    font-size: 13px;
    padding: 0 35px 0 0px;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-radius: 0px;
    width: 250px;
    border-bottom: 1px solid #DCDFE6;
}
.form-user-cab .but-icon-save{
    color: #ff7e40;
    font-size: 11px;
    border: 1px solid #fff;
    position: absolute;
    left: 248px;
    bottom: -52px;
    z-index: 10;
    padding: 10px 15px;
}
.form-user-cab .el-input__icon {
    line-height: 26px;
}
.h1-user{
    float: left;
    width: 100%;
    margin: 0 0 10px;
}
</style>
