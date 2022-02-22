<template>
    <el-form :model="Form" :rules="rules" ref="Form" class="form-basket">
        <el-collapse v-model="activeName" accordion @change="handleChange">
        <el-collapse-item :disabled="typeUser != ''"  title="Тип плательщика" name="1">
            <el-form-item prop="typ">
                <el-radio-group v-model="Form.typ">
                <el-radio :label="1">{{'Физ. лицо'}}</el-radio>
                <el-radio :label="2">{{'Юр. лицо'}}</el-radio>
                </el-radio-group>
                <div
                class="but-next-form"
                v-show="Form.typ"
                @click="disabledForm(2)"
                ><span>Далее</span></div>
            </el-form-item>
        </el-collapse-item>
        <el-collapse-item :disabled="Form.typ==''"  title="Доставка" name="2">
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
                <el-radio v-show="typeUser=='2'||Form.typ=='2'" label="Безналичный расчёт"></el-radio>
                <el-radio v-show="typeUser=='1'||Form.typ=='1'" label="Наличный расчет"></el-radio>
                <el-radio v-show="typeUser=='1'||Form.typ=='1'" label="Банковской картой онлайн"></el-radio>
                <!-- <el-radio v-show="typeUser=='1'||Form.typ=='1'" label="Банковской картой через терминал"></el-radio> -->
                <el-radio v-show="typeUser=='1'||Form.typ=='1'" label="Через систему «Расчет» (ЕРИП)"></el-radio>
                <el-radio v-show="typeUser=='1'||Form.typ=='1'" label="Картами рассрочки без переплат сроком на 2 месяца"></el-radio>
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
        v-if="typeUser=='2'||Form.typ=='2'"
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
        <el-form-item
        prop="phone_number"
        label="Телефон"
        :rules="[
          { required: true, message: 'Пожалуйста введите ваш Телефон', trigger: 'blur' },
        ]"
        >
        <el-input :disabled="$auth.loggedIn!=''" placeholder="Введите Ваш Телефон" v-model="Form.phone_number" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="typeUser=='2'||Form.typ=='2'" label="Юр. Адрес">
            <el-input :disabled="$auth.loggedIn!=''"
            type="textarea" v-model="Form.yrAdres"></el-input>
        </el-form-item>
        <el-form-item v-if="Form.del=='Курьером'" label="Адрес доставки" prop="adres"
        :rules="[
        { required: true, message: 'Пожалуйста введите Адрес доставки', trigger: 'blur' },
        ]"
        >
            <el-input type="textarea" 
            v-model="Form.adres"></el-input>
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

            <div class="form-basket-aut">
                <div class="form-basket-aut-content" v-if="!$auth.loggedIn">
                    <no-ssr>
                    <ModalLogout />
                    </no-ssr>
                    <b>|</b>
                    <span>Если у вас уже есть аккаунт на сайте, 
                        вы можете пройти авторизацию,<br>
                        товарные позиции в корзине останутся доступны.
                    </span>
                </div>
            </div>

            <span v-show="Form.pay != ''" class="dialog-footer">
                <el-button 
                v-if="Form.phone_number!=''" 
                @click="addOrder" type="primary">Оформить заказ</el-button>
                <span v-show="$auth.loggedIn" v-else >Заполните контактный Телефон в профиле личного кабинета</span>
            </span>

        </el-collapse-item>
        </el-collapse>

    </el-form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ModalLogout from '~/components/aut/ModalLogout.vue'
export default ({
  props:['dialogForm'],
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
        activeName: this.$store.state.auth.loggedIn?this.$store.state.auth.user.type_of_user!==''&& this.$store.state.auth.loggedIn===true?'2':'1':'',
        Form: {
          name: this.$store.state.auth.loggedIn?this.$store.state.auth.user.first_name!==''&& this.$store.state.auth.loggedIn===true?this.$store.state.auth.user.first_name:'':'',
          username: this.$store.state.auth.loggedIn?this.$store.state.auth.user.username!==''&& this.$store.state.auth.loggedIn===true?this.$store.state.auth.user.username:'':'',
          nameCompany:this.$store.state.auth.loggedIn?this.$store.state.auth.user.company_name!==''&& this.$store.state.auth.loggedIn===true?this.$store.state.auth.user.company_name:'':'',
          type: '',
          password: '',
          checkPass: '',
          del:'',
          pay:'',
          typ: '',
          yrAdres:this.$store.state.auth.loggedIn?this.$store.state.auth.user.legal_address!==''&& this.$store.state.auth.loggedIn===true?this.$store.state.auth.user.legal_address:'':'',
          adres:'',
          phone_number:this.$store.state.auth.loggedIn?this.$store.state.auth.user.phone_number!==''&& this.$store.state.auth.loggedIn===true?this.$store.state.auth.user.phone_number:'':'',
          desc: '',
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
        ModalLogout
    },
    watch:{
        $auth(newv){
            this.$forceUpdate();
        },
        'Form.typ':function(newVal){
            if(this.$store.state.auth.user==false){
                this.typ = newVal
            }
        },
        '$store.state.auth.user.phone_number': function (val) {
            this.Form.phone_number = this.$store.state.auth.user.phone_number
        },
        '$store.state.auth.user.company_name': function (val) {
            this.Form.company_name = this.$store.state.auth.user.company_name
        },
        '$store.state.auth.user.first_name': function (val) {
            this.Form.first_name = this.$store.state.auth.user.first_name
        },
        '$store.state.auth.user.username': function (val) {
            this.Form.username = this.$store.state.auth.user.username
        },
        '$store.state.auth.user.legal_address': function (val) {
            this.Form.yrAdres = this.$store.state.auth.user.legal_address
        }
    },
    computed:{
      ...mapGetters({
        basket:'main/basket',
        basket_cost:'main/basket_cost',
      }),
      typeUser:function (){
            this.$forceUpdate();
            return this.$store.state.auth.user?this.$store.state.auth.user.type_of_user:''
        
      }
    },
    methods:{
      ...mapActions({
        addUserList: 'main/addUserList',
        remove_basket:'main/DELL_CART_BASKET_ALL',
        remove_cost: 'main/DELL_CART_BASKET_COST'
    }),
    disabledForm(item){
        this.activeName = String(item)
    },
    handleChange(val) {
        //console.log(val);
    },
    async addOrder(){
        if(this.$auth.loggedIn == true){
            this.unaftorized()
        }else{
            this.$refs.Form.validate((valid) => {
            if (valid) {
                //this.registerUser()
                this.unaftorized()
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    },
    async unaftorized(){
        try {
        let data = await this.$axios.post('add/to/cart',{form:this.Form,basket:this.basket,basket_cost:this.basket_cost});
        
        if(!this.$auth.loggedIn) {
            
            await this.$auth.loginWith('local', {data:{username: this.Form.username,phone_number:this.Form.phone_number,password: this.Form.password}})

            this.addUserList(this.$auth.user)
            }


        this.$emit('updateDialogForm',false)
        this.$
        this.remove_basket()
        this.remove_cost()

        }catch (error) {
        this.$message({
          message: 'Данный email уже зарегистрирован в базе!',
          type: 'warning'
        });
        }
      },

    }
})
</script>
<style>
.form-basket-aut{
    float: left;
    width: 100%;
}
.form-basket-aut-content{
    float: left;
    width: 100%;
    margin: 20px 0;
}
.form-basket-aut span{
    max-width: 500px;
    float: left;
    width: 100%;
}
.form-basket-aut b{
    float: left;
    margin: 9px 15px 8px 0;
}
.form-basket-aut .header-logout{
    float: left;
    margin: 0 15px 0 0;
}

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
