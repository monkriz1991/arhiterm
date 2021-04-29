<template>
    <div class="header-basket">
        <el-button type="text" @click="dialogFormVisible = true">
            <i class="el-icon-shopping-cart-full"></i>
        </el-button>
        <el-dialog title="Basket" :visible.sync="dialogFormVisible"  width="45%">

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
      };
    }
  };
</script>