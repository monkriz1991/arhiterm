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
                    <el-input placeholder="введите через запятую" v-model="mounter.address" autocomplete="off"></el-input>
                </el-form-item>
              <el-form-item
                prop="price"
                label="средняя цена за час"
                :rules="[]"
                >
                    <el-input placeholder="кажите цену " v-model="mounter.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                prop="phone"
                label="Телефон:"
                :rules="[
                { message: 'Пожалуйста ваш телефон', trigger: 'blur' }
                ]"
                >
                    <el-input v-for="(p,k) in mounter.phone_s" :key="k" :value="p.phone_number" placeholder="Введите ваш телефон" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Описание деятельности:">
                    <el-input type="textarea" v-model="mounter.description"></el-input>
                </el-form-item>
                <el-form-item label="Укажите тип выполняемых работ:">
                    <el-checkbox-group v-model="mounter.tags">
                    <el-checkbox v-for="(i,k) in this.tags" :key="k" :label="i.id"  name="type">{{i.name}}</el-checkbox>
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
          mounter:{tags:[]},
          tags:[],
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
  async mounted() {
      let data = await this.$axios.get(`/mounters/mydata/${this.$auth.user.moiunter}/`);
      this.mounter = data.data;
      let tdata = await this.$axios.get('/mounters/all_tags/?limit=99999999');
    console.log(this.mounter.is_maunter)
      this.tags = tdata.data.results;
  },
  methods:{
        async saveForm(){
          let newForm = new FormData();
          newForm.append('address', this.form.city);
          newForm.append('description', this.form.desc);
          newForm.append('price', this.form.price);
          let data = await this.$axios.patch(`/mounters/mydata/${this.$auth.user.moiunter}/`, this.mounter);
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
