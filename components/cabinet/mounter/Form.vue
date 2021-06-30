<template>
<el-collapse v-model="activeNames" @change="handleChange" class="mounter-cab-collaps">
    <el-collapse-item name="1">
        <template slot="title">
            <i class="el-icon-edit"></i>
            Общая информация
        </template>
        <div class="mounter-form">
            <el-form :model="form" :rules="rules" ref="form" class=" form-user-cab">
                <el-form-item
                prop="city"
                label="Регионы выполнения работ:"
                :rules="[]"
                >
                    <el-input placeholder="введите через запятую" v-model="form.city" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                prop="phone"
                label="Телефон:"
                :rules="[
                { message: 'Пожалуйста ваш телефон', trigger: 'blur' }
                ]"
                >
                    <el-input  placeholder="Введите ваш телефон" v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Описание деятельности:">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="Укажите тип выполняемых работ:">
                    <el-checkbox-group v-model="form.tags">
                    <el-checkbox label="Online activities" name="type"></el-checkbox>
                    <el-checkbox label="Promotion activities" name="type"></el-checkbox>
                    <el-checkbox label="Offline activities" name="type"></el-checkbox>
                    <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-button
                class="but-icon-save-mounter"
                size="mini"
                @click="saveForm"
                >Сохранить</el-button>
            </el-form>

        </div>
    </el-collapse-item>
</el-collapse>    
</template>

<script>
export default {
    data(){
        return{
            activeNames: [],
            form:{
                city:'',
                phone:'',
                tags:[],
                desc:'',
            },
          rules:{

          }

        }
    },
    methods:{
        saveForm(){

        },
        handleChange(val) {

        }
    }
}
</script>
<style>
.mounter-cab-collaps{
    float: left;
    width: 100%;
}
</style>