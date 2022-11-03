<template>
      <el-dialog
      title=""
      class="modal-contact"
      append-to-body
      :visible="dialogVisible"
      v-on:update:visible="$emit('update:dialogVisible', $event)"
      width="30%"
      >
        <div class="phone-modal-block">
          <div class="phone-modal-block-el">
              <span>Консультация / помощь в оформлении</span>
              <p v-for="(phone,k) in phones" :key="k">
              <a :href="`tel:${phone.phone_number}`">
              {{phone.phone_number.substring(0,4)+" "}}
              ({{phone.phone_number.substring(4,6)}})
              {{phone.phone_number.substring(6,35)}}
              </a>
              <b>|</b>
              <strong>{{phone.operator}}</strong>
              </p>
              <p>
              <a href="viber://chat?number=%2B375293431616">
              <i class="el-icon-edit"></i></a>
              <strong>Viber</strong>
              </p>
          </div>
        </div>
      </el-dialog>
</template>


<script>
  export default {
    props:['dialogVisible','phones'],
    data() {
      return {
      };
    },
    methods:{

    },

  };
</script>