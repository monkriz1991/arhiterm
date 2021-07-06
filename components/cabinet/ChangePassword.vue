<template>
    <div>
        <el-button 
        @click="dialogVisible = true"
        icon="el-icon-edit" size="small">сменить пароль</el-button>
        <el-dialog
        title="Смена пароля"
        :visible.sync="dialogVisible"
        width="30%"
        class="dialog-changePass"
        >

        <el-form :model="form" ref="form" status-icon :rules="rules">
            <el-form-item 
            prop="old_password"
            label="Текущий пароль"
            >
            <el-input placeholder="Ввидите текущий пароль" v-model="form.old_password" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item 
            prop="password"
            label="Пароль"
            >
            <el-input placeholder="Ввидите пароль" v-model="form.password" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item 
            prop="password2"
            label="Повторите пароль"
            >
            <el-input placeholder="Повторите пароль" v-model="form.password2" show-password autocomplete="off"></el-input>
            </el-form-item>   
           
            <span  class="dialog-footer">
                <el-button type="primary" 
                :disabled="disabled"
                @click="changePassword"
                >Сохранить</el-button>
            </span>
        </el-form> 
        </el-dialog>

    </div>
</template>


<script>
export default {
    data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
        callback(new Error('Введите новый пароль'));
        } else {
        if (this.form.password2  !== '') {
            this.$refs.form.validateField('password2');
        }
        callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {
        
        if (value === '') {
        this.disabled=true    
        callback(new Error('Введите пароль повторно'));
        } else if (value !== this.form.password) {
        this.disabled=true
        callback(new Error('Введённый пароль не совпадает!'));
        } else {
        this.disabled=false
        callback();
        }
    };
    return{
        disabled:true,
        dialogVisible: false,
        form: {
        password: '',
        password2: '',
        old_password:'',
        },
        rules: {
        password: [
            { validator: validatePass, trigger: ['blur', 'change']}
        ],
        password2: [
            { validator: validatePass2, trigger: ['blur', 'change'] }
        ],
        }
    }
        
    },
    methods:{
      /**
       * отправка запроса на сохранение данных на сервер
       * @returns {Promise<void>}
       */
      async changePassword() {
          try{
            let data = await this.$axios.patch(`/change_password/backend/change_password/${this.$auth.user.id}/`, this.form)
          this.$message({
            message: 'сохранено',
            showClose: true,
            duration:1000,
            type: 'success'
        });
        await this.$auth.fetchUser()
          }catch(error){
              console.log(error)
              this.parseError(error)
            this.$message({
            message: 'Страрый пароль не подходит',
            showClose: true,
            duration:1000,
            type: 'warning'
        });
          }
      },
      /**
       * обработка ошибок отправки запросов
       * @param error
       */
      parseError(error){
        // this.$message({
        //     message: 'Произошла ошибка сохранения. Попробуйте снова. Если данные не сохраняются обратитесь к менеджеру.',
        //     showClose: true,
        //     duration:4000,
        //     type: 'error'
        // });
      }
    }
}
</script>
<style>
.dialog-changePass .dialog-footer{
    display: block;
    margin: 40px 0 0;
    text-align: right;
}
</style>