<template>
    <el-form :model="form" ref="form" status-icon :rules="rules">
        <el-form-item
        prop="name"
        label="Имя"
        :rules="[
          { required: true, message: 'Пожалуйста введите ваше имя', trigger: 'blur' }
        ]"
        >
          <el-input prefix-icon="el-icon-user" placeholder="Введите Ваше имя" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
        prop="username"
        label="Логин"
        :rules="[
          { required: true, message: 'Пожалуйста введите ваш email', trigger: 'blur' },
          { type: 'email', message: 'Пожалуйста введите корректный email', trigger: ['blur', 'change'] }
        ]"
        >
        <el-input prefix-icon="el-icon-message" placeholder="Введите Ваш email" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item  label="Аккаунт" prop="type">
            <i class="el-icon-set-up icon-label-reg"></i>
            <el-select class="select-reg" v-model="form.type" placeholder="Укажите тип аккаунта">
              <el-option label="Физ. лицо" value="2"></el-option>
              <el-option label="Юр. лицо" value="1"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item
        prop="password"
        label="Пароль"
        >
          <el-input prefix-icon="el-icon-key" placeholder="Ввидите пароль" v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
        prop="checkPass"
        label="Повторите пароль"
        >
          <el-input prefix-icon="el-icon-key" placeholder="Повторите пароль" v-model="form.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="Выбрав пункт Принимаю, я соглашаюсь с" prop="deal">
            <el-checkbox-group v-model="form.deal">
              <el-checkbox label="Принимаю" name="deal"></el-checkbox>
            </el-checkbox-group>
            <nuxt-link 
            class="personal-data-link" 
            :to="`/info/personal_data_rules`" :custom="true">
            <a @click="closeModal">Политика обработки персональных данных</a>
            </nuxt-link>
          </el-form-item>
        <el-button @click="userReg" type="primary" class="butt-form">Регистрация</el-button>
    </el-form>
</template>


<script>
import {mapActions, mapGetters} from "vuex";
  export default {
    props:['dialogFormVisible'],
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Введите пароль'));
        } else {
          if (this.form.checkPass  !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Введите пароль повторно'));
        } else if (value !== this.form.password) {
          callback(new Error('Введённый пароль не совпадает!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          name:'',
          username: '',
          type: '',
          password: '',
          checkPass: '',
          deal:[]
        },
        rules: {
          password: [
            { validator: validatePass, trigger: ['blur', 'change']}
          ],
          checkPass: [
            { validator: validatePass2, trigger: ['blur', 'change'] }
          ],
          type: [
            { required: true, message: 'Выберите ваш тип', trigger: 'change' }
          ],
          deal:[
            { type: 'array', required: true, message: 'Вы не принияли соглашение', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      ...mapActions({
        setLoading: 'main/newLoadingItem',
      }),
      closeModal(){
        console.log('oko')
        this.$emit('update:dialogFormVisible',false)
      },
      userReg() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.registerUser()
            //alert('submit!');
          } else {
            this.openNoty()
            //console.log('error submit!!');
            return false;
          }
        });
      },
      async registerUser(){
        
         let registrationinfo = {
          username: this.form.username,
          password: this.form.password,
          password2:this.form.checkPass,
          type_of_user:parseInt(this.form.type),
         }

            await this.$axios.post('registration/backend/registration/',registrationinfo).then(response => {


              if(response.status===201){
              this.$emit('update:dialogFormVisible',false)
              this.setLoading(true)
              this.$auth.loginWith('local', { data: {username:registrationinfo.username, password:registrationinfo.password} }).then(function(){
                this.addUserList(this.$auth.user)
              })

              }
            })
            .catch(error => {
                this.errors = [];
                let str = "";
                for(let i in error.response.data){
                    for (let s of error.response.data[i]){
                        str += `${i}: ${s}`;
                        this.errors.push(`${i}: ${s}`);
                    }
                }
                
                this.openNotyEmail()
            });

      },
      openNoty() {
        this.$notify.error({
          title: 'Ошибка регистрации',
          message: 'Проверьте указанны ли все данные верно!'
        });
      },
      openNotyEmail(){
         this.$notify.error({
          title: 'Ошибка регистрации',
          message: 'Похоже, что такое email уже зарегистрирован на сайте!'
        });       
      }

    }
  };
</script>
