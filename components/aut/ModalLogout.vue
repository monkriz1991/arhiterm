<template>
    <div class="header-logout">
        <el-button @click="dialogFormVisible = true">
            Личный кабинет
            <i class="el-icon-user"></i>
        </el-button>
        <el-dialog title="Личный кабинет" :visible.sync="dialogFormVisible"  width="32%">

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Вход" name="first">
                <Login/>
            </el-tab-pane>
            <el-tab-pane label="Регистрация" name="second">
              <Registration/>
            </el-tab-pane>
            <el-tab-pane label="Восстановить пароль" name="secondFry">Восстановить пароль</el-tab-pane>
        </el-tabs>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Закрыть</el-button>
            
        </span> -->
        </el-dialog>
    </div>
</template>

<script>
import Registration from '~/components/aut/Registration.vue'
import Login from '~/components/aut/Login.vue'

  export default {
    components:{
      Registration,
      Login,
    },
    data() {
      return {
        activeName: 'first',
        dialogFormVisible: false,
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
    }
  };
</script>