<template>
    <el-form :model="login" ref="login">
        <el-form-item
        prop="username"
        label="Логин"
        :rules="[
          { required: true, message: 'Пожалуйста введите ваш email', trigger: 'blur' },
          { type: 'email', message: 'Пожалуйста введите корректный email', trigger: ['blur', 'change'] }
        ]"
        >
        <el-input prefix-icon="el-icon-message" placeholder="Введите Ваш email" v-model="login.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
        prop="password"
        label="Пароль"
        :rules="[
          { required: true, message: 'Пожалуйста введите ваш пароль', trigger: ['blur', 'change'] },
        ]"
        >
        <el-input prefix-icon="el-icon-key" placeholder="Ввидите пароль" v-model="login.password" show-password></el-input>
        </el-form-item>
        <el-button @click="userLogin" type="primary" class="butt-form">Вход</el-button>
    </el-form>
</template>


<script>
import {mapGetters,mapActions} from 'vuex'
  //import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  export default {
    components:{
      // ValidationProvider,
      // ValidationObserver,
    },
    data() {
      return {
        errors:[],
        login:{
          username:'',
          password:'',
        },
      };
    },
    methods: {
    ...mapActions({
        addUserList: 'main/addUserList'
    }),
    userLogin() {
        this.$refs.login.validate((valid) => {
          if (valid) {
            //this.$router.replace({path:this.$route.path,'query':{}});
            this.userAuto()
          } else {
            return false;
          }
         });
      },
      async userAuto(){
        try {
          let response = await this.$auth.loginWith('local', { data: this.login })
          this.addUserList(this.$auth.user)
          console.log(response)
        } catch (err) {
          this.errors = [];
          let str = "";
          for(let i in err.response.data){
              for (let s of err.response.data[i]){
                  str += `${s}`;
                  this.errors.push(`${s}`);
              }
          }
         // this.errorMessage(this.errors)
          this.openNoty()
        }
      },
      openNoty() {
        this.$notify.error({
          title: 'Ошибка авторизации',
          message: 'Проверьте указанны ли все данные верно!'
        });
      },
      // errorMessage(err) {
      //   this.$message.error(err[0]);
      // },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
    }
  };
</script>
