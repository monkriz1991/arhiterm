<template>
    <el-form :model="Form" :rules="rules" ref="Form" class="form-basket">
        <el-collapse v-model="activeName" accordion @change="handleChange">
        <el-collapse-item :disabled="typeUser != ''"  title="Тип плательщика" name="1">
            <el-form-item prop="typ">
                <el-radio-group v-model="Form.typ">
                <el-radio :label="2">{{'Физ. лицо'}}</el-radio>
                <el-radio :label="1">{{'Юр. лицо'}}</el-radio>
                </el-radio-group>
                <div
                class="but-next-form"
                v-show="Form.typ"
                @click="disabledForm(2)"
                ><span>Далее</span></div>
            </el-form-item>
        </el-collapse-item>
        <el-collapse-item :disabled="Form.pay==''"  title="Доставка" name="2">
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
                <el-radio v-show="typeUser=='1'||Form.typ=='1'" label="Безналичный расчёт"></el-radio>
                <el-radio v-show="typeUser=='2'||Form.typ=='2'" label="Наличный расчет"></el-radio>
                <el-radio v-show="typeUser=='2'||Form.typ=='2'" label="Банковской картой онлайн"></el-radio>
                <el-radio v-show="typeUser=='2'||Form.typ=='2'" label="Банковской картой через терминал"></el-radio>
                <el-radio v-show="typeUser=='2'||Form.typ=='2'" label="Через систему «Расчет» (ЕРИП)"></el-radio>
                <el-radio v-show="typeUser=='2'||Form.typ=='2'" label="Картами рассрочки без переплат сроком на 2 месяца"></el-radio>
                </el-radio-group>
                <div
                class="but-next-form"
                v-show="Form.pay"
                @click="disabledForm(4)"
                ><span>Далее</span></div>
            </el-form-item>
        </el-collapse-item>
        <el-collapse-item :disabled="Form.pay == ''" title="Данные покупателя" name="4" class="collapse-data form-basket-input ">
        <el-form-item
        v-if="typeUser=='1'||Form.typ=='1'"
        prop="nameCompany"
        label="Название компании"
        :rules="[
          { required: true, message: 'Введите название вашей компании', trigger: 'blur' }
        ]"
        >
        <el-input prefix-icon="el-icon-office-building" :disabled="$auth.loggedIn!=''" placeholder="Введите название вашей компании" v-model="Form.nameCompany" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
        prop="name"
        label="Имя"
        :rules="[
          { required: true, message: 'Введите имя', trigger: 'blur' }
        ]"
        >
        <el-input prefix-icon="el-icon-user" :disabled="$auth.loggedIn!=''" placeholder="Введите Ваше имя" v-model="Form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
        prop="username"
        label="Логин"
        :rules="[
          { required: true, message: 'Введите email', trigger: 'blur' },
          { type: 'email', message: 'Введите корректный email', trigger: ['blur', 'change'] }
        ]"
        >
        <el-input prefix-icon="el-icon-message" :disabled="$auth.loggedIn!=''" placeholder="Введите Ваш email" v-model="Form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
        prop="phone_number"
        label="Телефон"
        :rules="[
          { required: true, message: 'Введите Телефон', trigger: 'blur' },
        ]"
        >
        <el-input prefix-icon="el-icon-phone-outline" :disabled="$auth.loggedIn!=''" placeholder="Введите Ваш Телефон" v-model="Form.phone_number" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="typeUser=='1'||Form.typ=='1'" label="Юр. Адрес">
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
          <el-input prefix-icon="el-icon-key" placeholder="Ввидите пароль" v-model="Form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
        v-if="!$auth.loggedIn"
        prop="checkPass"
        label="Повторите пароль"
        >
            <el-input prefix-icon="el-icon-key" placeholder="Повторите пароль" v-model="Form.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>

            <div class="form-basket-aut">
                <div class="form-basket-aut-content" v-if="!$auth.loggedIn">
                    <client-only>
                    <ModalLogout />
                    </client-only>
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
                @click="addOrder" type="primary" class="basket-pay">Оформить заказ</el-button>
                <span v-show="$auth.loggedIn" v-else >Заполните контактный Телефон в профиле личного кабинета</span>
            </span>

        </el-collapse-item>
        </el-collapse>
    <div class="none-block-form"></div>
    </el-form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ModalLogout from '~/components/aut/ModalLogout.vue'
export default ({
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
        basket:'crate/basket',
        basket_cost:'crate/basket_cost',
      }),
      typeUser:function (){
            this.$forceUpdate();
            return this.$store.state.auth.user?this.$store.state.auth.user.type_of_user:''

      }
    },
    methods:{
      ...mapActions({
        addUserList: 'main/addUserList',
        remove_basket:'crate/DELL_CART_BASKET_ALL',
        remove_cost: 'crate/DELL_CART_BASKET_COST',
        setLoading: 'main/newLoadingItem',
        ADD_TO_SUC_BASKET: 'main/ADD_TO_SUC_BASKET',
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
        this.setLoading(true)
        this.$emit('updateDialogForm',false)
        let data = await this.$axios.post('add/to/cart',{form:this.Form,basket:this.basket,basket_cost:this.basket_cost});

        if(!this.$auth.loggedIn) {

            await this.$auth.loginWith('local', {data:{username: this.Form.username,phone_number:this.Form.phone_number,password: this.Form.password}})

            this.addUserList(this.$auth.user)
        }


        this.ADD_TO_SUC_BASKET(data)
        this.$
        this.remove_basket()
        this.remove_cost()
        this.$router.push('/userCabinet/success/')

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

</style>
