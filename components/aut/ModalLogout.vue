<template>
    <div class="header-logout button-nav-meny">
        <el-button 
        v-if="width>991"
        @click="dialogFormVisible = true">
          <i class="el-icon-user"></i>
          <span class="button-nav-text">Кабинет</span>
        </el-button>
        <el-button 
        v-else
        icon="el-icon-user"
        @click="dialogFormVisible = true">
        <span class="button-nav-text">Кабинет</span>
        </el-button>
        <el-dialog 
        class="modal-logout"
        title="Кабинет" 
        append-to-body
        :visible.sync="dialogFormVisible"  
        width="40%">

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Вход" name="first">
                <Login/>
            </el-tab-pane>
            <el-tab-pane label="Регистрация" name="second">
              <Registration/>
            </el-tab-pane>
            <el-tab-pane label="Восстановить пароль" name="secondFry">Восстановить пароль</el-tab-pane>
        </el-tabs>
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
        width:0,
      };
    },
    mounted(){
      if (process.browser){                 
        window.addEventListener('resize', this.updateWidth);  
        this.updateWidth()        
      }
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      updateWidth() {
        this.width = window.innerWidth;
        if(window.innerWidth>991){
            this.adaptivSidebar = true
        }else{
          this.adaptivSidebar = false
          
        }
      },
    }
  };
</script>