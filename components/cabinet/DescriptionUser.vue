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
                <el-input :disabled="!disableForm"  placeholder="Введите ваш телефон" v-model="form.phone_number" autocomplete="off"></el-input>
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
            <el-button
            class="but-icon-save"
            v-show="disableForm"
            size="mini"
            @click="saveForm"
            >Сохранить</el-button>
        </el-form>
        <el-button
        class="but-icon-edit"
        icon="el-icon-edit"
        size="mini"
        @click="editForm()"
        >Редактировать</el-button>
    </div>
</template>

<script>
export default {
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
    font-size: 11px;
    font-weight: 500;
    height: 28px;
    display: flex;
    align-items: center;
    width: 65px;
}
.form-user-cab .el-form-item__content{
    float: left;
}
.form-user-cab .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border-color: #ffffff;
    color: #4b4b4b;
    cursor: not-allowed;
    height: 26px;
    border-bottom: 1px solid #ffffff;
    border-radius: 2px;
    padding: 0 50px 0 10px;
    font-size: 12px;
    font-weight: 500;
}
.form-user-cab .el-input__inner{
    height: 26px;
    font-size: 12px;
    padding: 0 50px 0 10px;
}
.form-user-cab .but-icon-save{
    color: #ff7e40;
    font-size: 10px;
    border: 1px solid #fff;
    position: absolute;
    left: 192px;
    bottom: -35px;
    z-index: 10;
}
.form-user-cab .el-input__icon {
    line-height: 26px;
}
</style>
