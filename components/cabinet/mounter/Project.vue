<template>
    <div>
        <span>{{portfolio.title}}</span>
        <span>{{portfolio.description}}</span>
        <span>{{portfolio.address}}</span>
      <img width="50px" :src="i.img" :key="k" v-for="(i,k) in portfolio.images" />
    </div>
</template>

<script>
export default {
  props:['portfolio'],
    data() {
     return{

     }
    },
}
</script>
