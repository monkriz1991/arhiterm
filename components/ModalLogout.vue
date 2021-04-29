<template>
    <div class="header-logout">
        <el-button @click="dialogFormVisible = true">
            Личный кабинет
            <i class="el-icon-user"></i>
        </el-button>
        <el-dialog title="Logout" :visible.sync="dialogFormVisible"  width="32%">

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Вход" name="first">
                <el-form :model="form">
                    <el-form-item label="Логин" >
                    <el-input placeholder="Введите Ваш email" v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Пароль" >
                    <el-input placeholder="Ввидите пароль" v-model="form.password" show-password></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="Регистрация" name="second">reg</el-tab-pane>
            <el-tab-pane label="Восстановить пароль" name="secondFry">Восстановить пароль</el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Закрыть</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          password: ''
        },
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      }
    }
  };
</script>