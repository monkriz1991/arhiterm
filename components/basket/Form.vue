<template>
    <el-form :model="Form" :rules="rules" ref="Form" class="form-basket">
        <el-collapse v-model="activeName" accordion @change="handleChange">
        <el-collapse-item title="Тип плательщика" name="1">
            <el-form-item prop="typ">
                <el-radio-group v-model="Form.typ">
                <el-radio label="Физ. лицо"></el-radio>
                <el-radio label="Юр. лицо"></el-radio>
                </el-radio-group>
                <div 
                class="but-next-form"
                v-show="Form.typ"
                @click="disabledForm(2)"
                ><span>Далее</span></div>
            </el-form-item>
        </el-collapse-item>
        <el-collapse-item :disabled="Form.typ == ''"  title="Доставка" name="2">
            <el-form-item prop="del">
                <el-radio-group v-model="Form.del">
                <el-radio label="Курьером"></el-radio>
                <el-radio label="Самовывоз"></el-radio>
                </el-radio-group>
                <div 
                class="but-next-form"
                v-show="Form.del"
                @click="disabledForm(3)"
                ><span>Далее</span></div>
            </el-form-item>
        </el-collapse-item>
        <el-collapse-item :disabled="Form.del == ''" title="Оплата" name="3">
            <el-form-item prop="pay" class="radio-pay">
                <el-radio-group v-model="Form.pay">
                <el-radio label="Безналичный расчёт"></el-radio>
                <el-radio v-show="Form.typ=='Физ. лицо'" label="Наличный расчет"></el-radio>
                <el-radio v-show="Form.typ=='Физ. лицо'" label="Банковской картой онлайн"></el-radio>
                <el-radio v-show="Form.typ=='Физ. лицо'" label="Банковской картой через терминал"></el-radio>
                <el-radio v-show="Form.typ=='Физ. лицо'" label="Через систему «Расчет» (ЕРИП)"></el-radio>
                <el-radio v-show="Form.typ=='Физ. лицо'" label="Картами рассрочки без переплат сроком на 2 месяца"></el-radio>
                </el-radio-group>
                <div 
                class="but-next-form"
                v-show="Form.pay"
                @click="disabledForm(4)"
                ><span>Далее</span></div>
            </el-form-item>
        </el-collapse-item>
        <el-collapse-item :disabled="Form.pay == ''" title="Данные покупателя" name="4" class="collapse-data">
        <el-form-item 
        v-if="Form.typ=='Юр. лицо'"
        prop="nameCompany"
        label="Название компании" 
        :rules="[
          { required: true, message: 'Пожалуйста введите название вашей компании', trigger: 'blur' }
        ]"
        >
        <el-input :disabled="$auth.loggedIn!=''" placeholder="Введите название вашей компании" v-model="Form.nameCompany" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item 
        prop="name"
        label="Имя" 
        :rules="[
          { required: true, message: 'Пожалуйста введите ваше имя', trigger: 'blur' }
        ]"
        >
        <el-input :disabled="$auth.loggedIn!=''" placeholder="Введите Ваше имя" v-model="Form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item 
        prop="username"
        label="Логин" 
        :rules="[
          { required: true, message: 'Пожалуйста введите ваш email', trigger: 'blur' },
          { type: 'email', message: 'Пожалуйста введите корректный email', trigger: ['blur', 'change'] }
        ]"
        >
        <el-input :disabled="$auth.loggedIn!=''" placeholder="Введите Ваш email" v-model="Form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="Form.typ=='Юр. лицо'" label="Юр. Адрес">
            <el-input :disabled="$auth.loggedIn!=''" 
            type="textarea" v-model="Form.yrAdres"></el-input>
        </el-form-item>
        <el-form-item label="Адрес доставки">
            <el-input type="textarea" v-model="Form.adres"></el-input>
        </el-form-item>
        <el-form-item label="Комментарий к заказу">
            <el-input type="textarea" v-model="Form.desc"></el-input>
        </el-form-item>
        <el-form-item 
        v-if="!$auth.loggedIn"
        prop="password"
        label="Пароль"
        >
          <el-input placeholder="Ввидите пароль" v-model="Form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item 
        v-if="!$auth.loggedIn"
        prop="checkPass"
        label="Повторите пароль"
        >
            <el-input placeholder="Повторите пароль" v-model="Form.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>
            <span v-show="Form.pay != ''" class="dialog-footer">
                <el-button  @click="AddOrder" type="primary">Оформить заказ</el-button>
            </span>
        </el-collapse-item>
        </el-collapse>
    </el-form>
</template>

<script>
export default ({
    created() {
    },
    data(){
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('Введите пароль'));
            } else {
            if (this.Form.checkPass  !== '') {
                this.$refs.Form.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('Введите пароль повторно'));
            } else if (value !== this.Form.password) {
            callback(new Error('Введённый пароль не совпадает!'));
            } else {
            callback();
            }
        };
        return{
        activeName: '1',
        Form: {
          name: this.$auth.loggedIn!=''?this.$auth.user.name:'',
          username: this.$auth.loggedIn!=''?this.$auth.user.username:'',
          nameCompany:this.$auth.loggedIn!=''?this.$auth.user.nameCompany:'',
          type: '',
          password: '',
          checkPass: '',
          del:'',
          pay:'',
          typ: '',
          yrAdres:'',
          adres:'',
          desc: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: ['blur', 'change'] }
          ],
          checkPass: [
            { validator: validatePass2, trigger: ['blur', 'change'] }
          ],
        }
        }
    },
    components:{
    },
    computed:{

    },
    methods:{
        disabledForm(item){
            this.activeName = String(item)
        },
        handleChange(val) {
            //console.log(val);
        },
        AddOrder(){

            if(this.$auth.loggedIn == true){

            }else{
                this.$refs.Form.validate((valid) => {
                if (valid) {
                    //this.registerUser()
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            }
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
})
</script>
<style>
.header-basket .el-form-item{
    margin-bottom: 0px;
}
.but-next-form{
    float: left;
    width: 100%;
    text-align: right;
}
.but-next-form>span{
    padding: 8px 22px;
    border-radius: 4px;
    cursor: pointer;
    background: #ff8d00;
    color: #fff;
    font-weight: 400;
    float: right;
}
.but-next-form>span:hover{
    background: #f28906;
}
.but-next-form{

}
.radio-pay{

}
.header-basket .radio-pay label{
    float: left;
    width: 100%;
    margin: 0 0 10px;  
}
.header-basket .el-dialog__body{
    padding: 10px 30px 20px;
}
.el-collapse-item__header{
    font-size: 15px;
    color: #000000;   
}
.form-basket .el-radio__input.is-checked .el-radio__inner {
    border-color: #f28906 !important;
    background: #f28906 !important;
}
.form-basket .el-radio__inner:hover{
    border-color: #f28906 !important;
}
.form-basket .el-collapse-item__header{
    height: 54px;
}
.el-radio-group .el-radio__label:hover{
    color: #000;
}
.collapse-data{

}
.collapse-data .el-input__inner{
    height: 36px;
    line-height: 36px;
}
.collapse-data .el-form-item{
    margin-bottom: 20px;
    max-width: 420px;
    width: 100%;
}
.collapse-data .el-form-item__label{
    line-height: 1em;
    font-size: 12px;
    float: left;
    margin: 0 0 5px;
}
.collapse-data .el-input{
    float: left;
}
.collapse-data .dialog-footer{
    float: left;
    width: 100%;
    text-align: right;
    margin: 0 0 20px;
}
</style>