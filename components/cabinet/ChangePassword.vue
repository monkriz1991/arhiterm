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
            prop="oldPassword"
            label="Текущий пароль"
            >
            <el-input placeholder="Ввидите текущий пароль" v-model="form.oldPassword" show-password autocomplete="off"></el-input>
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
           
            <span  class="dialog-footer">
                <el-button @click="dialogVisible = false">Выход</el-button>
                <el-button type="primary" @click="dialogVisible = false">Сохранить</el-button>
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
    return{
        dialogVisible: false,
        form: {
        password: '',
        checkPass: '',
        oldPassword:'',
        },
        rules: {
        password: [
            { validator: validatePass, trigger: ['blur', 'change']}
        ],
        checkPass: [
            { validator: validatePass2, trigger: ['blur', 'change'] }
        ],
        }
    }
        
    },
}
</script>
<style>
.dialog-changePass .dialog-footer{
    display: block;
    margin: 40px 0 0;
    text-align: right;
}
</style>