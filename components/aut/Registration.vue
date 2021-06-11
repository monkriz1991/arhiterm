<template>
    <el-form :model="form" ref="form" status-icon :rules="rules">
        <el-form-item 
        prop="name"
        label="Имя" 
        :rules="[
          { required: true, message: 'Пожалуйста введите ваше имя', trigger: 'blur' }
        ]"
        >
          <el-input  placeholder="Введите Ваше имя" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item 
        prop="username"
        label="Логин" 
        :rules="[
          { required: true, message: 'Пожалуйста введите ваш email', trigger: 'blur' },
          { type: 'email', message: 'Пожалуйста введите корректный email', trigger: ['blur', 'change'] }
        ]"
        >
        <el-input placeholder="Введите Ваш email" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="Форма" prop="type">
            <el-select v-model="form.type" placeholder="Укажите тип">
              <el-option label="Физ. лицо" value="1"></el-option>
              <el-option label="Юр. лицо" value="2"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item 
        prop="password"
        label="Пароль"
        >
          <el-input placeholder="Ввидите пароль" v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item 
        prop="checkPass"
        label="Повторите пароль"
        >
          <el-input placeholder="Повторите пароль" v-model="form.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="Пользовательское соглашение" prop="deal">
            <el-checkbox-group v-model="form.deal">
              <el-checkbox label="Принимаю" name="deal"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        <el-button @click="userReg" type="primary">Регистрация</el-button>
    </el-form>
</template>


<script>
  export default {
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
      userReg() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.registerUser()
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async registerUser(){

         let registrationinfo = {
          username: this.form.username,
          password: this.form.password,
          password2:this.form.checkPass
         }
            console.log(registrationinfo);
            await this.$axios.post('registration/backend/registration/',registrationinfo).then(response => { 
                console.log(response)
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
            }); 

      }

    }
  };
</script>