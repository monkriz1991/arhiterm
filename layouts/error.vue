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
    layout: 'error',
    head() {
    return {
      title: '404 - error',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:  '404 - error'
        },
        {
            hid: 'og:title',
            property: 'og:title',
            content: '404 - error',
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: 'https://arhiterm.by/logotip.png',
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: '404 - error',
        },
        {
            hid: 'og:url',
            property: 'og:url',
            content: `https://arhiterm.by/error`,
        },
      ],
        link: [
            {
                rel: 'canonical',
                href: 'https://arhiterm.by/error'
            }
        ]
    }
  }
  }
</script>