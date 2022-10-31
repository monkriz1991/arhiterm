<template>
  <div class="container">


      <div class="site">
        <div class="sketch">
          <div class="bee-sketch red"></div>
          <div class="bee-sketch blue"></div>
        </div>

      <h1 v-if="error.statusCode === 404">404:
      <small>Страница не найдена</small>
      <NuxtLink to="/" class="page404">Перейти на главную</NuxtLink>
      </h1>
      <h1 v-else>An error occurred - {{ error.statusCode }} 
        <NuxtLink to="/">Перейти на главную</NuxtLink>
      </h1>
      </div>

  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>