<template>
    <div class="profile-cab-right">
        <h2 class="h1-user">Персональная информация</h2>
        <el-form :model="form" :rules="rules" ref="form" class="form-user-cab">
            <el-form-item
            prop="username"
            label="Логин:"
            :rules="[
            {  message: 'Пожалуйста введите ваш email', trigger: 'blur' },
            { type: 'email', message: 'Пожалуйста введите корректный email', trigger: ['blur', 'change'] }
            ]"
            >
                <el-input :disabled="!disableForm" placeholder="Введите Ваш email" v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
            prop="first_name"
            label="Имя:"
            :rules="[
            {  message: 'Пожалуйста введите имя', trigger: 'blur' }
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
                <el-option label="Физ. лицо" value="2"></el-option>
                <el-option label="Юр. лицо" value="1"></el-option>
                
                </el-select>
            </el-form-item>
            <el-form-item
            v-show="form.type_of_user=='1'||form.type_of_user=='Юр. лицо'"
            prop="company_name"
            label="Название компании:"
            :rules="[
            { message: 'Пожалуйста название вашей компании', trigger: 'blur' }
            ]"
            >
                <el-input :disabled="!disableForm"  placeholder="Введите название компании" v-model="form.company_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
            v-show="form.type_of_user=='1'||form.type_of_user=='Юр. лицо'"
            prop="unp"
            label="УНП:"
            :rules="[
            { message: 'Пожалуйста название УНП вашей компании', trigger: 'blur' }
            ]"
            >
                <el-input :disabled="!disableForm"  placeholder="Введите УНП компании" v-model="form.unp" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
            v-show="form.type_of_user=='1'||form.type_of_user=='Юр. лицо'"
            prop="legal_address"
            label="Юр. адрес:"
            :rules="[
            { message: 'Пожалуйста введите юр. адрес', trigger: 'blur' }
            ]"
            >
                <el-input :disabled="!disableForm"  placeholder="Введите ваш юр. адрес" v-model="form.legal_address" autocomplete="off"></el-input>
            </el-form-item>
            <el-button
            v-show="disableForm"
            class="but-icon-edit"
            icon="el-icon-finished" circle
            size="medium"
            @click="saveForm"
            ></el-button>
            <el-button
            class="but-icon-edit"
            icon="el-icon-edit" circle
            size="medium"
            @click="editForm()"
            v-show="!disableForm"
            >
            </el-button>
        </el-form>

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
              first_name:this.checkUser('first_name'),
              last_name:this.checkUser('last_name'),
              username:this.checkUser('username'),
              email:this.checkUser('username'),
              phone_number:this.checkPhone('phone_number'),
              company_name:this.checkUser('company_name'),
              legal_address:this.checkUser('legal_address'),
              unp:this.checkUser('unp'),
              type_of_user:this.checkUser('type_of_user'),
          },
          rules:{

          },
          
      }
    },
    methods:{
      checkPhone(p){
          if(this.$auth.user.phone_number==''){
            this.notyfyData()
          }
          return this.$auth.user!==null&&this.$auth.user[p]!=this.$auth.user.type_of_user?this.$auth.user[p]:''
      },
      checkUser(p){
          if(this.$auth.user[p] == this.$auth.user.type_of_user && this.$auth.user.type_of_user==2){
            return 'Физ. лицо'
          }else if(this.$auth.user[p] == this.$auth.user.type_of_user && this.$auth.user.type_of_user==1){
            return 'Юр. лицо'
          }
           
        return this.$auth.user!==null&&this.$auth.user[p]!=this.$auth.user.type_of_user?this.$auth.user[p]:''
      
      
      },
        editForm(){
            this.disableForm = !this.disableForm
        },
      /**
       * отправка запроса на сохранение данных на сервер
       * @returns {Promise<void>}
       */
      async saveForm() {
          try{
            if(this.form.type_of_user == 'Физ. лицо'){
              this.form.type_of_user = 2
            }else if(this.form.type_of_user == 'Юр. лицо'){
              this.form.type_of_user = 1
            }
          let data = await this.$axios.patch(`/users/mydata/${this.$auth.user!==null?this.$auth.user.id:''}/`, this.form)

          if(this.form.type_of_user == 2){
            this.form.type_of_user = 'Физ. лицо'
          }else if(this.form.type_of_user == 1){
            this.form.type_of_user = 'Юр. лицо'
          }
          this.openSuccess();
        await this.$auth.fetchUser()
          }catch(error){
            console.log(error)
              this.openNotyEmail()
          }
           this.disableForm=false
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
      },
      openSuccess() {
        this.$notify.success({
          title: 'Успешно',
          message: 'Информация обновлена!',
          offset: 100
        });
      },
      openNotyEmail(){
         this.$notify.error({
          title: 'Ошибка',
          message: 'Похоже, что такое email уже зарегистрирован на сайте!'
        });       
      },
      notyfyData() {
        this.$notify({
          title: 'Не указан контактный телефон.',
          message: 'Для совершения покупок на сайте необходимо заполнить данный формы!',
          type: 'warning'
        });
      },
    }
}
</script>

